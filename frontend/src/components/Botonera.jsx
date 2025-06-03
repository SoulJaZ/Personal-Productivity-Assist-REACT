// src/components/Botonera.jsx
import React from "react";
import { motion } from "framer-motion";
import "../css/Botonera.css";

function Botonera({ tarea, onActualizar, recargarTareas }) {
  const enviarAccion = async (accion) => {
    const res = await fetch(
      `http://localhost:4000/api/tareas/${tarea.id}/${accion}`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      const data = await res.json();
      onActualizar(tarea.id, data);
      
    }
  };

  return (
    <div className="Botonera">
      {tarea.estado === "pendiente" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn iniciar"
          onClick={() => enviarAccion("iniciar")}
        >
          Iniciar
        </motion.button>
      )}
      {tarea.estado === "pausada" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn iniciar"
          onClick={() => enviarAccion("iniciar")}
        >
          Iniciar
        </motion.button>
      )}
      {tarea.estado === "en progreso" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn detener"
          onClick={() => enviarAccion("detener")}
        >
          Detener
        </motion.button>
      )}
      {tarea.estado === "completada" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn no-completar"
          onClick={() => enviarAccion("no-completar")  
          }
        >
          No completar
        </motion.button>
      )}

      {tarea.estado === "en progreso" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn completar"
          onClick={() => enviarAccion("completar")}
        >
          completar
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn eliminar"
        onClick={async () => {
          const res = await fetch(`http://localhost:4000/api/tareas/${tarea.id}`, {
            method: "DELETE"
          });

          if (res.ok) {
            onActualizar(tarea.id, null); // null indica eliminación
            recargarTareas();
          }
        }}
      >
        Eliminar
      </motion.button>

    </div>
  );
}
export default Botonera;
