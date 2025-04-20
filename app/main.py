import socket
import threading 
import os
import gzip
from typing import Callable, Dict, Tuple, Any, Optional, Union, List

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
# Console handler with formatting
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# Optional: format the logs
formatter = logging.Formatter('[%(levelname)s] %(message)s')
ch.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(ch)


class HTTPServer:

    RESPONSES = {
        200: b"HTTP/1.1 200 OK\r\n",
        201: b"HTTP/1.1 201 Created\r\n",
        404: b"HTTP/1.1 404 Not Found\r\n",
        500: b"HTTP/1.1 500 Internal Server Error\r\n",
        400: b"HTTP/1.1 400 Bad Request\r\n",
        401: b"HTTP/1.1 401 Unauthorized\r\n",
    }


    def __init__(self, host="localhost", port=4221):
        self.host = host
        self.port = port
        self.server_socket = None
        # Route handlers: {method: {path_pattern: handler_function}}
        self.routes: Dict[str, Dict[str, Callable]] = {
            "GET": {},
            "POST": {},
        }
    
    def get(self, path: str, handler: Callable):
        """Register a GET route handler"""
        self.routes["GET"][path] = handler
        return self
    
    def post(self, path: str, handler: Callable):
        """Register a POST route handler"""
        self.routes["POST"][path] = handler
        return self

    
    def start(self):
        """Initialize and start the HTTP server"""
        print(f"HTTP Server starting on {self.host}:{self.port}")
        self.server_socket = socket.create_server((self.host, self.port), reuse_port=True)
        self.server_socket.listen()
        self._listen()
    
    def _listen(self):
        """Listen for incoming connections"""
        while True:
            conn, addr = self.server_socket.accept()
            print(f"New connection from {addr}")
            threading.Thread(target=self._handle_client, args=(conn,), daemon=True).start()
    
    def _handle_client(self, conn):
        """Handle client connection in a separate thread"""
        
        logger.debug('[Handling new client connection]')
        
        while True:
            try: 
                http_request = conn.recv(1024)
                if not http_request:
                    break
                
                # Create request and response objects
                request = self.Request(http_request)
                # print('Connection', request.get_header('Connection', '').lower() )

                response = self.Response(conn, request.get_header('Connection', '').lower() != 'close' )
                # print('[keep_alive]', response.keep_alive)
                
                # Route the request
                self._route_request(request, response)
                
                # Close connection if requested
                if not response.keep_alive:
                    print('[Connection closed]')
                    break
            except socket.timeout:
                print('[Connection timed out]')
                break
            except Exception as e:
                logger.error(f"[Error]: {e}")
                break
        
        conn.close()
    
    def _route_request(self, request, response):
        """Find and execute the appropriate route handler"""
        logger.debug(f"[Request]: {request}")
        # Check if method is supported
        if request.method not in self.routes:
            response.status(404).send(f"Cannot {request.method} {request.path}")
            return
        
        # Find matching route
        route_handler = None
        path_params = {}
        
        # First try exact match
        if request.path in self.routes[request.method]:
            route_handler = self.routes[request.method][request.path]
        else:
            # Try pattern matching for routes with parameters
            for route_pattern, handler in self.routes[request.method].items():
                params = self._match_route(route_pattern, request.path)
                if params is not None:
                    route_handler = handler
                    path_params = params
                    break

        if route_handler is None:
            response.status(404).send(f"Cannot {request.method} {request.path}")
            return
        
        try:
            request.params = path_params
            
            if 'gzip' in request.get_header('Accept-Encoding', '').lower():
                response.set_header('Content-Encoding', 'gzip')

            # Call the handler with request, response, and path params
            route_handler(request, response)
        except Exception as e:
            print(f"Error in route handler: {e}")
            response.send_server_error()
    
    

    def _match_route(self, pattern: str, path: str) -> Optional[Dict[str, str]]:
        """
        Match a route pattern with parameters against a real path
        Example: "/files/:filename" matches "/files/example.txt" 
                with params {"filename": "example.txt"}
        """
        pattern_parts = pattern.split('/')
        path_parts = path.split('/')
        
        if len(pattern_parts) != len(path_parts):
            return None
        
        params = {}
        for p_part, actual_part in zip(pattern_parts, path_parts):
            # If part starts with :, it's a parameter
            if p_part.startswith(':'):
                param_name = p_part[1:]
                params[param_name] = actual_part
            # Otherwise it should match exactly
            elif p_part != actual_part:
                return None
        
        return params
    
    class Request:
        """HTTP Request object"""
        def __init__(self, raw_request):
            self.raw = raw_request
            self.params = {}
            self.method = ""
            self.path = ""
            self.version = ""
            self.headers = {}
            self.body = b""
            self._parse()
        
        def _parse(self):
            """Parse the raw HTTP request"""
            try:
                # Split request into lines
                lines = self.raw.split(b"\r\n")
                
                # Parse request line
                request_line = lines[0].decode('utf-8').split()
                if len(request_line) >= 3:
                    self.method = request_line[0]
                    self.path = request_line[1]
                    self.version = request_line[2]
                elif len(request_line) >= 2:
                    self.method = request_line[0]
                    self.path = request_line[1]
                    self.version = "HTTP/1.1"  # Default
                
                # Parse headers
                header_end = self.raw.find(b"\r\n\r\n")
                if header_end != -1:
                    header_section = self.raw[:header_end].split(b"\r\n")[1:]
                    for header in header_section:
                        if b":" in header:
                            key, value = header.split(b":", 1)
                            self.headers[key.decode('utf-8').strip()] = value.decode('utf-8').strip()
                    
                    # Extract body
                    self.body = self.raw[header_end + 4:]
            except Exception as e:
                print(f"Error parsing request: {e}")
        
        def get_header(self, name: str, default=None):
            """Get header value by name (case-insensitive)"""
            for key, value in self.headers.items():
                if key.lower() == name.lower():
                    return value
            return default
        
   
    
    class Response:
        """HTTP Response object"""
        def __init__(self, conn, keep_alive: bool= True):
            self.conn = conn
            self.headers = {}
            self.status_sent = False
            self.keep_alive = keep_alive

        
        def set_header(self, name: str, value: str):
            """Set a response header"""
            self.headers[name] = value
            return self
        
        def get_header(self, name: str, default=None):
            """Get header value by name (case-insensitive)"""
            for key, value in self.headers.items():
                if key.lower() == name.lower():
                    return value
            return default
        
        def status(self, code: int):
            """Send HTTP status line"""
            self.conn.sendall(HTTPServer.RESPONSES[code])
            self.status_sent = True
            return self
        
        def send_headers(self, extra_headers: Dict[str, str] = None):
            """Send HTTP headers"""
            if not self.status_sent:
                raise RuntimeError("Cannot send headers before status line")
            
            # Make sure we have content length if not streaming
            headers_to_send = dict(self.headers)
            if extra_headers:
                headers_to_send.update(extra_headers)
            
            # Convert and send headers
            for name, value in headers_to_send.items():
                header_line = f"{name}: {value}\r\n".encode('utf-8')
                self.conn.sendall(header_line)
            
            # End of headers
            self.conn.sendall(b"\r\n")
            return self
        
        def send(self, body: str):
            """Send HTTP body"""
            logger.debug(f"Sending response:")
            if body is None or not body:
                if self.keep_alive:
                    self.set_header("Connection", "keep-alive")
                else:
                    self.set_header("Connection", "close")
                self.send_headers()
            elif isinstance(body, str) and body : 
                logger.debug(f"Sending text response: {body}")
                self._send_text(body)
        
        def _send_text(self, text: str):
            """Send a complete text response"""
            
            do_compress = self.get_header('Content-Encoding') == 'gzip'
            if do_compress: text = gzip.compress(text.encode('utf-8'))
            
            self.set_header("Content-Type", "text/plain")
            self.set_header("Content-Length", str(len(text)))
            
            if not self.keep_alive:
                self.set_header("Connection", "close")
            else:
                self.set_header("Connection", "keep-alive")
            
            self.send_headers()
            if do_compress : 
                self.conn.sendall(text)
            else:
                self.conn.sendall(text.encode('utf-8')) 
            return self
        
            

        def send_server_error(self):
            """Send a 500 Internal Server Error response"""
            self.status(500)
            self.send("Internal Server Error")
            return self
        
        def send_not_found(self):
            """Send a 404 Not Found response"""
            self.status(404)
            self.send("Not Found")
            return self
        
        def send_bad_request(self):
            """Send a 400 Bad Request response"""
            self.status(400)
            self.send("Bad Request")
            return self
        

        
        def send_file(self, path: str):
            """Send a complete file response with 200 OK"""
 
            try:
                with open(path, 'rb') as f:
                    content = f.read()
                    
                self.status(200)

                self.set_header("Content-Type", "application/octet-stream")
                self.set_header("Content-Length",  str(len(content)) )
                
                if not self.keep_alive:
                    self.set_header("Connection", "close")
                else:
                    self.set_header("Connection", "keep-alive")
                
                self.send_headers()

                self.conn.sendall(content)

                return self
            except FileNotFoundError as e:
                print(f"[ERROR] File not found: {e}.")
                self.send_server_error()
    



        
        



