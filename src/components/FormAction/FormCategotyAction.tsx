import OverLay from '@/components/Overlay/Overlay';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/hooks/reduxHook';
import { fetchAddCategory, fetchUpdateCategory } from '@/redux/categorySlice/categorySlice';

type FormCategotyActionType = {
    isOpenCard: boolean;
    handleToggleCard: () => void;
    typeAction: 'create' | 'update' | '';
    data?: { _id?: string; name?: string };
};

function FormCategotyAction({
    isOpenCard,
    handleToggleCard,
    typeAction,
    data
}: FormCategotyActionType) {
    const [title, setTitle] = useState('');
    const [contentBtn, setContentBtn] = useState('');

    const dispatch = useAppDispatch();

    const validateForm = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên danh mục')
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<{ name: string }>({
        resolver: yupResolver(validateForm),
        defaultValues: {
            name: typeAction === 'update' && data?.name ? data.name : ''
        }
    });

    const onSubmit = async (formData: any) => {
        if (typeAction === 'create') {
            await dispatch(fetchAddCategory(formData));
        } else if (typeAction === 'update' && data) {
            await dispatch(fetchUpdateCategory({ id: data._id, data: formData }));
        }
        handleToggleCard();
        reset();
    };

    useEffect(() => {
        if (isOpenCard && data) {
            reset({ name: data.name || '' });
        } else if (!isOpenCard) {
            reset({ name: '' });
        }
    }, [isOpenCard, data, reset, typeAction]);

    useEffect(() => {
        if (typeAction === 'update') {
            setTitle('Sửa danh mục');
            setContentBtn('Sửa');
        } else if (typeAction === 'create') {
            setTitle('Thêm danh mục');
            setContentBtn('Thêm');
        }
    }, [typeAction]);

    return (
        <>
            {isOpenCard && (
                <OverLay onClick={handleToggleCard}>
                    <div className='flex h-full items-center justify-center'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='relative w-[300px] rounded-[10px] bg-white p-4'
                        >
                            <h2 className='mb-4 text-center text-2xl font-semibold'>{title}</h2>

                            {/* Input */}
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder='Tên danh mục'
                                        style={{ marginBottom: 15, height: 40 }}
                                        status={errors.name ? 'error' : ''}
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className='text-sm text-red-500'>{errors.name.message}</p>
                            )}

                            {/* Submit button */}
                            <button
                                type='submit'
                                className='mt-4 w-full cursor-pointer rounded-[4px] border border-solid border-transparent bg-black py-2 text-white transition-all hover:border-black hover:bg-white hover:text-black'
                            >
                                {contentBtn}
                            </button>

                            {/* Close icon */}
                            <IoClose
                                className='absolute top-[10px] right-[10px] cursor-pointer'
                                size={20}
                                onClick={handleToggleCard}
                            />
                        </form>
                    </div>
                </OverLay>
            )}
        </>
    );
}

export default FormCategotyAction;
