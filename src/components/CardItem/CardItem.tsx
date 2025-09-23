import { motion } from 'framer-motion';

function CardItem({ data }: { data: any[] }) {
    return (
        <>
            {data.map((item: any, idx: number) => (
                <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                    className='mb-5 flex flex-col gap-3'
                >
                    <div className='h-[265px] w-full'>
                        <img
                            src={item.image}
                            alt=''
                            className='h-full w-full object-cover object-bottom'
                        />
                    </div>
                    <p className='font-monterrat truncate text-[17px] leading-6 font-semibold'>
                        {item.title}
                    </p>
                    <div className='h-[3px] w-[35px] bg-[#e1e1e1]'></div>
                    <p className='w-full truncate'>{item.description}</p>
                    <div className='border-text-title hover:bg-text-title w-[105px] cursor-pointer border-2 border-solid py-2 text-center font-semibold transition-all hover:text-white'>
                        Xem chi tiết
                    </div>
                </motion.div>
            ))}
        </>
    );
}

export default CardItem;
