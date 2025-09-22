import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchGetAllOrder, searchOrderByStatus } from '@/redux/orderSlice/orderSlice';
import { resetStatus } from '@/redux/orderSlice/orderSlice';
import OrderEmpty from '@assets/img/order_empty_icon.png';
import { useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { dataNavOrder } from '@/pages/UserPage/page/OrderDetailPage/data';
import OrderItem from '@/pages/UserPage/page/OrderDetailPage/OrderItem';
import { orderFilter } from '@/redux/orderSlice/orderSelector';

function OrderDetailPage() {
    const [isActiveNavOrder, setIsActiveNavOrder] = useState<string>('all');
    const [limit, setLimit] = useState(5);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const allOrder = useAppSelector(orderFilter);
    const isStatusOrder = useAppSelector((state) => state.order.isStatusOrder);

    const productOrder: any[] = allOrder?.orders || [];

    const handleNavigateProduct = () => {
        navigate('/products-page');
        dispatch(resetStatus());
    };

    const handleActiveNavOrder = (type: string) => {
        dispatch(searchOrderByStatus(type));
        setIsActiveNavOrder(type);
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
    }, [productOrder.length]);

    return (
        <div>
            <MainLayout>
                <div className='mt-[90px] flex w-full justify-between gap-6 overflow-x-auto rounded-[12px] border border-solid border-[#e1e1e1] bg-white px-2 py-3'>
                    {dataNavOrder.map((i) => (
                        <div
                            key={i.type}
                            onClick={() => handleActiveNavOrder(i.type)}
                            className={`min-w-[150px] flex-1 cursor-pointer rounded-[12px] px-2 py-3 text-center ${
                                isActiveNavOrder === i.type
                                    ? 'text-text-title bg-[#f6f6f6] font-bold'
                                    : 'font-semibold text-[#ccc]'
                            }`}
                        >
                            {i.title}
                        </div>
                    ))}
                </div>
                {productOrder.length > 0 ? (
                    <div className='border-t border-solid border-[#ebebeb]'>
                        <div
                            ref={containerRef}
                            className='mt-4 h-[400px] w-full overflow-y-auto py-4'
                        >
                            <OrderItem data={allOrder} />
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
