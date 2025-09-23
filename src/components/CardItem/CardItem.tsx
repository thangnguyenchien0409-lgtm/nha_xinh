import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function CardItem({ data, type }: { data: any[]; type: 'collection' | 'inspire' }) {
    const navigate = useNavigate();

    const handleClickCardItem = (id: string) => {
        if (type === 'collection') {
            navigate(`/collection-detail/${id}`);
        } else if (type === 'inspire') {
            navigate(`/inspire-detail/${id}`);
        }
    };

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
                    <div
                        onClick={() => handleClickCardItem(item.id)}
                        className='h-[265px] w-full overflow-hidden'
                    >
                        <img
                            src={item.image}
                            alt=''
                            className='h-full w-full cursor-pointer object-cover object-bottom transition-all hover:scale-110'
                        />
                    </div>
                    <p className='font-monterrat truncate text-[17px] leading-6 font-semibold'>
                        {item.title}
                    </p>
                    <div className='h-[3px] w-[35px] bg-[#e1e1e1]'></div>
                    <p className='w-full truncate'>{item.description}</p>
                    <div
                        onClick={() => handleClickCardItem(item.id)}
                        className='border-text-title hover:bg-text-title w-[105px] cursor-pointer border-2 border-solid py-2 text-center font-semibold transition-all hover:text-white'
                    >
                        Xem chi tiết
                    </div>
                </motion.div>
            ))}
        </>
    );
}

export default CardItem;
