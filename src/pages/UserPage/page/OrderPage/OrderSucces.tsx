import { useAppDispatch } from '@/hooks/reduxHook';
import { resetStatus } from '@/redux/orderSlice/orderSlice';
import Check from '@assets/img/check-order.png';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleNavigateOrderDetail = () => {
        navigate('/order-detail');
        dispatch(resetStatus());
    };

    const handleNavigateProduct = () => {
        navigate('/products-page');
        dispatch(resetStatus());
    };
    return (
        <div className='flex w-full flex-col items-center justify-center gap-5'>
            <div className='h-[80px] w-[80px]'>
                <img className='h-full w-full object-cover' src={Check} alt='' />
            </div>
            <div className='font-roboto text-center'>
                <p className='text-text-hover text-[24px] font-semibold'>Đặt hàng thành công</p>
                <p className='mt-2 text-[18px]'>
                    Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng sớm nhất{' '}
                </p>
            </div>
            <div className='mt-2 flex gap-3 text-[18px] font-semibold'>
                <div
                    onClick={handleNavigateOrderDetail}
                    className='border-text-des cursor-pointer rounded-[4px] border border-solid px-3 py-2 transition-all hover:bg-black hover:text-white'
                >
                    Xem chi tiết đơn hàng
                </div>
                <div
                    onClick={handleNavigateProduct}
                    className='cursor-pointer rounded-[4px] bg-red-500 px-3 py-2 text-white transition-all hover:opacity-80'
                >
                    Tiếp tục mua sắm
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
