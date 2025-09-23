import BannerRoomPage from '@/components/Banner/BannerRoomPage/BannerRoomPage';
import { ActiveContext } from '@/context/ActiveContext';
import { dataBannerRoom } from '@/pages/UserPage/page/RoomPage/data';
import { useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    fetchGetAllProductNoLimit,
    searchProductBySubCategoryId
} from '@/redux/productSlice/productSlice';
import { fetchGetAllSubCateGory } from '@/redux/subCategorySlice/subCategorySlice';
import Footer from '@/components/Footer/Footer';
import { fetchGetAllInspire } from '@/redux/inSpireSlice/inSpireSlice';
import { fetchGetAllCollection } from '@/redux/collectionSlice/collectionSlice';
import CardItem from '@/components/CardItem/CardItem';
import BannerLocation from '@/components/Banner/BannerLocation/BannerLocation';
import { getProductSearch } from '@/redux/productSlice/productSelector';
import { useNavigate } from 'react-router-dom';

function RoomPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const product = useAppSelector(getProductSearch);
    const subCate = useAppSelector((state) => state.subCategory.subCategory);
    const inspire = useAppSelector((state) => state.inspire.inspire);
    const collection = useAppSelector((state) => state.collection.collection);

    const { room, setCurrentSubCate, setIsActiveNav } = useContext(ActiveContext)!;

    const dataBanner = dataBannerRoom.find((item) => item.type === room?.type);

    const productRoom = product.filter((item: any) => item.brand.name === room.name);
    const subCateIdInProduct = productRoom.flatMap((p: any) => p.subCategories);
    const uniqueSubCateIds = [...new Set(subCateIdInProduct)];
    const subCateRoom = subCate.filter((s: any) => uniqueSubCateIds.includes(s._id));
    const inspireRoom = inspire.filter((item: any) =>
        item.room.some((r: any) => r.name === room?.name)
    );
    const collectionRoom = collection.filter((item: any) =>
        item.room.some((r: any) => r.name === room?.name)
    );

    const handleNavigateProductByCategoryPage = (item: any) => {
        setCurrentSubCate(item);
        navigate(`/products-page`);
        setIsActiveNav('products');
    };

    // console.log('product:', product);
    // console.log('productRoom:', productRoom);
    // console.log('inspireRoom:', inspireRoom);
    // console.log('collectionRoom:', collectionRoom);

    useEffect(() => {
        dispatch(fetchGetAllProductNoLimit());
        dispatch(fetchGetAllSubCateGory());
        dispatch(fetchGetAllInspire());
        dispatch(fetchGetAllCollection());
    }, [dispatch]);

    return (
        <div>
            <div className='md:my-[90px]'>
                <AnimatePresence mode='wait'>
                    {dataBanner && (
                        <motion.div
                            key={dataBanner.type}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <BannerRoomPage data={dataBanner} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <MainLayout>
                    <div className='flex flex-col items-start gap-5 sm:flex-row md:gap-[55px]'>
                        <div className='font-roboto w-full bg-[#F6F7F8] sm:w-[230px]'>
                            <div className='text-text-title border-text-hover border-l-3 border-solid px-5 pt-4 font-semibold'>
                                Nội thất <span className='lowercase'>{dataBanner?.name}</span>
                            </div>

                            <div className='mt-[30px] flex flex-col gap-8 px-5 py-5'>
                                <p className='text-sm font-semibold'>
                                    Mẫu <span className='lowercase'>{dataBanner?.name}</span>
                                </p>
                                <div className='text-text-des flex flex-col gap-6 text-sm'>
                                    {subCateRoom.map((sub: any) => (
                                        <p
                                            onClick={() => handleNavigateProductByCategoryPage(sub)}
                                            key={sub._id}
                                            className='cursor-pointer transition-all hover:underline'
                                        >
                                            {sub.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2'>
                            <CardItem data={inspireRoom} type='inspire' />

                            <CardItem data={collectionRoom} type='collection' />
                        </div>
                    </div>
                </MainLayout>
            </div>
            <BannerLocation />
            <Footer />
        </div>
    );
}

export default RoomPage;
