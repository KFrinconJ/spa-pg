import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="container flex items-center justify-center">
            <motion.div
                className="p-6 space-y-4 rounded-md bg-gray-800 text-white shadow-lg text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Spinner color="primary" />
                <motion.h1
                    className="text-2xl"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Cargando...
                </motion.h1>
            </motion.div>
        </div>
    );
}
