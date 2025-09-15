import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { fetchCancelledOrder, fetchGetAllOrder } from '@/redux/orderSlice/orderSlice';
import { resetStatus } from '@/redux/orderSlice/orderSlice';
import OrderEmpty from '@assets/img/order_empty_icon.png';
import { useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';

function OrderDetailPage() {
    const [limit, setLimit] = useState(5);
    const containerRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const allOrder = useAppSelector((state) => state.order.allOrder);
    const isStatusOrder = useAppSelector((state) => state.order.isStatusOrder);

    const productOrder: any[] = allOrder?.orders || [];

    const handleCancelledOrder = (orderId: string) => {
        dispatch(fetchCancelledOrder({ orderId }));
        dispatch(fetchGetAllOrder({ page: 1, limit }));
    };

    const handleNavigateProduct = () => {
        navigate('/products-page');
        dispatch(resetStatus());
    };

    useEffect(() => {
        dispatch(fetchGetAllOrder({ page: 1, limit }));
    }, [dispatch, limit, isStatusOrder]);

    useEffect(() => {
        const container: any = containerRef.current;

        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
                setLimit((prev) => prev + 5);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <MainLayout>
                {productOrder.length > 0 ? (
                    <div className='mt-[120px] border-t border-solid border-[#ebebeb] py-[50px] lg:mt-[100px]'>
                        <p className='text-text-title font-monterrat text-[28px] font-semibold'>
                            Đơn hàng
                        </p>
                        <div className='mt-8 grid grid-cols-2'>
                            <div className='border-text-title w-full border border-solid p-[30px]'>
                                <div ref={containerRef} className='max-h-[500px] overflow-y-auto'>
                                    {productOrder.map((item) => (
                                        <div
                                            key={item._id}
                                            className='w-full border-b border-solid border-[#ddd] py-3 pr-3 last:border-transparent'
                                        >
                                            {item.cartItems.map((product: any) => (
                                                <div
                                                    key={product._id}
                                                    className='flex h-[120px] w-full items-center justify-between lg:h-[99px]'
                                                >
                                                    <div className='flex items-center gap-4'>
                                                        <div className='h-[90px] max-h-[200px] w-[120px] overflow-y-auto'>
                                                            <img
                                                                className='h-full w-full object-cover'
                                                                src={product.productId.imageCover}
                                                                alt=''
                                                            />
                                                        </div>
                                                        <div className='text-text-title'>
                                                            <p>Số lượng:{product.quantity}</p>
                                                        </div>
                                                    </div>

                                                    <div className='flex gap-2'>
                                                        <p>Giá:</p>
                                                        {useFormatNumber(product.price)}
                                                        <span className='underline'>đ</span>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className='text-text-des mt-4 flex items-center justify-between text-sm font-medium'>
                                                <p className='text-[18px]'>Trạng thái</p>
                                                {item?.status === 'pending' ? (
                                                    <p>Chờ xác nhận</p>
                                                ) : item?.status === 'confirmed' ? (
                                                    <p>Đã xác nhận</p>
                                                ) : item?.status === 'shipping' ? (
                                                    <p>Đang vận chuyển</p>
                                                ) : item?.status === 'cancelled' ? (
                                                    <p>Đã hủy</p>
                                                ) : (
                                                    <p>Giao hàng thành công</p>
                                                )}
                                            </div>

                                            <div className='text-text-des mt-4 flex items-center justify-between text-sm font-medium'>
                                                <p className='text-[18px]'>Thanh toán</p>
                                                <p>
                                                    {item?.isPaid
                                                        ? ' Đã thanh toán'
                                                        : 'Thanh toán khi nhận hàng'}
                                                </p>
                                            </div>

                                            <div className='text-text-des mt-4 flex items-center justify-between text-sm font-medium'>
                                                <p className='text-[18px]'>Tổng tiền</p>
                                                <p>
                                                    {useFormatNumber(item?.totalOrderPrice)}{' '}
                                                    <span className='underline'>đ</span>
                                                </p>
                                            </div>

                                            <div className='mt-6 flex justify-end gap-4 text-[18px] uppercase'>
                                                {item?.status === 'cancelled' ? (
                                                    <div className='border-text-title min-w-[100px] cursor-pointer border border-solid px-2 py-3 text-center font-semibold transition-all hover:bg-black hover:text-white'>
                                                        Mua lại
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleCancelledOrder(item._id)
                                                        }
                                                        className='border-text-title cursor-pointer border border-solid px-2 py-3 text-center font-semibold transition-all hover:bg-black hover:text-white'
                                                    >
                                                        Hủy đơn hàng
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex min-h-[500px] w-full flex-col items-center justify-center gap-5'>
                        <div className='h-[180px] w-[180px]'>
                            <img className='h-full w-full object-cover' src={OrderEmpty} alt='' />
                        </div>
                        <div className='font-roboto text-center'>
                            <p className='text-text-hover text-[24px] font-semibold'>
                                Bạn chưa có đơn hàng nào
                            </p>
                        </div>
                        <div className='mt-2 flex gap-3 text-[18px] font-semibold'>
                            <div
                                onClick={handleNavigateProduct}
                                className='cursor-pointer rounded-[4px] bg-red-500 px-3 py-2 text-white transition-all hover:opacity-80'
                            >
                                Tiếp tục mua sắm
                            </div>
                        </div>
                    </div>
                )}
            </MainLayout>
            <Footer />
        </div>
    );
}

export default OrderDetailPage;
