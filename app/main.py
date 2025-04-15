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

    msg = conn.recv(1024)
    # print(msg)
    request_line = msg.split(b"\r\n")[0]
    path = request_line.split(b" ")[1].decode("utf-8")
    print(path)
    if path == "/":
        conn.sendall(b"HTTP/1.1 200 OK\r\n\r\n")
    else:
        conn.sendall(b"HTTP/1.1 404 Not Found\r\n\r\n")
    
    # conn.close()

if __name__ == "__main__":
    main()
