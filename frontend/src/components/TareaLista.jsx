// components/TareaLista.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../services/taskService";
import { AnimatePresence } from "framer-motion";
import TareaItem from "./TareaItem"; // Importamos el componente reutilizable
import '../css/Tarea.css';

function TareaLista() {
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
  }, []);

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
            {tareas.map((t) => (
              <TareaItem
                key={t.id}
                tarea={t}
                onActualizar={actualizarTarea}
                recargarTareas={cargarTareas}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default TareaLista;
