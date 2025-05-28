const http = require("http");
const rutasModelo = require("../routes/taskRoutes");

const servidor = http.createServer((req, res) => {
    if (req.url.startsWith("api/tareas")) {
        rutasModelo(req, res);
    } else {
        res.writeHead(404);
        res.end("Ruta no válida");
    }
});

const puerto = 4000;
servidor.listen(puerto, () =>{
    console.log(`Servidor corriendo en el puerto: ${puerto}`)
})
