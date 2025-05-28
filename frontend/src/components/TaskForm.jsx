import React from 'react'
import { useState } from 'react';

function TaskForm({ onAdd }) {

    // Variables para el nonbre y las etiquetas. 
    const [nombre, setNombre] = useState("");
    const [etiquetas, setEtiquetas] = useState("");

    function handleSubmit (e){
        e.preventDefault();
        if (!nombre.trim()) return; 

        const nuevaTarea = {
            nombre, 
            etiquetas: etiquetas.split("").map(e => e.trim()),
            estado: "pendiente"
        };
        onAdd(nuevaTarea);
        setNombre("");
        setEtiquetas("");
    };
  return (
    <form onSubmit={handleSubmit} className="p.-4 flex flex-col gap-2">
        <input
        type="text"
        placeholder="Nombre de la tarea"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Etiquetas (separadas por comas)"
        value={etiquetas}
        onChange={(e) => setEtiquetas(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Agregar Tarea
      </button>
    </form>

  )
};

export default TaskForm
