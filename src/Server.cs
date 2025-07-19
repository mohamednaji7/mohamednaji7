using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading;

class Program {
    static ConcurrentDictionary<string, object> store = new ConcurrentDictionary<string, object>();
    static ConcurrentDictionary<string, long> expiryMap = new ConcurrentDictionary<string, long>();

    static string  emptyRESParrayCode = "*0\r\n"; 

    static void Main(string[] args) {
        Console.WriteLine("[LOG] Server is starting...");

        int port = 6379;
        TcpListener server = new TcpListener(IPAddress.Any, port);

        try {
            server.Start();
            Console.WriteLine("[LOG] Listening for connections on port " + port + "...");

            while (true)
            {
                TcpClient client = server.AcceptTcpClient();
                Console.WriteLine("[LOG] Client connected from " + client.Client.RemoteEndPoint);

                // Start a new thread for each client
                Thread clientThread = new Thread(() => HandleClient(client));
                clientThread.Start();
            }
        }
        catch (Exception ex) {
            Console.Error.WriteLine("[ERROR] Server: " + ex.Message);
        }
    }

    static void HandleClient(TcpClient client) {
        try {
            NetworkStream stream = client.GetStream();
            StreamReader reader = new StreamReader(stream, Encoding.ASCII);
            StreamWriter writer = new StreamWriter(stream, Encoding.ASCII) { AutoFlush = true };

            while (true) {
                List<string> command = ParseRespCommand(reader);
                if (command.Count == 0)
                {
                    Console.WriteLine("not commands, connection closed.");
                    break;
                }

                Console.WriteLine($"[LOG] Received command: {string.Join(" ", command)}");

                string cmd = command[0].ToUpper();

                switch (cmd) {
                    case "PING":
                        writer.Write("+PONG\r\n");
                        break;

                    case "ECHO":
                        if (command.Count >= 2)
                        {
                            string msg = command[1];
                            Console.WriteLine("[LOG] msg: " + msg);
                            writer.Write("+" + msg + "\r\n");
                        }
                        break;

                    case "SET":
                        if (command.Count >= 3) {
                            string key = command[1];
                            string value = command[2];
                            store[key] = value;

                            if (command.Count == 5 && command[3].ToUpper() == "PX") {
                                if (long.TryParse(command[4], out long pxMillis))
                                {
                                    long expiryTime = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + pxMillis;
                                    expiryMap[key] = expiryTime;
                                }
                                else
                                {
                                    Console.Error.WriteLine("[ERROR] PX value must be an integer");
                                }
                            }

                            writer.Write("+OK\r\n");
                        }
                        break;

                    case "GET":
                        if (command.Count == 2){
                            string key = command[1];

                            if (expiryMap.TryGetValue(key, out long expiryTime)) {
                                long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                                if (now > expiryTime)
                                {
                                    store.TryRemove(key, out _);
                                    expiryMap.TryRemove(key, out _);
                                }
                            }

                            if (store.TryGetValue(key, out object val)){
                                if (val is string strVal ){
                                    // writer.Write($"${strVal.Length}\r\n{strVal}\r\n");
                                    writer.Write(EncodingToRESP(strVal));
                                    
                                }
                            }
                            else
                            {
                                writer.Write("$-1\r\n");
                            }
                        }
                        break;

                    case "RPUSH":
                        if (command.Count >= 3){
                            string key = command[1];
                            // List<string> values = command.GetRange(2, command.Count-2);
                            List<string> values = command[2..];

                            // string val = command[2];
                            
                            if( store.TryGetValue(key, out object existing)){
                                if(existing is List<string> list){
                                    list.AddRange(values);
                                    writer.Write(EncodingToRESP(list.Count));
                                }
                            }else{
                                List<string> list = new List<string>(values); 
                                store[key] = list;
                                writer.Write(EncodingToRESP(list.Count));

                            }
                        }
                        break;
                    case "LRANGE":
                        Console.WriteLine("[LOG] LRANGE");
                        if (command.Count == 4){
                            Console.WriteLine("[LOG] Command is 4 parts");
                            string key = command[1];
                            bool startParsed = int.TryParse(command[2], out int startIndex );
                            bool endParsed = int.TryParse(command[3], out int endIndex );

                            if(startParsed && endParsed){
                                
                                if (store.TryGetValue(key, out object existing)){
                                    if (existing is List<string> list){
                                        if (startIndex < 0){
                                            if (startIndex < -list.Count){
                                                startIndex = 0;
                                            }else{
                                                startIndex += list.Count;
                                            }
                                        }
                                        if (endIndex < 0)
                                        {
                                            endIndex += list.Count;
                                        }
                                        if (startIndex < list.Count && startIndex <= endIndex)
                                        {

                                            if (endIndex >= list.Count)
                                            {
                                                endIndex = list.Count - 1;
                                            }
                                            // writer.Write(EncodingToRESP(list.GetRange(startIndex, endIndex - startIndex + 1)));
                                            endIndex += 1;
                                            writer.Write(EncodingToRESP(list[startIndex..endIndex]));
                                        }else{
                                            writer.Write(emptyRESParrayCode);
                                        }
                                    }
                                }
                                else
                                {
                                    writer.Write(emptyRESParrayCode);

                                }
                            }
                            
                        }
                        break;
                    default:
                        writer.Write("-ERR unknown command\r\n");
                        break;
                }
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("[ERROR] Client handler exception: " + ex.Message);
        }
        finally
        {
            client.Close();
        }
    }

    static string EncodingToRESP(object res){
        Console.WriteLine("[LOG] Encoding response");
        if (res  is string strRes ){
            return $"${strRes.Length}\r\n{strRes}\r\n";
        }else if (res  is int intRes ){
            return $":{intRes}\r\n";
        }
        else if (res is List<string> list){
            StringBuilder sb = new StringBuilder();
            sb.Append($"*{list.Count}\r\n");
            foreach(var item in list){
                sb.Append($"${item.Length}\r\n{item}\r\n");
            }
            return sb.ToString();
        }
        return "$-1\r\n";
    }

    static List<string> ParseRespCommand(StreamReader reader){
        Console.Write("[LOG] Parsing the RESP: ");

        List<string> parts = new List<string>();

        string? line = reader.ReadLine();
        if (line == null || !line.StartsWith("*"))
            return parts;

        if (!int.TryParse(line.Substring(1), out int numberOfParts ))
            return parts;

        for (int i = 0; i < numberOfParts; i++)
        {
            string? sizeLine = reader.ReadLine(); // $4
            if (sizeLine == null || !sizeLine.StartsWith("$"))
                break;

            string? data = reader.ReadLine();  // "ECHO" or "hey"
            if (data != null)
            {
                parts.Add(data);
            }
        }

        return parts;
    }
}
