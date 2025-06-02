import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
  public static void main(String[] args){
    // You can use print statements as follows for debugging, they'll be visible when running tests.
    System.err.println("Logs from your program will appear here!");

    // Uncomment this block to pass the first stage
    // 
    ServerSocket serverSocket = null;
    Socket clientSocket = null;
    int port = 9092;
    try {
      serverSocket = new ServerSocket(port);
      // Since the tester restarts your program quite often, setting SO_REUSEADDR
      // ensures that we don't run into 'Address already in use' errors
      serverSocket.setReuseAddress(true);
      // Wait for connection from client.
      clientSocket = serverSocket.accept();
      System.out.println("Client connected!");

      // Read 8 bytes
      DataInputStream dataIn = new DataInputStream(clientSocket.getInputStream());
      DataOutputStream out = new DataOutputStream(clientSocket.getOutputStream());
      int messageSize =  dataIn.readInt();  // reads 4 bytes as int
      short requestApiKey = dataIn.readShort();
      short requestApiVersion = dataIn.readShort();
      int clientId = dataIn.readInt();

      out.writeInt(messageSize);
      out.writeInt(clientId);

      if (requestApiKey == 18){
        System.out.println("API key is 18: ApiVersions API");
        if (requestApiVersion != 4){
          System.out.println("requestApiVersion version isn't 4");
          // write short 
          short errorCode = 35;
          out.writeShort(errorCode);  // writes 2 bytes in big-endian format


        }
      }
      out.flush();
    } catch (IOException e) {
      System.out.println("IOException: " + e.getMessage());
    } finally {
      try {
        if (clientSocket != null) {
          clientSocket.close();
        }
      } catch (IOException e) {
        System.out.println("IOException: " + e.getMessage());
      }
    }
  }
}
