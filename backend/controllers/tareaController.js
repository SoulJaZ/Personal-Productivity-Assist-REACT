const { leerTareas, guardarTareas } = require("../model/taskModel");

// función que obtiene una respuesta con las tareas desde el modelo que lee la data del archivo JSON.
function obtenerTareas(res) {
  const tareas = leerTareas();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tareas));
}

// Función para crear las tareas.
function crearTarea(req, res) {
  let cuerpo = "";
  req.on("data", (chunk) => (cuerpo = cuerpo + chunk));
  req.on("end", () => {
    try {
      const data = JSON.parse(cuerpo);
      const nueva = {
        id: Date.now(),
        nombre: data.nombre || "Tarea sin nombre",
        etiquetas: data.etiquetas || [],
        descripcion: data.descripcion,
        estado: "pendiente",
        creada: new Date().toISOString(),
        iniciada: null,
        detenida: null,
        duracion_tota_segundos: 0,
      };
      const tareas = leerTareas();
      tareas.push(nueva);
      guardarTareas(tareas);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(nueva));
    } catch (error) {
        
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ mensaje: "JSON malformado." }));
    }
  });
}

// Función para iniciar tareas creadas, guardadas y obtenidas.
function iniciarTarea(res, id) {
  const tareas = leerTareas();
  const idNum = Number(id);
  const posicionTarea = tareas.findIndex((tarea) => tarea.id === idNum);
  if (posicionTarea === -1) {
    res.writeHead(404);
    return res.end("Tarea no encontrada.");
  }

  tareas[posicionTarea].iniciada = new Date().toISOString();
  tareas[posicionTarea].estado = "en progreso";
  guardarTareas(tareas);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tareas[posicionTarea]));
}

// Función para detener las actividades de una tarea.
function detenerTarea(res, id) {
  const tareas = leerTareas();
  const idNum = Number(id);
  const posicionTarea = tareas.findIndex((tarea) => tarea.id === idNum);
  if (posicionTarea === -1) {
    res.writeHead(404);
    return res.end("Tarea no encontrada.");
  }

  const tarea = tareas[posicionTarea];
  if (!tarea.iniciada) {
    res.writeHead(200);
    return res.end("Tarea no está iniciada.");
  }

  const fin = new Date();
  const inicio = new Date(tarea.iniciada);
  const segundos = Math.floor((fin - inicio) / 1000);

  tarea.duracion_total_segundos += segundos;
  tarea.detenida = fin.toISOString();
  tarea.iniciada = null;
  tarea.estado = "pausada";

  guardarTareas(tareas);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tarea));
}

// Función para completar una tarea iniciada.
function completarTarea(res, id) {
  const tareas = leerTareas();
  const idNum = Number(id);
  const posicionTarea = tareas.findIndex((tarea) => tarea.id === idNum);
  if (posicionTarea === -1) {
    res.writeHead(404);
    return res.end("Tarea no encontrada");
  }

  tareas[posicionTarea].estado = "completada";
  guardarTareas(tareas);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tareas[posicionTarea]));
}

// Marcar como no completada
function marcarNoCompletada(res, id) {
    
  const tareas = leerTareas();
  const idNum = Number(id);
  const posicionTarea = tareas.findIndex((tarea) => tarea.id === idNum);

  if (posicionTarea === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ mensaje: "Tarea no encontrada." }));
  }

  tareas[posicionTarea].estado = "pendiente";
  tareas[posicionTarea].iniciada = null;
  tareas[posicionTarea].detenida = null;
  tareas[posicionTarea].duracion_tota_segundos = 0;

  guardarTareas(tareas);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tareas[posicionTarea]));
}

// Función que muestra las tareas por fecha para planear día.
function tareasPorFecha(res, fecha) {
  const tareas = leerTareas();
  const lista = tareas.filter((t) => t.creada.startsWith(fecha)); // YYYY-MM-DD
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(lista));
}
// Eliminar tarea por ID.
function eliminarTarea(res, id) {
  const tareas = leerTareas();
  const idNum = Number(id);
  const tareasActualizadas = tareas.filter((tarea) => tarea.id !== idNum);

  if (tareas.length === tareasActualizadas.length) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ mensaje: "Tarea no encontrada" }));
  }

  guardarTareas(tareasActualizadas);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ mensaje: "Tarea eliminada correctamente" }));
}

// Función para iniciar tareas creadas, guardadas, obtenidas e iniciada.
function actualizarTarea(req, res, id) {
  let cuerpo = "";
  req.on("data", (chunk) => (cuerpo = cuerpo + chunk));
  req.on("end", () => {
    const cambios = JSON.parse(cuerpo);
    const tareas = leerTareas();
    const idNum = Number(id);
    const posicionTarea = tareas.findIndex((tarea) => tarea.id === idNum);
    if (posicionTarea === -1) {
      res.writeHead(404);
      return res.end("Tarea no encontrada");
    }

    tareas[posicionTarea] = { ...tareas[posicionTarea], ...cambios };
    guardarTareas(tareas);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tareas[posicionTarea]));
  });
}

module.exports = {
  obtenerTareas,
  crearTarea,
  iniciarTarea,
  detenerTarea,
  completarTarea,
  tareasPorFecha,
  actualizarTarea,
  eliminarTarea,
  marcarNoCompletada,
};
