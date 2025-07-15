import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

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

    public static void handleClient(Socket clientSocket){
        try{
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);                   
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            
            String inputLine;

            while ((inputLine = in.readLine()) != null) {
                System.out.println("[LOG] Received: " + inputLine);
                if (inputLine.trim().equalsIgnoreCase("PING")) {
                    out.print("+PONG\r\n");
                    out.flush();

                }

                // Break when we get an empty line or null (end of command)
                if (inputLine.trim().isEmpty()) {
                    break;
                }

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
}
