import http from "http";
import path from "path";
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);
//---------------------------------------------
// Enrutando peticiones
switch (url) {
    case '/':
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
          <style>
            body {
              background-color: #FFFFFF;
              font-family: Comic Sans, sans-serif;
            }
            h1, h2 {
              color: #3498DB;
              text-align: center;
              margin-top: 50px;
            }
            form {
              margin-top: 30px;
              text-align: center;
            }
            input[type="text"] {
              width: 300px;
              padding: 10px;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"] {
              background-color: #3498DB;
              color: #fff;
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              cursor: pointer;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"]:hover {
              background-color: #2980B9;
            }
          </style>
        </head>
        <body> 
          <h1>&#128522; Hello from my server &#128522;</h1>
          <h2>Ingresa un mensaje</h2>
          <div>
            <form action="/message" method="POST">
              <input type="text" name="message">
              <button type="submit">Send</button>
            </form>
          </div>
          <center>
          <img width="300px" src="https://media.tenor.com/Aujc9Y0s2tkAAAAC/saludo-hola.gif">
          </center>
          </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end();
      break;
    //---------------------------------------------
    case '/author':
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      let url_image = 'https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=';
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
        </head>
        <body style="text-align: center;">
          <h1 style="color: #333;">&#9889; Author &#9889;</h1>
          <p style="color: #34495E;">Ivan Rivalcoba Rivas - Web Developer</p>
          <div>
            <img width="300px" src="https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=" alt="Foto Ivan Rivalcoba">
          </div>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end();
      break;
    case "/favicon.ico":
      // Especificar la ubicación del archivo de icono
      const faviconPath = path.join(__dirname, 'favicon.ico');
      try{
        const data = await fs.readFile(faviconPath);
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(data);
      }catch (err) {
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(`
        <html>
          <head>
            <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
            <title>My App</title>
          </head>
          <body> 
            <h1>&#128534; 500 El server esta fuera de servicio</h1>
            <p>Lo sentimos pero hubo un error en nuestro server...</p>
            <p> ${err.message}</p>
          </body>
        </html>
        `);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break
//----------------------------------------------
case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Se crea una variable para almacenar los
		    // Datos entrantes del cliente
        let body = "";
        // Se registra un manejador de eventos
        // Para la recepción de datos
        req.on("data", (data => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        }));
        // Se registra una manejador de eventos
		    // para el termino de recepción de datos
        req.on("end", () => {
          // Procesa el formulario
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          // Mediante URLSearchParams se extraen
			    // los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos
			    // en la variable params
          const parsedParams = Object.fromEntries(params);
          res.write(`
          <html>
            <head>
              <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
              <title>My App</title>
              <style>
                body {
                  background-color: #f9f9f9;
                  font-family: Arial, sans-serif;
                }
                h1 {
                  color: #e74c3c;
                  font-size: 48px;
                  margin-top: 50px;
                  text-align: center;
                }
                p {
                  font-size: 24px;
                  color: #7f8c8d;
                  text-align: center;
                  margin-top: 20px;
                }
                .error-message {
                  font-size: 18px;
                  color: #95a5a6;
                  text-align: center;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body> 
              <h1 style="color: #333"> &#127937; SERVER MESSAGE RECIEVED &#127937;</h1>
              <p>${parsedParams.message}</p>
            </body>
          </html>
          `);
          // Se finaliza la conexion
          return res.end();
        })
      } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado")
        res.end();
      }
      break;
//----------------------------------------------
    default:
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
          <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
          <title>My App</title>
        </head>
        <body> 
          <h1>&#128534; 404 Recurso no encontrado</h1>
          <p>Lo sentimos pero no tenemos lo que buscas...</p>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
      // Cerrando la comunicacion
      res.end();
      break;
  }
}); 

server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000"); 
});