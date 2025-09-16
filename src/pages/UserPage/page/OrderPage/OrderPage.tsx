import { useEffect, useState } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Footer from '@/components/Footer/Footer';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    fetchCreateCheckoutSession,
    fetchCreateOrder,
    resetStatus,
    stripePromise
} from '@/redux/orderSlice/orderSlice';
import { clearCart } from '@/redux/cartSlice/cartSlice';
import MainLayout from '@/components/Layout/MainLayout';
import InfoUser from '@/pages/UserPage/page/OrderPage/InfoUser';
import OrderAction from '@/pages/UserPage/page/OrderPage/OrderAction';
import { orderSchema, type OrderFormValues } from '@/pages/UserPage/page/OrderPage/validate';
import OrderSuccess from '@/pages/UserPage/page/OrderPage/OrderSucces';
import Loading from '@/components/Loading/Loading';

function OrderPage() {
    const [selectPayment, setSelectPayment] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const cartUser = useAppSelector((state) => state.cart.cartUser);
    const status = useAppSelector((state) => state.order.status);
    const session = useAppSelector((state) => state.order.session);

    const cartUserId = cartUser.carts?._id;

    const methods = useForm<OrderFormValues>({
        resolver: yupResolver(orderSchema) as Resolver<OrderFormValues>,
        defaultValues: {
            fullName: '',
            shippingAddress: { phone: '', postalCode: '', city: '', details: '' },
            note: '',
            acceptTerms: false
        }
    });

    const onSubmit = async (data: OrderFormValues) => {
        if (!selectPayment) {
            toast.warning('Vui lòng chọn phương thức thanh toán');
            return;
        }

        const payload = { ...data, paymentMethodType: selectPayment };

        try {
            if (selectPayment === 'cash') {
                await dispatch(fetchCreateOrder({ cartId: cartUserId, data: payload })).unwrap();
                dispatch(clearCart());
            } else if (selectPayment === 'card') {
                await dispatch(
                    fetchCreateCheckoutSession({ cartId: cartUserId, data: payload })
                ).unwrap();
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (session) {
            stripePromise.then((stripe) => {
                if (!stripe) return;
                stripe.redirectToCheckout({ sessionId: session.id }).catch(console.error);
            });
        }
    }, [session]);

    useEffect(() => {
        dispatch(resetStatus());
    }, [dispatch]);

    return (
        <div>
            <MainLayout>
                <div className='mt-[120px] border-t border-solid border-[#ebebeb] py-[50px] lg:mt-[100px]'>
                    {status === 'loading' ? (
                        <Loading />
                    ) : status === 'success' && selectPayment === 'cash' ? (
                        <OrderSuccess />
                    ) : (
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className='flex flex-col gap-6 md:flex-row'
                            >
                                <InfoUser
                                    selectPayment={selectPayment}
                                    setSelectPayment={setSelectPayment}
                                />
                                <OrderAction
                                    onClick={methods.handleSubmit(onSubmit)}
                                    register={methods.register}
                                    errors={methods.formState.errors}
                                />
                            </form>
                        </FormProvider>
                    )}
                </div>
            </MainLayout>
            <Footer />
        </div>
    );
}

export default OrderPage;
