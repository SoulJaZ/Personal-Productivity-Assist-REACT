
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  iniciarTarea,
  detenerTarea,
  completarTarea,
  tareasPorFecha,
  sincronizar,
  eliminarTarea,
  marcarNoCompletada
} = require("../controllers/tareaController");

function rutasModelo( req, res ) {

    // Cabeceras CORS, se usan cuando no se usa Express.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Manejar preflight
    if (req.method === "OPTIONS") {
        res.writeHead(404);
        return res.end();
    }

    const { method, url} = req;
    if (url === "/api/tareas" && method === "GET") {
        return obtenerTareas(res);
    }

    if (url === "/api/tareas" && method === "POST") {
        return crearTarea(req, res);
    }

    if (url.startsWith("/api/tareas") && method === "DELETE") {
        const partes = url.split("/");
        const id = parseInt(partes[3]);

        if (isNaN(id)) {
            res.writeHead(400);
            return res.end("ID NO VÁLIDO.");
        }
        return eliminarTarea(res, id);  
    
    }

    if (url.startsWith("/api/tareas/") && method === "PATCH") {
        const partes = url.split("/");
        const id = parseInt(partes[3]);
        const accion = partes[4];

        if (isNaN(id)) {
            res.writeHead(404);
            return res.end("ID no válido")
        }

        if (!accion) {
            return actualizarTarea(req, res, id);
        }
        if (accion === "iniciar") {
            return iniciarTarea(res, id);
        }
        if (accion === "detener") {
            return detenerTarea(res, id)
        }
        if (accion === "completar") {
            return completarTarea(res, id)
        }
        if (accion === "no-completar") {
            return marcarNoCompletada(res, id);
        }
    }
    if (url.startsWith("/api/planear/") && method === "GET") {
        const fecha = url.split("/")[3];
        return tareasPorFecha(req, fecha);
    }

    res.writeHead(404);
    res.end("Ruta no encontrada");
}

module.exports = rutasModelo;