# Example usage in main
def main():
    ROOT_DATA_PATH = '/tmp/data/codecrafters.io/http-server-tester/'
    # Create parent directories if they don't exist
    os.makedirs(ROOT_DATA_PATH, exist_ok=True)
        
    # Create server instance
    server = HTTPServer(host="localhost", port=4221)
    
    # Define route handlers
    def handle_root(request, response):
        response.status(200).send('')
    
    def handle_echo(request, response):
        logger.info('[handle_echo]')
        logger.debug(f"Received request: {request}")
        message = request.params.get('message', '')
        # print(f"Received message: {message}")
        response.status(200).send(message)
    
    def handle_user_agent(request, response):
        try:
            user_agent = request.get_header('User-Agent')
            response.status(200).send(user_agent)
        except Exception as e:
            print(f"Error: {e}")
            response.send_bad_request()
    
    def handle_get_file(request, response):
        logger.debug('[handle_get_file]')        
        file_name = request.params['filename']
        file_path = os.path.join(ROOT_DATA_PATH, file_name)
        
        if not os.path.exists(file_path):
            response.send_not_found()
            return
        response.send_file(file_path)
    
    def handle_post_file(request, response):
        try:
            logger.debug('[handle_get_file]')        
            file_name = request.params['filename']
            file_path = os.path.join(ROOT_DATA_PATH, file_name)

            logger.debug(f"Received file: {file_name}")
            logger.debug(f"Saving to: {file_path}")
            
            with open(file_path, 'wb') as f:
                f.write(request.body)
            response.status(201).send('File created')
            
        except Exception as e:
            logger.error(f"Error writing file: {e}")
            response.send_server_error()
    
    # Register routes
    server.get("/", handle_root)
    server.get("/echo/:message", handle_echo)
    server.get("/user-agent", handle_user_agent)
    server.get("/files/:filename", handle_get_file)
    server.post("/files/:filename", handle_post_file)
    
    # Start the server
    server.start()

if __name__ == "__main__":
    main()