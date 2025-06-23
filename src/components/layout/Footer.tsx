import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer 
      className="border-t border-gray-200 py-6 px-4 text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Cave Motions. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};
