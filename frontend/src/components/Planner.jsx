// pages/Planner.jsx
import { useState } from "react";
import TareaLista from "../components/TareaLista";
import '../css/Planner.css'; // si necesitas estilos específicos

function Planner() {
  const [modoVista, setModoVista] = useState("completo");

  const alternarModo = () => {
    setModoVista((prev) => (prev === "completo" ? "resumen" : "completo"));
  };

  return (
    <div className="planner-contenedor">
      <h1 className="planner-titulo">Mi Planificador Diario</h1>

      <button className="btn-agregar" onClick={alternarModo}>
        Ver en modo {modoVista === "completo" ? "resumen" : "completo"}
      </button>

      <TareaLista modo={modoVista} />
    </div>
  );
}

export default Planner;
