import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type ReviewOrderType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewFormValues = {
    title: string;
    ratings: number;
};

const schema = yup.object().shape({
    title: yup.string().required('Vui lòng nhập đánh giá').min(3, 'Ít nhất 3 ký tự'),
    ratings: yup.number().min(1, 'Vui lòng chọn số sao').required()
});

function ReviewOrder({ isOpen, setIsOpen }: ReviewOrderType) {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ReviewFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { title: '', ratings: 0 }
    });

    const onSubmit = (data: ReviewFormValues) => {
        console.log('Review data:', data);
        // Gọi API: addReviewApi(productId, data)
        // setIsOpen(false);
    };

    const handleToggleReviewForm = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleToggleReviewForm}
                    className='fixed top-0 right-0 bottom-0 left-0 z-1000 flex items-center justify-center bg-black/25'
                >
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: -0.8 }}
                        transition={{ duration: 0.6 }}
                        className='relative flex w-[500px] flex-col items-center justify-center gap-6 rounded-[8px] bg-white p-[20px]'
                        action=''
                    >
                        <p className='text-center text-[22px] font-medium'>Đánh giá sản phẩm</p>
                        <Controller
                            control={control}
                            name='ratings'
                            render={({ field: { value } }) => (
                                <div className='flex gap-2'>
                                    {[...Array(5)].map((_, i) =>
                                        i < value ? (
                                            <FaStar
                                                key={i}
                                                onClick={() => setValue('ratings', i + 1)}
                                                className='cursor-pointer text-[34px] text-yellow-400'
                                            />
                                        ) : (
                                            <FaRegStar
                                                key={i}
                                                onClick={() => setValue('ratings', i + 1)}
                                                className='cursor-pointer text-[34px] text-yellow-400'
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        />
                        {errors.ratings && (
                            <p className='text-sm text-red-500'>{errors.ratings.message}</p>
                        )}
                        <Controller
                            control={control}
                            name='title'
                            render={({ field }) => (
                                <TextArea
                                    style={{ height: 120 }}
                                    {...field}
                                    placeholder='Vui lòng đánh giá'
                                />
                            )}
                        />
                        {errors.title && (
                            <p className='text-sm text-red-500'>{errors.title.message}</p>
                        )}
                        <button
                            type='submit'
                            className='w-full cursor-pointer rounded-[4px] bg-black py-3 text-center text-white transition-all hover:opacity-75'
                        >
                            Đánh giá
                        </button>
                        <IoMdClose
                            onClick={handleToggleReviewForm}
                            className='absolute top-3 right-3 cursor-pointer'
                            size={22}
                        />
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ReviewOrder;
