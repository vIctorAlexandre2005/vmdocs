import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { messagesOnLoading } from "../constants/messagesOnLoading";

interface LoaderProps {
  loaderIcon: React.ReactNode;
};

export function Loader({loaderIcon}: LoaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % messagesOnLoading?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loaderIcon}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={messagesOnLoading[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-700 font-medium"
          >
            {messagesOnLoading[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
