import { motion } from "framer-motion";
import type { State } from "../hooks/useEngine";


const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className,
}:{
    state: State;
    errors: number;
    accuracyPercentage: number;
    total: number;
    className?: string;
  }) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.8 };

  if (state !== "finish") {
    return null;
  }


  return (
  <motion.ul
    className={`flex flex-col items-center text-yellow-200 space-y-3 $
     {className}`}
    >
    <motion.li
      initial={initial}
      animate={animate}
      className="text-xl font-semibold"
      transition={{ ...duration, delay: 0}}
    >
    Results
    </motion.li>
    <motion.li
      initial={initial}
      animate={animate}
      transition={{ ...duration, delay: 0.5}}
    >
    Accuracy: {accuracyPercentage}
    </motion.li>
    <motion.li
      initial={initial}
      animate={animate}
      transition={{ ...duration, delay: 1}}
      className="text-red-500">Errors : {errors}
    </motion.li>
    <motion.li
      initial={initial}
      animate={animate}
      transition={{ ...duration, delay: 1.5}}
    >
    Typed: {total}
    </motion.li>
    </motion.ul>
    );
};

export default Results;
