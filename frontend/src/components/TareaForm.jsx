import { useState } from "react";
import { motion } from "framer-motion";
import "../css/TareaForm.css";

function TareaForm({ onTareaCreada }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [duracionEstimada, setDuracionEstimada] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaTarea = {
      nombre,
      descripcion,
      estado: "pendiente",
      creada: new Date().toISOString(),
      iniciada: null,
      detenida: null,
      duracion_total_segundos: duracionEstimada ? parseInt(duracionEstimada) * 60 : null,
    };

    const res = await fetch("http://localhost:4000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    });

    if (res.ok) {
      const data = await res.json();
      // Limpiar campos
      setNombre("");
      setDescripcion("");
      setFechaInicio("");
      setFechaLimite("");
      setDuracionEstimada("");
      onTareaCreada(data);
    }
  };

  return (
    <motion.form className="formulario" onSubmit={handleSubmit}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    >
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Título de la tarea"
        required
        className="input-tarea"
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="input-tarea"
      />
      <label>Fecha de inicio:</label>
      <input
        type="datetime-local"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="input-tarea"
      />
      <label>Fecha límite:</label>
      <input
        type="datetime-local"
        value={fechaLimite}
        onChange={(e) => setFechaLimite(e.target.value)}
        className="input-tarea"
      />
      <label>Duración estimada (minutos):</label>
      <input
        type="number"
        min="1"
        value={duracionEstimada}
        onChange={(e) => setDuracionEstimada(e.target.value)}
        className="input-tarea"
      />
      <button type="submit" className="btn-agregar">Agregar</button>
    </motion.form>
  );
}

export default TareaForm;
