// src/services/tareasService

const API_URL = "http://localhost:4000/api/tareas";

export async function obtenerTareas() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function crearTareas(tarea) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(tarea),
    });

    return await res.json();
}

export async function actualizarTarea(id, cambios) {
    const res = await fetch(`${API_URL}/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(cambios),

    });

    return await res.json();
}
