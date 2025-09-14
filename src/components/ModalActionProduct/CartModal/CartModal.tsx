import { LiaShoppingBagSolid } from 'react-icons/lia';
import { IoMdClose } from 'react-icons/io';
import { useContext, useEffect, useMemo } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '@/context/ActiveContext';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchDeleteCartItem, fetchGetAllCart } from '@/redux/cartSlice/cartSlice';

function CartModal() {
    const { handleToggleModalProduct } = useContext(ModalContext)!;

    const { setIsActiveNav } = useContext(ActiveContext)!;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    let cart = useAppSelector((state) => state.cart.cart) || [];

    const totalPrice = useMemo(() => {
        return cart.reduce((sum: number, item: any) => {
            return (sum += item.price * item.quantity);
        }, 0);
    }, [cart]);

    const handleDeleteCartItem = (id: string, name: string) => {
        dispatch(fetchDeleteCartItem({ cartItemId: id }));
        toast.success(`Đã xóa sản phẩm ${name} khỏi giỏ hàng`);
    };

    const handleNavigateToProduct = () => {
        navigate('/products-page');
        handleToggleModalProduct();
        setIsActiveNav('products');
    };

    const handleNavigateCartPage = () => {
        navigate('/cart-page');
        handleToggleModalProduct();
        setIsActiveNav(null);
    };

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchGetAllCart());
        }
    }, [dispatch, isAuth]);

    return (
        <div className='font-roboto flex h-full flex-col justify-between'>
            <div className='flex flex-col items-center gap-8'>
                <p className='text-text-title text-xl font-semibold uppercase'>Cart</p>
                {isAuth && cart.length > 0 ? (
                    <div className='max-h-[400px] w-full overflow-y-auto'>
                        {cart.map((item: any, index: number) => (
                            <div key={index} className='mt-4 flex h-[80px] w-full justify-between'>
                                <div className='flex w-full items-center gap-3 overflow-hidden'>
                                    <img
                                        src={item.productId.imageCover}
                                        alt={item.productId.title}
                                        className='h-full w-[60px] cursor-pointer object-contain'
                                    />
                                    <div className='flex h-full w-[210px] flex-col justify-center gap-4'>
                                        <p className='text-text-title w-full truncate text-[18px]'>
                                            {item.productId.title}
                                        </p>
                                        <p className='text-[15px] text-[#949494]'>
                                            <span>{item.quantity}</span> x{' '}
                                            {useFormatNumber(item.productId.price)}{' '}
                                            <span className='underline'>đ</span>
                                        </p>
                                    </div>
                                </div>
                                <div
                                    onClick={() =>
                                        handleDeleteCartItem(item._id, item.productId.title)
                                    }
                                    className='flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full border-[2px] border-solid border-[#dcdcdc] text-[#ccc] transition-all hover:border-black hover:text-black'
                                >
                                    <IoMdClose />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className='text-[#eaeaeb]'>
                            <LiaShoppingBagSolid size={120} />
                        </div>
                        <p className='text-text-des text-[18px] font-medium'>
                            Không có sản phẩm nào trong giỏ hàng
                        </p>
                        <div
                            onClick={handleNavigateToProduct}
                            className='cursor-pointer bg-black px-5 py-3 text-[18px] font-bold text-white uppercase transition-all hover:opacity-80'
                        >
                            Quay lại cửa hàng
                        </div>
                    </>
                )}
            </div>

            {isAuth && cart.length > 0 && (
                <div className='flex flex-col gap-5 border-t border-solid border-[#ececec] py-6'>
                    <div className='text-text-des flex justify-between text-sm'>
                        <p>Thành tiền:</p>
                        <p>
                            {useFormatNumber(totalPrice)} <span className='underline'>đ</span>
                        </p>
                    </div>

                    <div
                        onClick={handleNavigateCartPage}
                        className='bg-text-title w-full cursor-pointer border border-solid py-3 text-center font-semibold text-white uppercase transition-all hover:border-black hover:bg-white hover:text-black'
                    >
                        Xem giỏ hàng
                    </div>

                    <div className='text-text-title border-text-title w-full cursor-pointer border border-solid bg-white py-3 text-center font-semibold uppercase transition-all hover:border-transparent hover:bg-black hover:text-white'>
                        check out
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartModal;
