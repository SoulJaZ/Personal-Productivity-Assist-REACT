// components/TareaItem.jsx
import { motion } from "framer-motion";
import Botonera from "./Botonera";

function TareaItem({
  tarea,
  onActualizar,
  recargarTareas,
  modo = "completo", // o "resumen"
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
    >
      <div className="contenido-tarea">
        <span className="titulo-tarea">{tarea.nombre}</span>
        <em className="estado-tarea">{tarea.estado}</em>

        {mostrarDescripcion && tarea.descripcion && (
          <span className="descripcion-tarea">{tarea.descripcion}</span>
        )}

        {mostrarFechas && (
          <>
            <span className="fecha-creada">Creada: {tarea.creada}</span>
            <span className="fecha-detenida">
              Detenida: {tarea.detenida || "N/A"}
            </span>
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
