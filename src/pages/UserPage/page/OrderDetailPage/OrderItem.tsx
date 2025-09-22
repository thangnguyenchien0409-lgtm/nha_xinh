import Loading from '@/components/Loading/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import ReviewOrder from '@/pages/UserPage/page/OrderDetailPage/ReviewOrder';
import { fetchCancelledOrder } from '@/redux/orderSlice/orderSlice';
import { fetchGetAllReview } from '@/redux/reviewSlice/reviewSlice';
import { useEffect, useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

type OrderItemtype = {
    data: any;
};

function OrderItem({ data }: OrderItemtype) {
    const [openReview, setOpenReview] = useState<{ productId: string; orderId: string } | null>(
        null
    );

    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.order.loading);
    const review = useAppSelector((state) => state.review.review);

    const handleActionOrder = (orderId: string, type: string) => {
        if (type === 'pending' || type === 'confirmed') {
            dispatch(fetchCancelledOrder({ orderId: orderId }));
        }
    };

    useEffect(() => {
        dispatch(fetchGetAllReview());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className='flex flex-col gap-5'>
                    {data.orders.map((order: any) => {
                        return (
                            <div
                                key={order._id}
                                className='flex w-full flex-col gap-5 rounded-[12px] border border-solid border-[#e1e1e1] p-4'
                            >
                                {/* header */}
                                <div className='flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between'>
                                    <div className='text-text-title flex items-center gap-2 font-semibold'>
                                        <HiOutlineShoppingBag size={24} />
                                        <p>#{order._id}</p>
                                    </div>

                                    {order.status === 'pending' ? (
                                        <div className='rounded-full bg-blue-200 px-3 py-2 text-blue-700'>
                                            Chờ xác nhận
                                        </div>
                                    ) : order.status === 'confirmed' ? (
                                        <div className='rounded-full bg-green-200 px-3 py-2 text-green-700'>
                                            Đã xác nhận
                                        </div>
                                    ) : order.status === 'shipping' ? (
                                        <div className='rounded-full bg-orange-200 px-3 py-2 text-orange-700'>
                                            Đang vận chuyển
                                        </div>
                                    ) : order.status === 'completed' ? (
                                        <div className='rounded-full bg-green-200 px-3 py-2 text-green-700'>
                                            Đã hoàn thành
                                        </div>
                                    ) : order.status === 'cancelled' ? (
                                        <div className='rounded-full bg-red-200 px-3 py-2 text-red-700'>
                                            Đã hủy
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                {/* body */}
                                {order?.cartItems.map((item: any) => {
                                    const isReviewed = review.some(
                                        (rev: any) =>
                                            rev.product === item.productId._id &&
                                            rev.orderId === order._id
                                    );

                                    return (
                                        <div
                                            key={item._id}
                                            className='flex w-full gap-3 overflow-hidden rounded-[12px] border border-solid border-[#e1e1e1] px-4'
                                        >
                                            <div className='h-full w-[120px]'>
                                                <img
                                                    className='h-full w-full object-contain'
                                                    src={item.productId.imageCover}
                                                    alt={''}
                                                />
                                            </div>
                                            <div className='text-text-title flex flex-1 flex-col justify-center gap-2 font-medium'>
                                                <p>{item.productId.title}</p>
                                                <p>
                                                    {useFormatNumber(item.productId.price)}{' '}
                                                    <span className='underline'>đ</span>
                                                    <span className='ml-1 text-[#ccc]'>x1</span>
                                                </p>
                                                {order.status === 'completed' && (
                                                    <div
                                                        onClick={() =>
                                                            !isReviewed &&
                                                            setOpenReview({
                                                                productId: item.productId._id,
                                                                orderId: order._id
                                                            })
                                                        }
                                                        className={`w-[100px] rounded-[4px] bg-black py-2 text-center text-white transition-all ${
                                                            !isReviewed
                                                                ? 'cursor-pointer hover:opacity-70'
                                                                : ''
                                                        }`}
                                                    >
                                                        {isReviewed ? 'Đã đánh giá' : 'Đánh giá'}
                                                    </div>
                                                )}
                                                {order.status === 'completed' && (
                                                    <ReviewOrder
                                                        isOpen={
                                                            openReview?.productId ===
                                                            item.productId._id
                                                        }
                                                        setIsOpen={() => setOpenReview(null)}
                                                        orderId={openReview?.orderId || ''}
                                                        productData={item}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className='flex items-center justify-between border-t border-solid border-[#e1e1e1] pt-4'>
                                    <div className='flex flex-col gap-3 font-medium'>
                                        <p className='text-text-title font-medium'>
                                            Tổng tiền:{' '}
                                            <span className='font-semibold'>
                                                {useFormatNumber(order.totalOrderPrice)}{' '}
                                                <span className='underline'>đ</span>
                                            </span>
                                        </p>
                                        {order.isPaid ? (
                                            <p className='text-green-400'>Đã thanh toán</p>
                                        ) : (
                                            <p className='text-orange-400'>
                                                Thanh toán khi nhận hàng
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        onClick={() => handleActionOrder(order._id, order.status)}
                                        className={`cursor-pointer rounded-full px-8 py-2 font-semibold text-white transition-all hover:opacity-80 ${
                                            order.status === 'shipping'
                                                ? 'pointer-events-none bg-[#e1e1e1]'
                                                : 'bg-black'
                                        }`}
                                    >
                                        {order.status === 'cancelled' ||
                                        order.status === 'completed'
                                            ? 'Mua lại'
                                            : order.status === 'pending' ||
                                                order.status === 'confirmed' ||
                                                order.status === 'shipping'
                                              ? 'Hủy'
                                              : ''}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default OrderItem;
