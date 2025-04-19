import socket  # noqa: F401
import threading 
import os

ROOT_DATA_PATH = '/tmp/data/codecrafters.io/http-server-tester/'

RES_OK_LINE = b"HTTP/1.1 200 OK\r\n"
RES_CREATED_LINE = b"HTTP/1.1 201 Created\r\n"
NOT_FOUND_LINE = b"HTTP/1.1 404 Not Found\r\n\r\n"
INTERNAL_SERVER_ERROR_LINE = b"HTTP/1.1 500 Internal Server Error\r\n\r\n"

def msg_body(msg):
    # Ensure msg is a string
    if isinstance(msg, bytes):
        msg = msg.decode("utf-8")
    print('msg_body: ' + msg)
    
    # Now encode everything for the HTTP response
    return (b'Content-Type: text/plain\r\n' + 
            b'Content-Length: ' + str(len(msg)).encode() + 
            b'\r\n\r\n' + 
            msg.encode())

def handle_client(conn):
    print('[handling client]')
    while True:
        # Set a timeout to prevent hanging indefinitely
        conn.settimeout(5.0)  # 5 seconds timeout for reading
        try: 
            http_request = conn.recv(1024)
            if not http_request:
                break
            handle_request(conn, http_request)
        except socket.timeout:
            print('[timed out]')
            break
        except Exception as e:
            print('[ERROR]', e)
            break
    conn.close()

    


def handle_request(conn, http_request):

    # print(msg)
    request_line = http_request.split(b"\r\n")[0]
    headers = http_request.replace(request_line, b'').split(b'\r\n\r\n')[0]
    request_body = http_request.split(b'\r\n\r\n')[1]
    # pint request body 
    # print('headers: ', headers)
    # print('request body: ', request_body)


    method = request_line.split(b" ")[0].decode("utf-8")
    print("method: ", method)

    path = request_line.split(b" ")[1].decode("utf-8")
    print("path: ", path)

    if path == "/":
        conn.sendall(RES_OK_LINE + 
                     b'\r\n')
    
    elif path.startswith('/echo/'):
        echo_msg = path.split('/')[2]
        print('echo_msg', echo_msg)
        # send the echo message back to the client
        # and a status code of 200
        # with content type text/plain,
        # and content length of the message
        # in the respose body 
        conn.sendall(RES_OK_LINE + msg_body(echo_msg))

    elif path.startswith('/files/'):
        file_name = path.split('/')[2]
        file_path = os.path.join(ROOT_DATA_PATH, file_name)
        if method == 'GET':
            #  send no found if file not found
            # send the file content back to the client if found, in the res body 
            # with content type application/octet-stream,
            # and content length in bytes  of the file
            print('file path: ', file_path)
            try : 
                with open(file_path, 'rb') as f:
                    file_content = f.read()
                    conn.sendall(RES_OK_LINE +
                                b'Content-Type: application/octet-stream\r\n' +
                                b'Content-Length: ' + str(len(file_content)).encode() +
                                b'\r\n\r\n' + file_content
                                )
                    
            except FileNotFoundError:
                conn.sendall(NOT_FOUND_LINE)
        elif method == 'POST':
            try: 
                print('request body: ', request_body)
                print('Writing to file: ', file_path)
                # with open(file_path, 'w') as f:
                #     f.write(request_body.decode("utf-8"))
                with open(file_path, 'wb') as f:
                    f.write(request_body)
                conn.sendall(RES_CREATED_LINE + 
                     b'\r\n')
            except Exception as e:
                print(e)
                conn.sendall(INTERNAL_SERVER_ERROR_LINE)

    elif path == '/user-agent':
        user_agent = headers.split(b'User-Agent: ')[1].split(b'\r\n')[0].decode("utf-8")
        conn.sendall(RES_OK_LINE + msg_body(user_agent))
    else:
        conn.sendall(NOT_FOUND_LINE)

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
