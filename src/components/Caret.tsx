import { motion } from 'framer-motion'

const Caret = () => {
  return (
    <motion.div
      aria-hidden={true}
      className="inline-block bg-amber-50 w-0.5 h-7"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Caret;
