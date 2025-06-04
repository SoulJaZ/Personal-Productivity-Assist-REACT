// Planner.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerTareas } from "../services/taskService";
import TareaLista from "../components/TareaLista";
import Estadisticas from "./Estadisticas";


function Planner() {
  const [tareas, setTareas] = useState([]);
  const [modoVista, setModoVista] = useState("completo");

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
    <div className="planner-contenedor">
      <Estadisticas tareas={tareas}/>
      <TareaLista
        tareas={tareas}
        modo={modoVista}
        onActualizar={actualizarTarea}
        recargarTareas={cargarTareas}
      />
      <Link to="/">
        <button className="btn-ir-planner">Volver</button>
      </Link>
    </div>
  );
}

export default Planner;
