import { motion } from 'framer-motion';

type InspireItemType = {
    src: string;
    title: string;
    des: string;
};

function InspireItem({ src, title, des }: InspireItemType) {
    return (
        <div className='group w-full md:w-[99%]'>
            <motion.img
                src={src}
                alt=''
                className='h-[350px] w-full object-cover'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className='min-h-[120px] translate-y-5 transition-all group-hover:translate-y-2'
            >
                <p className='text-text-des mb-4 w-full truncate text-center text-xl font-semibold'>
                    {title}
                </p>
                <p className='truncate px-3 text-center text-sm font-medium'>{des}</p>
            </motion.div>
        </div>
    );
}

export default InspireItem;
