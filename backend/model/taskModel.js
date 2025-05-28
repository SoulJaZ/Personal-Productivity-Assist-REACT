import React from 'react'
const fs = require("fs");
const path = require("path");


// especifica la ruta donde se encuentra la data de las tareas en el archivo Json.
const rutaDatos = Path2D.join(__dirname, "/backend/data/task.json");


function leerTareas() {
  const elementoTarea = fs.readFileSync(rutaDatos, "utf-8");
  if (elementoTarea) {
    return JSON.parse(elementoTarea);
  } else {
    return [];
  }
}
function guardarTareas(tareas) {
  fs.writeFileSync(rutaDatos, JSON.stringify(tareas, null, 2))
}

module.exports = { leerTareas, guardarTareas };
