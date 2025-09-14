import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import CartDetail from '@/pages/UserPage/page/CartPage/CartDetail';
import OrderSummary from '@/pages/UserPage/page/CartPage/OrderSummary';
import { fetchGetAllCart } from '@/redux/cartSlice/cartSlice';
import { useEffect } from 'react';

function CartPage() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.cart);
    console.log(cart);

    useEffect(() => {
        dispatch(fetchGetAllCart());
    }, [dispatch]);

    return (
        <>
            <MainLayout>
                <div className='mt-[120px] border-t border-solid border-[#ebebeb] py-[50px] lg:mt-[100px]'>
                    <p className='text-text-title font-monterrat text-[24px] font-semibold'>
                        Giỏ hàng
                    </p>
                    <div className='mt-5 flex flex-col gap-5 md:flex-row lg:gap-[80px]'>
                        <CartDetail data={cart} />
                        <OrderSummary data={cart} />
                    </div>
                </div>
            </MainLayout>
            <Footer />
        </>
    );
}

export default CartPage;
