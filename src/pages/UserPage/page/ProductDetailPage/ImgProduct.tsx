import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

function ImgProduct({ data }: { data: any }) {
    const [index, setIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);

    const images = data ? [data.imageCover, ...(data.images || [])] : [];

    const handleClickImage = (i: number) => {
        setDirection(i > index ? 1 : -1);
        setIndex(i);
    };

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (data) {
            setIndex(0);
        }
    }, [data]);

    // Animation variants cho slide
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0
        })
    };

    return (
        <div className='flex w-full flex-col-reverse items-center md:w-[45%] lg:w-[65%] lg:flex-row'>
            {/* Thumbnails */}
            <div className='flex flex-col items-center gap-2'>
                <FaAngleUp
                    onClick={handlePrev}
                    size={30}
                    className='hidden cursor-pointer lg:block'
                />
                <div className='mx-auto flex flex-row gap-3 lg:flex-col'>
                    {images.map((item, i) => (
                        <motion.div
                            key={i}
                            onClick={() => handleClickImage(i)}
                            className='h-[60px] w-[90px] cursor-pointer p-2 sm:h-[90px] sm:w-[140px] md:h-auto md:w-auto lg:h-[120px] lg:w-[140px]'
                            animate={{
                                borderColor:
                                    index === i ? 'rgba(204,204,204,1)' : 'rgba(204,204,204,0)',
                                y: index === i ? 4 : 0
                            }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{
                                borderWidth: 2,
                                borderStyle: 'solid',
                                borderRadius: '6px'
                            }}
                        >
                            <img className='h-full w-full object-cover' src={item} alt='' />
                        </motion.div>
                    ))}
                </div>
                <FaAngleDown
                    onClick={handleNext}
                    size={30}
                    className='hidden cursor-pointer lg:block'
                />
            </div>

            {/* Big Image */}
            <div className='group relative flex h-[420px] w-full items-center justify-center overflow-hidden lg:w-[613px]'>
                {/* Prev */}
                <GrFormPrevious
                    size={35}
                    onClick={handlePrev}
                    className='absolute left-0 z-10 translate-x-[20px] cursor-pointer opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'
                />

                <div className='relative h-full w-full cursor-pointer p-3'>
                    <AnimatePresence mode='wait' custom={direction}>
                        <motion.img
                            key={images[index]}
                            variants={variants}
                            custom={direction}
                            initial='enter'
                            animate='center'
                            exit='exit'
                            transition={{
                                x: { duration: 0.3, ease: 'easeInOut' },
                                opacity: { duration: 0.3 }
                            }}
                            className='absolute top-0 left-0 h-full w-full object-contain'
                            src={images[index]}
                            alt=''
                        />
                    </AnimatePresence>
                </div>

                {/* Next */}
                <GrFormNext
                    size={35}
                    onClick={handleNext}
                    className='absolute right-0 z-10 translate-x-[-20px] cursor-pointer opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'
                />
            </div>
        </div>
    );
}

export default ImgProduct;
