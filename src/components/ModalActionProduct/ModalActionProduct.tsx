import { IoMdClose } from 'react-icons/io';

import { useContext, useEffect } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { AnimatePresence, motion } from 'framer-motion';
import CartModal from '@/components/ModalActionProduct/CartModal/CartModal';

function ModalActionProduct() {
    const { typeActionProduct, isOpenModalProduct, handleToggleModalProduct } =
        useContext(ModalContext)!;

    const handleRenderModalItem = () => {
        switch (typeActionProduct) {
            case 'cart':
                return <CartModal />;
            // case 'wishlist':
            //     return <WishListModal />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpenModalProduct && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleToggleModalProduct}
                    className='fixed top-0 right-0 bottom-0 left-0 z-1000 bg-[rgba(0,0,0,0.5)]'
                >
                    <div className='absolute top-2 right-3 z-1500 cursor-pointer text-black sm:top-5 sm:right-[420px] sm:text-white'>
                        <IoMdClose size={30} />
                    </div>
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className='absolute top-0 right-0 bottom-0 w-full bg-white px-[30px] pt-[30px] sm:w-[400px]'
                    >
                        {handleRenderModalItem()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ModalActionProduct;
