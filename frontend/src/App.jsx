import { useState } from 'react'
import  TareaForm  from "./components/TareaForm";
import  TareaLista  from "./components/TareaLista"; 
import { motion, AnimatePresence } from "framer-motion";
import '../src/css/App.css';


function App() {
  const [ recargar, setRecargar ] = useState(false);

  return (
    <>
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <motion.h1
      initial={{ opacity: 0, y: -20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.6 }}
      >
        Asistente de Productividad.
      </motion.h1>
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TareaForm onTareaCreada={() => setRecargar(!recargar)} />
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={recargar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TareaLista />
        </motion.div>
      </AnimatePresence>
    </div>
    </>
  )
}

export default App
