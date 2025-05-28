import React from 'react'
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  iniciarTareas,
  detenerTareas,
  completarTarea,
  tareasPorFecha,
  sincronizar
} = require("../controllers/tareaController");

function rutasModelo( req, res ) {
    const { method, url} = req;
    if (url === "/api/tareas" && method === "GET") {
        return obtenerTareas(res);
    }

    if (url === "api/tareas" && method === "POST") {
        return crearTarea(req, res);
    }

    if (url.startWith("/api/tareas/") && method === "PATCH") {
        const partes = url.split("/");
        const id = parseInt(partes[3]);
        const accion = partes[4];

        if (!accion) {
            return actualizarTarea(req, res, id);
        }
        if (accion === "iniciar") {
            return iniciarTareas(res, id);
        }
        if (accion === "detener") {
            return detenerTareas(res, id)
        }
        if (accion === "completar") {
            return completarTarea(res, id)
        }
    }
    if (url.startWith("/api/planear/") && method === "GET") {
        const fecha = url.split("/")[3];
        return tareasPorFecha(req, fecha);
    }

    res.writeHead(404);
    res.end("Ruta no encontrada");
}

module.exports = rutasModelo;