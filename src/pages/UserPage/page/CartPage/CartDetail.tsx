import { useAppDispatch } from '@/hooks/reduxHook';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { fetchDeleteCartItem, fetchUpdateCartItem } from '@/redux/cartSlice/cartSlice';
import { BiHeart } from 'react-icons/bi';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

function CartDetail({ data }: { data: any }) {
    const dispatch = useAppDispatch();

    const handleDeleteCartItem = (id: string, title: string) => {
        dispatch(fetchDeleteCartItem({ cartItemId: id }));
        toast.success(`Đã xóa sản phẩm ${title} khỏi giỏ hàng`);
    };

    const handleUpdateCartItem = (id: string, quantity: number) => {
        dispatch(fetchUpdateCartItem({ cartItemId: id, quantity }));
    };

    return (
        <div className='max-h-[560px] overflow-y-auto pr-2 md:w-[55%] lg:mt-0'>
            {data.map((item: any) => (
                <div key={item._id} className='relative flex h-[290px] w-full items-center gap-4'>
                    <IoMdClose
                        onClick={() => handleDeleteCartItem(item._id, item.productId.title)}
                        size={20}
                        className='absolute top-0 right-0 cursor-pointer'
                    />
                    <div className='h-[182px] min-w-[150px] sm:min-w-[210px]'>
                        <img
                            className='h-full w-full object-cover'
                            src={item.productId.imageCover}
                            alt=''
                        />
                    </div>
                    <div className='font-roboto flex flex-col gap-2'>
                        <p className='text-text-des w-full pr-8 font-medium sm:text-[20px]'>
                            {item.productId.title}
                        </p>
                        <p className='text-sm text-[#666666]'>Kích thước: {item.productId.size}</p>
                        <p className='text-sm text-[#666666]'>
                            Số lượng trong kho: {item.productId.quantity}
                        </p>
                        <p className='text-sm font-semibold text-[#bc5c64] sm:text-[16px]'>
                            {useFormatNumber(item.productId.price)}
                            <span className='underline'>đ</span>
                        </p>
                        <BiHeart size={23} className='cursor-pointer' />
                        <div className='flex items-center'>
                            <div
                                onClick={() =>
                                    handleUpdateCartItem(
                                        item._id,
                                        item.quantity - 1 <= 1 ? 1 : item.quantity - 1
                                    )
                                }
                                className='cursor-pointer bg-[#f3f6f7] p-2 transition-all hover:bg-gray-400'
                            >
                                <FiMinus />
                            </div>
                            <div className='bg-white px-3 py-2'>{item.quantity}</div>
                            <div
                                onClick={() =>
                                    handleUpdateCartItem(
                                        item._id,
                                        item.quantity + 1 >= item.productId.quantity
                                            ? item.productId.quantity
                                            : item.quantity + 1
                                    )
                                }
                                className='cursor-pointer bg-[#f3f6f7] p-2 transition-all hover:bg-gray-400'
                            >
                                <FiPlus />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CartDetail;
