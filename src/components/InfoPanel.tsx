import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfoPanelProps {
  className?: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        'glass-panel p-6 max-w-md text-left',
        className
      )}
    >
    </motion.div>
  );
};

export default InfoPanel;