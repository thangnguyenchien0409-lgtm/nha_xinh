import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchProductById } from '@/redux/productSlice/productSlice';
import MainLayout from '@/components/Layout/MainLayout';
import ImgProduct from '@/pages/UserPage/page/ProductDetailPage/ImgProduct';
import InfoProduct from '@/pages/UserPage/page/ProductDetailPage/InfoProduct';
import ProductHomePage from '@/components/Product/ProductHomePage';
import BannerRoom from '@/components/Banner/BannerHomePage/BannerRoom/BannerRoom';
import { dataImgProduct } from '@/pages/UserPage/page/ProductPage/data';
import Review from '@/components/Review/Review';

function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const productDetail = useAppSelector((state) => state.product.productById);
    const status = useAppSelector((state) => state.product.status);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (status === 'loading' || !productDetail) {
        return (
            <MainLayout>
                <div className='mt-[82px] flex w-full justify-center py-[50px]'>Loading...</div>
            </MainLayout>
        );
    }

    if (!productDetail?._id) {
        return (
            <MainLayout>
                <div className='mt-[82px] flex w-full justify-center py-[50px]'>
                    <p>Sản phẩm không tồn tại!</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <div>
            <MainLayout>
                <div className='mt-[120px] flex w-full flex-col justify-center border-t border-solid border-[#ebebeb] py-[50px] lg:mt-[82px]'>
                    <p className='text-[16px] font-normal text-[#666666B2]'>
                        Trang chủ <span>/</span> {productDetail.brand.name} <span>/</span>{' '}
                        {productDetail.category.name}
                    </p>
                    <div className='mt-5 flex flex-col items-start gap-6 md:flex-row md:gap-[100px] lg:gap-6'>
                        <ImgProduct data={productDetail} />
                        <InfoProduct data={productDetail} />
                    </div>
                </div>
                {productDetail?.reviews.length > 0 && <Review data={productDetail} />}
                <ProductHomePage />
            </MainLayout>
            <BannerRoom isBgWhite={true} data={dataImgProduct} />
            <Footer />
        </div>
    );
}

export default ProductDetailPage;
