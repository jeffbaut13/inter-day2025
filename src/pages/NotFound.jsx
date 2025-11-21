import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-[20rem] md:text-[30rem] font-prosperoSemiBold text-primary">
          404
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/"
            className="btn-primary flex items-center gap-3 px-8 py-4 text-primary hover:text-secundary transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
