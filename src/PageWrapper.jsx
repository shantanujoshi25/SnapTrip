// PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}     // animation when component appears
      animate={{ opacity: 1, y: 0 }}      // during display
      exit={{ opacity: 0, y: -20 }}       // animation when navigating away
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
