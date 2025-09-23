import BannerInspire from '@/components/Banner/BannerInspire/BannerInspire';
import BannerLocation from '@/components/Banner/BannerLocation/BannerLocation';
import CardItem from '@/components/CardItem/CardItem';
import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchGetAllInspire } from '@/redux/inSpireSlice/inSpireSlice';
import { useEffect } from 'react';

function InspirePage() {
    const dispatch = useAppDispatch();
    const inspire = useAppSelector((state) => state.inspire.inspire);

    useEffect(() => {
        dispatch(fetchGetAllInspire());
    }, [dispatch]);

    return (
        <div className='mt-[90px]'>
            {' '}
            <MainLayout>
                <BannerInspire />
                <div className='my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                    <CardItem data={inspire} type='inspire' />
                </div>
            </MainLayout>
            <BannerLocation />
            <Footer />
        </div>
    );
}

export default InspirePage;
