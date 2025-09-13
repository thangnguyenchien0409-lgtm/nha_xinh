import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import Login from '@/components/Auth/Login/Login';
import { ModalContext } from '@/context/ModalContext';

function Auth() {
    const { isOpenAuth, handleToggleAuthForm } = useContext(ModalContext)!;
    return (
        <AnimatePresence>
            {isOpenAuth && (
                <motion.div
                    className='fixed inset-0 z-60 flex items-center justify-center bg-black/25'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleToggleAuthForm}
                >
                    <motion.div
                        className='absolute h-full w-[90%] sm:top-0 sm:w-[600px]'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        <Login />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Auth;
