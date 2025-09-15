import type { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';

type InputOrderType = {
    name: string;
    type?: string;
    label: string;
    placeholder: string;
    require?: boolean;
    register: UseFormRegisterReturn;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

function InputOrder({
    name,
    type = 'text',
    label,
    placeholder,
    require = true,
    register,
    error
}: InputOrderType) {
    return (
        <div className='mt-4 w-full'>
            <label htmlFor={name} className='my-2 block text-[14px]'>
                {label}
                {require && <span className='text-red-400'>*</span>}
            </label>

            <input
                id={name}
                {...register}
                type={type}
                placeholder={placeholder}
                className={`w-full border border-solid px-3 py-3 shadow-md outline-none ${
                    error ? 'border-red-400' : 'border-[#ddd]'
                }`}
            />
            {(error as FieldError | undefined)?.message && (
                <p className='mt-1 text-sm text-red-500'>{(error as FieldError).message}</p>
            )}
        </div>
    );
}

export default InputOrder;
