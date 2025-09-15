import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import OrderSuccess from '@/pages/UserPage/page/OrderPage/OrderSucces';

function OrderSuccessStripe() {
    return (
        <div>
            <MainLayout>
                <div className='mt-[120px] border-t border-solid border-[#ebebeb] py-[50px] lg:mt-[100px]'>
                    <OrderSuccess />
                </div>
            </MainLayout>
            <Footer />
        </div>
    );
}

export default OrderSuccessStripe;
