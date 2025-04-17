import socket  # noqa: F401
import threading 

def msg_body(msg):
    print('msg_body: ' + msg)
    # Ensure msg is a string
    if isinstance(msg, bytes):
        msg = msg.decode("utf-8")
    
    # Now encode everything for the HTTP response
    return (b'Content-Type: text/plain\r\n' + 
            b'Content-Length: ' + str(len(msg)).encode() + 
            b'\r\n\r\n' + 
            msg.encode())

def handle_client(conn):
    http_request = conn.recv(1024)
    # print(msg)
    request_line = http_request.split(b"\r\n")[0]
    headers = http_request.replace(request_line, b'').split(b'\r\n\r\n')[0]


    path = request_line.split(b" ")[1].decode("utf-8")
    print("path: ", path)
    if path == "/":
        conn.sendall(b"HTTP/1.1 200 OK\r\n\r\n")
    
    elif path.startswith('/echo/'):
        echo_msg = path.split('/')[2]
        print(echo_msg)
        # send the echo message back to the client
        # and a status code of 200
        # with content type text/plain,
        # and content length of the message
        # in the respose body 
        conn.sendall(b"HTTP/1.1 200 OK\r\n" + msg_body(echo_msg))
        
    elif path == '/user-agent':
        user_agent = headers.split(b'User-Agent: ')[1].split(b'\r\n')[0].decode("utf-8")
        conn.sendall(b"HTTP/1.1 200 OK\r\n" + msg_body(user_agent))
    
    else:
        conn.sendall(b"HTTP/1.1 404 Not Found\r\n\r\n")
    conn.close()

def main():
    # You can use print statements as follows for debugging, they'll be visible when running tests.
    print("Logs from your program will appear here!")

    # Uncomment this to pass the first stage
    #
    server_socket = socket.create_server(("localhost", 4221), reuse_port=True)
    # server_socket.accept() # wait for client

    # conn, addr = server_socket.accept()
    # conn.sendall(b"HTTP/1.1 200 OK\r\n\r\n")
    # conn.close()

    server_socket.listen()

    while True:
        conn, addr = server_socket.accept()
        print("addr: ", addr)
        print("conn: ", conn)
        # handle_client(conn)
        threading.Thread(target=handle_client, args=(conn,), daemon=True).start()


if __name__ == "__main__":
    main()
