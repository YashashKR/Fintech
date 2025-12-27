import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ children, className, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all duration-300",
                "bg-gradient-to-r from-primary to-emerald-600 text-white shadow-lg hover:shadow-primary/30",
                className
            )}
            {...props}
        >
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
