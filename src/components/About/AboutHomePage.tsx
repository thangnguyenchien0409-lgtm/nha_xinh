import { motion } from 'framer-motion';

import AboutImg from '@assets/img/abouUs.jpg';
function AboutHomePage() {
    return (
        <div className='font-roboto mt-[50px] w-full bg-[#ebebeb] px-2 py-5 lg:h-[506px] lg:p-0'>
            <div className='flex flex-col items-center gap-3 md:flex-row'>
                <div className='flex w-full justify-end md:w-[50%] lg:pr-[40px]'>
                    <div className='h-full w-full lg:w-[481px]'>
                        <motion.p
                            initial={{ opacity: 0, x: 100, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                            className='text-[19.2px] font-semibold text-[#535050] md:text-[28px]'
                        >
                            Tổ ấm của người tinh tế
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: 100, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                            className='my-5 text-[16px] leading-7 font-normal text-[#535050] md:text-[17.76px]'
                        >
                            Trong suốt hơn 25 năm qua, cảm hứng từ gu thẩm mỹ tinh tế và tinh thần
                            “Việt” đã giúp Nhà Xinh tạo ra những thiết kế độc đáo, hợp thời và chất
                            lượng. Nhà Xinh hiện đã mở 8 cửa hàng tại Việt Nam.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, x: 100, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                            className='cursor-pointer bg-[#7A9C59] px-5 py-3 text-[17px] font-bold text-white transition-colors duration-300 ease-in hover:bg-[#7A9C59]/80'
                        >
                            VỀ NHÀ XINH
                        </motion.button>
                    </div>
                </div>

                <div className='h-[286px] w-full md:w-[50%] lg:h-full'>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.08 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'linear', delay: 0.2 }}
                        src={AboutImg}
                        className='h-full w-full object-cover'
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutHomePage;
