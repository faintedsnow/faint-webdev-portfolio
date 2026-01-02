import { motion } from "motion/react";

export function FadeIn({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.5, 
        delay: delay, 
        ease: "circOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
