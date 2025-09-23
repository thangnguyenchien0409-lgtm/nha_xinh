import BannerCollection from '@/components/Banner/BannerCollection/BannerCollection';
import CardItem from '@/components/CardItem/CardItem';
import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchGetAllCollection } from '@/redux/collectionSlice/collectionSlice';
import { useEffect } from 'react';

function CollectionPage() {
    const dispatch = useAppDispatch();
    const collection = useAppSelector((state) => state.collection.collection);

    useEffect(() => {
        dispatch(fetchGetAllCollection());
    }, [dispatch]);

    return (
        <div className='mt-[90px]'>
            <BannerCollection />
            <MainLayout>
                <div className='mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                    <CardItem data={collection} type='collection' />
                </div>
            </MainLayout>
            <Footer />
        </div>
    );
}

export default CollectionPage;
