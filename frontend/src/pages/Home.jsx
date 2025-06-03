import { Link } from "react-router-dom";
import { useState } from 'react';
import TareaForm from "../components/TareaForm";
import TareaLista from "../components/TareaLista";
import { motion, AnimatePresence } from "framer-motion";
import '../css/App.css';

function Home() {
    const [recargar, setRecargar] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <div className="home-contenedor">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Bienvenido a tu Planificador
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <Link to="/planner">
                        <button className="btn-ir-planner">Ir al Planner</button>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                className="productividad-contenedor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
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

                <AnimatePresence mode="wait">
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
            </motion.div>
        </motion.div>
    );
}

export default Home;
