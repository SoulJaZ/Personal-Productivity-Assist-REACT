const http = require("http");
const rutasModelo = require("../routes/taskRoutes");

const servidor = http.createServer((req, res) => {
  // Cabeceras CORS en TODAS las respuestas
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url.startsWith("/api/tareas")) {
    rutasModelo(req, res);
  } else {
    res.writeHead(404);
    res.end("Ruta no válida");
  }
});

const puerto = 4000;
servidor.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto: ${puerto}`);
});
