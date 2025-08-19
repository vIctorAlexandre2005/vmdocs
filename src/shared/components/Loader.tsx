import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PuffLoader } from "react-spinners";

const messages = [
  "Quase lá...",
  "Processando para você...",
  "Otimizando sua experiência...",
  "Preparando os dados...",
  "Obrigado pela paciência...",
];

export function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <PuffLoader size={50} color="#3b82f6" />
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-700 font-medium"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
