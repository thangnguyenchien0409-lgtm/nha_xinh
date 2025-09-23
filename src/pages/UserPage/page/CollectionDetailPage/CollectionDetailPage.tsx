import BannerLocation from '@/components/Banner/BannerLocation/BannerLocation';
import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import ProductItem from '@/components/Product/ProductItem';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import CollectionItemPage from '@/pages/UserPage/page/CollectionDetailPage/CollectionItemPage';
import { fetchGetCollectionById } from '@/redux/collectionSlice/collectionSlice';
import { fetchGetAllProductNoLimit, addViewedProduct } from '@/redux/productSlice/productSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CollectionDetailPage() {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const collectionById = useAppSelector((state) => state.collection.collectionById) || [];
    const product = useAppSelector((state) => state.product.productNoLimit);

    const productByCollection = product.filter((p: any) => p.collections === collectionById.name);

    const handleClickProductItem = (item: any) => {
        dispatch(addViewedProduct(item));
    };

    useEffect(() => {
        dispatch(fetchGetCollectionById(id!));
        dispatch(fetchGetAllProductNoLimit());
    }, [dispatch]);

    return (
        <div className='mt-[90px]'>
            <MainLayout>
                <div
                    style={{ backgroundImage: `url(${collectionById.image})` }}
                    className='font-monterrat relative h-[355px] w-full bg-cover bg-center bg-no-repeat uppercase md:h-[415px] lg:h-[570px]'
                >
                    <div className='absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-4 bg-[rgba(0,0,0,0.25)] px-4'>
                        <p className='mobile-sm:text-[30px] text-center text-[40px] font-semibold text-white md:text-[50px] lg:text-[64px]'>
                            Bộ sưu tập {collectionById.name}
                        </p>
                        <p className='mobile-sm:text-[30px] w-[90%] text-center text-[40px] font-semibold text-white md:text-[50px] lg:text-[64px]'>
                            {collectionById.title}
                        </p>
                    </div>
                </div>

                <p className='text-text-des font-roboto mt-3 text-[16px] leading-6 uppercase italic md:text-[18px]'>
                    "{collectionById.name}" -{' '}
                    <span className='lowercase'>{collectionById.description}</span>
                </p>

                <div className='mt-10 flex flex-col gap-7'>
                    {collectionById?.subcollection?.slice(0, 1).map((item: any) => (
                        <div key={item.id} className='flex flex-col gap-4'>
                            <p className='font-monterrat text-[28px] font-semibold'>{item.title}</p>
                            <p className='text-text-des font-roboto text-[16px] leading-7 md:text-[18px]'>
                                {item.description}
                            </p>
                            <div className='flex w-full flex-col gap-4 md:h-[500px] md:flex-row lg:h-[700px]'>
                                {item.images.map((img: any) => (
                                    <div
                                        key={img.id}
                                        className='h-full w-full overflow-hidden md:w-[50%]'
                                    >
                                        <img
                                            className='h-full w-full object-cover'
                                            src={img.src}
                                            alt=''
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <CollectionItemPage data={collectionById?.subcollection?.slice(1, 2)} />

                <CollectionItemPage
                    data={collectionById?.subcollection?.slice(
                        2,
                        collectionById.subcollection.length
                    )}
                    reverse={true}
                />

                {productByCollection.length > 0 && (
                    <div className='w-full py-10'>
                        <p className='font-monterrat w-full text-center text-[42px] font-semibold'>
                            Sản phẩm thuộc bộ sưu tập
                        </p>

                        <div className='mt-9 grid w-full grid-cols-2 place-items-center gap-5 lg:grid-cols-3 xl:grid-cols-4'>
                            {productByCollection.map((item: any) => (
                                <div key={item._id} className='w-full lg:px-4'>
                                    <ProductItem
                                        id={item._id}
                                        slug={item.slug}
                                        imageCover={item.imageCover}
                                        image={item.images[0]}
                                        title={item.title}
                                        price={item.price}
                                        onClick={() => handleClickProductItem(item)}
                                        quantity={item.quantity}
                                        ratingsAverage={item.ratingsAverage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </MainLayout>

            <BannerLocation />

            <Footer />
        </div>
    );
}

export default CollectionDetailPage;
