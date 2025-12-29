import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

interface AuroraProps {
    className?: string;
    colorStops?: string[];
}

export const Aurora: React.FC<AuroraProps> = ({
    className,
    colorStops = ['#e0f2fe', '#d1fae5', '#bfdbfe']
}) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-white"
            >
                {/* Animated Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-[20%] -left-[10%] h-[140%] w-[140%] opacity-20 blur-[100px]"
                    style={{
                        background: `radial-gradient(circle at center, ${colorStops[0]} 0%, transparent 70%)`
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -100, 50, 0],
                        y: [0, 100, -50, 0],
                        scale: [1, 1.1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-[20%] -right-[10%] h-[140%] w-[140%] opacity-20 blur-[100px]"
                    style={{
                        background: `radial-gradient(circle at center, ${colorStops[1]} 0%, transparent 70%)`
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, 50, -100, 0],
                        y: [0, 50, 50, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[10%] left-[20%] h-full w-full opacity-10 blur-[120px]"
                    style={{
                        background: `radial-gradient(circle at center, ${colorStops[2]} 0%, transparent 70%)`
                    }}
                />

                {/* Fine Grain/Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </motion.div>
        </div>
    );
};
