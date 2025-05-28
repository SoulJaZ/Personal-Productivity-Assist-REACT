import React from 'react'
const { obtenerTareas, crearTareas, actualizarTareas } = require("../controllers/taskCrontoller")

function rutasModelo( req, res ) {
    const { method, url} = req;
    if (url === "/api/tareas" && method === "GET") {
        return obtenerTareas(res);
    }

    if (url === "api/tareas" && method === "POST") {
        return crearTareas(req, res);
    }

    if (url.startWith("/api/tareas/") && method === "PATCH") {
        const id = parseInt(url.split("/"[3]));
        return actualizarTareas(req, res, id);
    }

    res.writeHead(404);
    res.end("Ruta de tareas no encontrada");
}

module.exports = rutasModelo;