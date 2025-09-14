import { useFormatNumber } from '@/hooks/useFormatNumber';
import { useMemo } from 'react';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function OrderSummary({ data }: { data: any }) {
    const navigate = useNavigate();

    const total = useMemo(() => {
        return data.reduce((sum: number, item: any) => {
            return (sum += item.price * item.quantity);
        }, 0);
    }, [data]);

    const handleNavigateProductPage = () => {
        navigate('/products-page');
    };

    const handleNavigateOrderPage = () => {
        navigate('/order');
    };

    return (
        <div className='font-roboto border-text-des flex flex-1 flex-col gap-5 border border-solid p-[30px]'>
            <p className='text-text-title text-2xl font-semibold'>Tóm tắt đơn hàng</p>
            <div className='flex justify-between'>
                <p className='text-text-des text-sm'>Thành tiền</p>
                <p className='font-semibold text-[#111111]'>
                    {useFormatNumber(total)} <span>đ</span>
                </p>
            </div>
            <div className='flex gap-2'>
                <input
                    type='text'
                    className='w-[70%] border border-solid border-[#666666] px-3 py-2 outline-none'
                    placeholder='Mã giảm giá'
                />
                <div className='flex flex-1 cursor-pointer items-center justify-center bg-black text-center text-white transition-all hover:opacity-85'>
                    <div>Sử dụng</div>
                </div>
            </div>

            <div className='flex justify-between'>
                <p className='text-text-des text-sm'>Tổng cộng</p>
                <p className='font-semibold text-[#111111]'>
                    {useFormatNumber(total)} <span>đ</span>
                </p>
            </div>

            <div>
                <p className='text-text-title font-semibold'>Thông tin giao hàng</p>
                <p className='text-text-des mt-2 text-sm'>
                    Đối với những sản phẩm có sẵn tại khu vực, Nhà Xinh sẽ giao hàng trong vòng 2-7
                    ngày. Đối với những sản phẩm không có sẵn, thời gian giao hàng sẽ được nhân viên
                    Nhà Xinh thông báo đến quý khách.
                </p>
            </div>

            <p className='text-text-des mt-2 text-sm'>Từ 2-6: 8:30 - 17:30</p>
            <p className='text-text-des mt-2 text-sm'>Thứ 7, CN: 9:30 - 16:30</p>
            <div className='text-text-hover'>Cửa hàng gần bạn</div>

            <div className='flex flex-col gap-4 lg:flex-row'>
                <div
                    onClick={handleNavigateProductPage}
                    className='border-text-title flex w-full cursor-pointer justify-center gap-2 border border-solid py-3 text-center transition-all hover:bg-black hover:text-white lg:w-[50%]'
                >
                    <IoReturnDownBackOutline size={20} />
                    Tiếp tục mua hàng
                </div>
                <div
                    onClick={() => handleNavigateOrderPage()}
                    className='w-full cursor-pointer border border-solid border-transparent bg-black py-3 text-center text-white transition-all hover:opacity-80 lg:w-[50%]'
                >
                    Đặt hàng
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
