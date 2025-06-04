// components/TareaItem.jsx
import { motion } from "framer-motion";
import { Clock, Pause } from "lucide-react";
import Botonera from "./Botonera";

function TareaItem({
  tarea,
  onActualizar,
  recargarTareas,
  modo = "completo",
  mostrarFechas = true,
  mostrarDescripcion = true
}) {
  const claseItem = `tarea-item ${modo === "resumen" ? "resumen" : ""}`;

  return (
    <motion.li
      className={claseItem}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="contenido-tarea">
        <h3 className="titulo-tarea">{tarea.nombre}</h3>
        <em className="estado-tarea">{tarea.estado}</em>

        {mostrarDescripcion && tarea.descripcion && (
          <p className="descripcion-tarea">{tarea.descripcion}</p>
        )}

        {mostrarFechas && (
          <>
            <time className="fecha-creada" dateTime={tarea.creada}>
              <Clock size={13} style={{ marginRight: '3px' }} />
              Creada: {tarea.creada}
            </time>
            <time className="fecha-detenida" dateTime={tarea.creada}>
              <Pause size={13} style={{ marginRight: '4px' }} />
              Detenida: {tarea.detenida || "N/A"}
            </time>
          </>
        )}

        {modo === "completo" && (
          <div className="acciones-tarea">
            <Botonera
              tarea={tarea}
              onActualizar={onActualizar}
              recargarTareas={recargarTareas}
            />
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default TareaItem;
