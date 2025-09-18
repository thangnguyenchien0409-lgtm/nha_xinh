import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

type OverLayType = {
    children: ReactNode;
    onClick: () => void;
};

function OverLay({ children, onClick }: OverLayType) {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed inset-0 z-1000 flex items-center justify-center bg-black/25'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClick}
            >
                <motion.div
                    className='absolute h-full w-[90%] sm:top-0 sm:w-[600px]'
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default OverLay;
