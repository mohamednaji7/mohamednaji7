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
      int correlationId = dataIn.readInt();


      System.out.println("Message size: " + messageSize);
      System.out.println("API Key: " + requestApiKey);
      System.out.println("API Version: " + requestApiVersion);
      System.out.println("Correlation ID: " + correlationId);

// TAG_BUFFER => byte
// throttle_time_ms => INT32
// TAG_BUFFER => byte
      
      if (requestApiKey == 18){
        System.out.println("Handling APIVersions request");
        short errorCode;
        if (requestApiVersion != 4){
          System.out.println("requestApiVersion version isn't 4");
          int responseSize = 6; // correlationId (4) + errorCode (2)
          out.writeInt(responseSize);

          errorCode = 35; 
          out.writeInt(correlationId);
          out.writeShort(errorCode);  // writes 2 bytes in big-endian format
        }
        else{
          System.out.println("Supported requestApiVersion version");
          int responseSize =19; // correlationId (4) + errorCode (2) + 1 + 2*3  
          out.writeInt(responseSize);

          errorCode = 0; 
          short minApiVersion = 4;
          short maxApiVersion = 4;
          out.writeInt(correlationId);
          out.writeShort(errorCode);  // writes 2 bytes in big-endian format
          
          out.writeByte(0x02);  // api version 4 > apiKeysArrayLength

          out.writeShort(requestApiKey);
          out.writeShort(minApiVersion);
          out.writeShort(maxApiVersion);

          out.writeByte(0x00); // Empty tagged fields
          out.writeInt(0);
          out.writeByte(0x00); // Empty tagged fields
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
