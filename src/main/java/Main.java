import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args){
        // Log 1: Program started
        System.out.println("[LOG] Server is starting...");

        ServerSocket serverSocket = null;
        int port = 6379;
        try {
            serverSocket = new ServerSocket(port);
            serverSocket.setReuseAddress(true);

            // Log 2: Server is listening
            System.out.println("[LOG] Listening for connections on port " + port + "...");
            
            while(true){
                Socket clientSocket = serverSocket.accept();

                // Log 3: Client connected
                System.out.println("[LOG] Client connected from " + clientSocket.getInetAddress());
                
                // handle each client in a new thread
                Thread clienThread = new Thread( () -> handleClient(clientSocket));
                clienThread.start();
            }
        } catch (IOException e) {
            System.err.println("[ERROR] Server: " + e.getMessage());
        }
    }

    private static final Map<String, String> store = new ConcurrentHashMap<>();
    private static final Map<String, Long> expiryMap = new ConcurrentHashMap<>();


    public static void handleClient(Socket clientSocket){
        try{
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);                   
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

            while (true) {
                
                List<String> command = parseRespCommand(in);
                if (command.isEmpty()) {
                    // out.print("-ERR empty command\r\n");
                    // out.flush();
                    System.err.println("");
                    break;
                }
                System.out.println(command);
    
                String cmd = command.get(0).toUpperCase();
                switch (cmd) {
                    case "PING":
                        out.print("+PONG\r\n");
                        break;
                    case "ECHO":
                        System.out.println("[LOG] echo commands");
                        String msg = command.get(1);
                        System.out.println("[LOG] msg: " + msg );
                        out.print("+" + msg + "\r\n");
                        // out.print(msg);
                        // out.print("$" + msg.length() + "\r\n" + msg + "\r\n");
    
                        break;
                    case "SET":
                        if (command.size()>=3){
                            String key = command.get(1);
                            String value = command.get(2);
                            store.put(key, value);

                            if(command.size()==5){
                                String arg = command.get(3);
                                if(arg.equalsIgnoreCase("PX")){
                                    try{
                                            long pxMillis = Long.parseLong(command.get(4));
                                            long expiryTime = System.currentTimeMillis() + pxMillis;
                                            expiryMap.put(key, expiryTime);
                                            out.print("+OK\r\n");
                                    }catch(NumberFormatException e){
                                        System.err.println("[ERROR] PX value must be an integer");
                                    }
                                }
                            }else{
                                out.print("+OK\r\n");
                            }
                        }
                        break;
                    case "GET":
                        if (command.size()==2){
                            //  handles expiry in two ways: "Active" and "Passive".
                            // using the passive way
                            String key = command.get(1);
                            
                                    // Check for expiry
                            if (expiryMap.containsKey(key)) {
                                long expireAt = expiryMap.get(key);
                                if (System.currentTimeMillis()  > expireAt){
                                    store.remove(key);
                                    expiryMap.remove(key);
                                }
                            }
                            
                            String value = store.get(key);
                            if(value==null){
                                out.print("$-1\r\n");
                            }else{
                                out.print("$" + value.length() + "\r\n" + value + "\r\n");
                            }
                        }
                        break;
                    default:
                        break;
                }
                out.flush();
            }


        } catch (IOException e) {
            System.err.println("[ERROR] Client handler exception: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                System.err.println("[ERROR] Failed to close client socket: " + e.getMessage());
            }
        }
    }

    public static List<String> parseRespCommand(BufferedReader in) throws IOException {
        System.out.print("[LOG] Parsing the RESP: ");

        List<String> parts = new ArrayList<>();

        String line = in.readLine(); // First line: *2
        if (line == null || !line.startsWith("*")) {
            return parts;
        }

        int numberOfParts = Integer.parseInt(line.substring(1)); 

        for (int i = 0; i < numberOfParts; i++) {
            String sizeLine = in.readLine(); // $4
            if (sizeLine == null || !sizeLine.startsWith("$")) {
                break;
            }


            String bulk = in.readLine();  // should be "ECHO" or "hey"
            parts.add(bulk);
        }

        return parts;
    }

}
