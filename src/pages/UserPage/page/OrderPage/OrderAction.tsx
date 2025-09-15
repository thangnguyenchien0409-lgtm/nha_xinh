import { useFormatNumber } from '@/hooks/useFormatNumber';
import { useAppSelector } from '@/hooks/reduxHook';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { OrderFormValues } from '@/pages/UserPage/page/OrderPage/validate';

type OrderActionType = {
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
    register: UseFormRegister<OrderFormValues>;
    errors: FieldErrors<OrderFormValues>;
};

function OrderAction({ onClick, register, errors }: OrderActionType) {
    const cart = useAppSelector((state) => state.cart.cart);

    const total = cart.reduce((sum: number, item: any) => {
        return (sum += item.price * item.quantity);
    }, 0);

    return (
        <div className='border-text-title flex h-full flex-1 flex-col justify-between gap-3 border border-solid p-[30px]'>
            <div>
                <p className='text-[24px] font-semibold'>Tóm tắt đơn hàng</p>
                <div className='font-roboto mt-8'>
                    <p className='text-[20px] font-semibold'>Sản phẩm</p>
                    <div className='max-h-[400px] overflow-y-auto pr-3'>
                        {cart.map((item: any) => (
                            <div
                                key={item._id}
                                className='flex h-[120px] w-full items-center justify-between border-b border-solid border-[#ddd] lg:h-[99px]'
                            >
                                <div className='h-[72px] md:min-w-[80px] lg:min-w-[108px]'>
                                    <img
                                        className='h-full w-full object-cover'
                                        src={item.productId.imageCover}
                                        alt=''
                                    />
                                </div>
                                <div className='flex w-[50%] flex-col items-start justify-between gap-4 truncate md:w-[100px] md:text-[14px] lg:w-[50%] lg:overflow-visible lg:text-[16px] lg:text-clip lg:whitespace-normal'>
                                    <p className='w-full'>{item.productId.title}</p>
                                    <p className='w-full'>Số lượng : {item.quantity}</p>
                                </div>
                                <div className='md:text-[14px] lg:text-[16px]'>
                                    <p>
                                        {useFormatNumber(item.productId.price)}{' '}
                                        <span className='underline'>đ</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className='text-text-des mt-4 flex items-center justify-between text-sm font-medium'>
                    <p>Thành tiền</p>
                    <p>
                        {useFormatNumber(total)} <span className='underline'>đ</span>
                    </p>
                </div>

                <div className='text-text-des mt-4 flex items-center justify-between text-sm font-medium'>
                    <p className='text-[20px]'>Tổng cộng</p>
                    <p>
                        {useFormatNumber(total)} <span className='underline'>đ</span>
                    </p>
                </div>
                <div className='mt-3'>
                    <input type='checkbox' {...register('acceptTerms')} />
                    <label className='ml-3 font-semibold text-[#222]' htmlFor=''>
                        Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật,
                        điều khoản dịch vụ mua hàng online *
                    </label>
                    {errors.acceptTerms && (
                        <p className='mt-1 text-sm text-red-500'>{errors.acceptTerms.message}</p>
                    )}
                </div>
                <div
                    onClick={onClick}
                    className='mt-4 w-full cursor-pointer bg-black py-4 text-center text-[20px] font-medium text-white uppercase transition-all hover:opacity-80'
                >
                    Đặt hàng
                </div>
            </div>
        </div>
    );
}

export default OrderAction;
