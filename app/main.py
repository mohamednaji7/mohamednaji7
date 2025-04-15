import socket  # noqa: F401


def main():
    # You can use print statements as follows for debugging, they'll be visible when running tests.
    print("Logs from your program will appear here!")

    # Uncomment this to pass the first stage
    #
    server_socket = socket.create_server(("localhost", 4221), reuse_port=True)
    # server_socket.accept() # wait for client

    # server_socket.accept()[0].sendall(b"HTTP/1.1 200 OK\r\n\r\n")
    conn, addr = server_socket.accept()
    # conn.sendall(b"HTTP/1.1 200 OK\r\n\r\n")
    # conn.close()

    http_request = conn.recv(1024)
    # print(msg)
    request_line = http_request.split(b"\r\n")[0]
    path = request_line.split(b" ")[1].decode("utf-8")
    print(path)
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
        conn.sendall(b'HTTP/1.1 200 OK\r\n'
                     + b'Content-Type: text/plain\r\n'
                     + b'Content-Length: ' + str(len(echo_msg)).encode() + b'\r\n\r\n'
                     + echo_msg.encode()
                     )
    
        

        
    else:
        conn.sendall(b"HTTP/1.1 404 Not Found\r\n\r\n")
    

    # conn.close()

if __name__ == "__main__":
    main()
