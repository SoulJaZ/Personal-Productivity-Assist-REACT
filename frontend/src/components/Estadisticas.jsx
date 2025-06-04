// components/Estadisticas.jsx
import React from "react";
import "../css/Estadisticas.css";

function Estadisticas({ tareas = [] }) {
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.estado === "completada").length;
  const enProgreso = tareas.filter((t) => t.estado === "en progreso").length;
  const pendientes = tareas.filter((t) => t.estado === "pendiente").length;

  return (
    <div className="estadisticas-contenedor">
      <h2 className="titulo-estadisticas">Resumen de Actividad</h2>
      <ul className="lista-estadisticas">
        <li>Total de tareas: <strong>{total}</strong></li>
        <li>Completadas: <strong>{completadas}</strong></li>
        <li>En progreso: <strong>{enProgreso}</strong></li>
        <li>Pendientes: <strong>{pendientes}</strong></li>
      </ul>
    </div>
  );
}

export default Estadisticas;
