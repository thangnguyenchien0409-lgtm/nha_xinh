import { IoCloseSharp } from 'react-icons/io5';
import { memo, useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, AnimatePresence } from 'framer-motion';

import Input from '@/components/Input/Input';
import { ModalContext } from '@/context/ModalContext';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLogin, fetchLoginWithGoogle, fetchRegister } from '@/redux/authSlice';
// import { DotLoader } from 'react-spinners';

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const { handleToggleAuthForm, isOpenAuth } = useContext(ModalContext)!;
    console.log(isOpenAuth);

    // const { status } = useSelector((state) => state.auth);
    // const dispatch = useDispatch();

    const validateForm = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
            password: yup
                .string()
                .min(8, 'Mật khẩu ít nhất 8 kí tự')
                .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ cái in hoa')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
                .required('Vui lòng nhập mật khẩu'),
            ...(isLogin
                ? {}
                : {
                      name: yup.string().required('Vui lòng nhập tên đăng kí'),
                      confirmPassword: yup
                          .string()
                          .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
                          .required('Vui lòng xác nhận mật khẩu')
                  })
        });
    }, [isLogin]);

    const {
        register,
        // handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validateForm),
        mode: 'onTouched'
    });

    const handleToggleLogin = () => {
        setIsLogin((prev) => !prev);
        setTimeout(() => reset({}, { keepErrors: false, keepValues: false }), 0);
    };

    // const handleLoginGoogle = () => {
    //     dispatch(fetchLoginWithGoogle());
    //     handleToggleAuthForm();
    // };

    // const onSubmit = (data) => {
    //     if (isLogin) {
    //         dispatch(fetchLogin(data));
    //         handleToggleAuthForm();
    //     } else {
    //         dispatch(fetchRegister(data));
    //         setIsLogin(true);
    //         setTimeout(() => reset({}, { keepErrors: false, keepValues: false }), 0);
    //     }
    // };

    return (
        <div className='h-full font-sans'>
            <div className='relative flex h-full items-center'>
                <div className='relative w-full sm:max-w-sm'>
                    <div className='card absolute h-full w-full -rotate-6 transform rounded-3xl bg-blue-400 shadow-lg' />
                    <div className='card absolute h-full w-full rotate-6 transform rounded-3xl bg-red-400 shadow-lg' />

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='relative w-full rounded-3xl bg-gray-100 px-6 py-4 shadow-md sm:w-[500px]'
                    >
                        <label className='mt-3 block text-center text-xl font-semibold text-gray-700'>
                            {isLogin ? 'Đăng nhập' : 'Đăng kí'}
                        </label>
                        <IoCloseSharp
                            onClick={handleToggleAuthForm}
                            size={20}
                            className='absolute top-[20px] right-[20px] cursor-pointer'
                        />

                        <AnimatePresence mode='wait'>
                            <motion.form
                                key={isLogin ? 'login' : 'register'}
                                // onSubmit={handleSubmit(onSubmit)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4 }}
                                className='mt-10'
                            >
                                {!isLogin && (
                                    <Input
                                        type='text'
                                        placeholder='Tên đăng kí:'
                                        register={register('name')}
                                        error={errors.name?.message}
                                    />
                                )}
                                <Input
                                    type='text'
                                    placeholder='Email:'
                                    register={register('email')}
                                    error={errors.email?.message}
                                />
                                <Input
                                    type='password'
                                    placeholder='Mật khẩu:'
                                    register={register('password')}
                                    error={errors.password?.message}
                                />
                                {!isLogin && (
                                    <Input
                                        type='password'
                                        placeholder='Xác nhận mật khẩu:'
                                        register={register('confirmPassword')}
                                        error={errors.confirmPassword?.message}
                                    />
                                )}

                                {isLogin && (
                                    <div className='mt-7 flex'>
                                        <label className='inline-flex w-full cursor-pointer items-center'>
                                            <input
                                                id='remember_me'
                                                type='checkbox'
                                                className='rounded border-gray-300 text-indigo-600 shadow-sm focus:ring focus:ring-indigo-200'
                                            />
                                            <span className='ml-2 text-sm text-gray-600'>
                                                Remember me
                                            </span>
                                        </label>
                                        <div className='w-full text-right'>
                                            <a
                                                className='text-sm text-gray-600 underline hover:text-gray-900'
                                                href='#'
                                            >
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <div className='mt-7'>
                                    <button
                                        type='submit'
                                        className='w-full rounded-xl bg-blue-500 py-3 text-white shadow-xl transition duration-500 ease-in-out hover:scale-105 hover:shadow-inner focus:outline-none'
                                    >
                                        {isLogin ? 'Đăng nhập' : 'Đăng kí'}
                                    </button>
                                </div>

                                <div className='mt-7 flex items-center text-center'>
                                    <hr className='w-full border-gray-300' />
                                    <label className='block w-full text-sm font-medium text-gray-600'>
                                        Đăng nhập bằng
                                    </label>
                                    <hr className='w-full border-gray-300' />
                                </div>

                                <div className='mt-7 flex w-full justify-center gap-4'>
                                    <button
                                        type='button'
                                        className='mr-5 w-[100px] rounded-xl bg-blue-500 px-4 py-2 text-white shadow-xl transition hover:scale-105'
                                    >
                                        Facebook
                                    </button>
                                    <button
                                        type='button'
                                        // onClick={() => handleLoginGoogle()}
                                        className='w-[100px] rounded-xl bg-red-500 px-4 py-2 text-white shadow-xl transition hover:scale-105'
                                    >
                                        Google
                                    </button>
                                </div>

                                <div className='mt-7'>
                                    <div className='flex items-center justify-center'>
                                        <label className='mr-2'>
                                            {isLogin
                                                ? 'Bạn chưa có tài khoản?'
                                                : 'Bạn đã có tài khoản'}
                                        </label>
                                        <a
                                            href='#'
                                            className='text-blue-500 transition hover:scale-105'
                                            onClick={handleToggleLogin}
                                        >
                                            {!isLogin ? 'Đăng nhập' : 'Đăng kí ngay'}
                                        </a>
                                    </div>
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Login);
