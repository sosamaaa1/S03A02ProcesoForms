import path from "path";

import { promises as fs } from 'fs';

  export default async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);
// Enrutando peticiones
switch (url) {
  case '/':
  // Estableciendo cabeceras
  res.setHeader('Content-Type', 'text/html');
  try {
    // Lee el contenido de index.html
    const content = await fs.readFile('./index.html', 'utf-8');
    // Envía el contenido como respuesta
    res.write(content);
    console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
    // Estableciendo codigo de respuesta
    res.statusCode = 200;
    // Cerrando la comunicacion
    res.end();
  } catch (err) {
    // Si hay un error al leer el archivo, envía una respuesta 500
    console.error(err);
    res.statusCode = 500;
    res.write(`Error al leer index.html: ${err.message}`);
    res.end();
  }
  break;

case '/author':
  // Estableciendo cabeceras
  res.setHeader('Content-Type', 'text/html');
  try {
    // Lee el contenido de author.html
    const content = await fs.readFile('./author.html', 'utf-8');
    // Envía el contenido como respuesta
    res.write(content);
    console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
    // Estableciendo codigo de respuesta
    res.statusCode = 200;
    // Cerrando la comunicacion
    res.end();
  } catch (err) {
    // Si hay un error al leer el archivo, envía una respuesta 500
    console.error(err);
    res.statusCode = 500;
    res.write(`Error al leer author.html: ${err.message}`);
    res.end();
  }
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
        const content = await fs.readFile('./500.html', 'utf-8');
        // Envía el contenido como respuesta
        res.write(content);

        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        console.log(`📣 Error: 500 ${err.message}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break
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
        req.on("end", async () => {
          // Procesa el formulario
          // Mediante URLSearchParams se extraen
			    // los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos
			    // en la variable params
          const parsedParams = Object.fromEntries(params);
          // Almacenar el mensaje en un archivo
          fs.writeFile('message.txt', parsedParams.message);
          // Establecer codigo de respueste 
          // Para direccionamiento
          res.statusCode = 302;
          // Establecer el redireccionamiento
          res.setHeader('Location', '/');
          // Se finaliza la conexion
          return res.end();
      })
     } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado")
        res.end();
      }
      break;
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
};
