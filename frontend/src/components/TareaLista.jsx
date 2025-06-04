// components/TareaLista.jsx
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { obtenerTareas } from "../services/taskService";
import TareaItem from "../components/TareaItem";

import "../css/Tarea.css";

function TareaLista({ modo, recargar  }) {
  const [tareas, setTareas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarTareas = async () => {
    const data = await obtenerTareas();
    setTareas(data);
  };

  const actualizarTarea = (id, tareaActualizada) => {
    setTareas(prev =>
      prev.map(t => (t.id === id ? { ...t, ...tareaActualizada } : t))
    );
  };

  useEffect(() => {
    cargarTareas();
  }, [recargar]);
 
  return (
    <div className="lista-contenedor">
      <h2 className="titulo-lista">Mis Tareas</h2>

      <button
        className="btn-agregar"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Cancelar" : "Mostrar tareas"}
      </button>

      {mostrarFormulario && (
        <ul className="lista-tareas">
          <AnimatePresence>
            {tareas.length === 0 ? (
              <p style={{ textAlign: "center", color: "#fff" }}>
                No tienes tareas pendientes
              </p>
            ) : (
              tareas.map((t) => (
                <TareaItem
                  key={t.id}
                  tarea={t}
                  modo={modo}
                  onActualizar={actualizarTarea}
                  recargarTareas={recargar}
                />
              ))
            )}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default TareaLista;
