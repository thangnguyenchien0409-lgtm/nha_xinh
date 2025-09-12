import { useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
import classNames from 'classnames';

type InputType = {
    style?: any;
    type: string | number;
    placeholder: string;
    register?: any;
    error: any;
    disable?: boolean;
};

function Input({ style, type, placeholder, register, error, disable = false }: InputType) {
    const [isPassword, setIsPassWord] = useState(false);
    const [isShowPassWord, setIsShowPassword] = useState(false);
    const inputType = isPassword && isShowPassWord ? 'text' : type;

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassWord);
    };

    useEffect(() => {
        if (type === 'password') {
            setIsPassWord(true);
        } else {
            setIsPassWord(false);
        }
    }, [type]);
    return (
        <div className='relative mb-5'>
            <input
                style={style}
                type={inputType}
                placeholder={placeholder}
                disabled={disable}
                autoComplete={isPassword ? 'current-password' : ''}
                {...register}
                className={classNames(
                    'mb-2 block h-11 w-full rounded-xl bg-gray-100 pl-4 shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0',
                    {
                        'border-red-400': error,
                        'border-none': !error
                    }
                )}
            />
            {isPassword && (
                <div onClick={handleShowPassword}>
                    {isShowPassWord ? (
                        <IoEyeOutline className='absolute top-[24%] right-[15px]' />
                    ) : (
                        <IoEyeOffOutline className='] absolute top-[24%] right-[15px]' />
                    )}
                </div>
            )}
            <p className='mt-1 ml-2 h-[16px] w-full text-sm text-red-500'>{error}</p>
        </div>
    );
}

export default Input;
