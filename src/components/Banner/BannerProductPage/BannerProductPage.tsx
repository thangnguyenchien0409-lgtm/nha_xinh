import MainLayout from '@/components/Layout/MainLayout';
import { ActiveContext } from '@/context/ActiveContext';
import Banner from '@assets/img/banner-product.jpg';
import { useContext } from 'react';

function BannerProductPage() {
    const { handleNavigateHome } = useContext(ActiveContext)!;

    return (
        <div
            style={{ backgroundImage: `url(${Banner})` }}
            className='relative h-[486px] w-full bg-cover bg-center bg-no-repeat'
        >
            <div className='absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.25)]'>
                <MainLayout>
                    <div className='absolute top-90 left-[50%] translate-x-[-50%] text-white md:left-0 md:translate-x-[50%]'>
                        <p className='text-[27px] font-semibold'>Sản phẩm</p>
                        <p
                            className='my-3 cursor-pointer text-[14.208px]'
                            onClick={handleNavigateHome}
                        >
                            Trang chủ <span className='mx-1'>/</span>{' '}
                            <span className='font-bold'>Sản phẩm</span>
                        </p>
                    </div>
                </MainLayout>
            </div>
        </div>
    );
}

export default BannerProductPage;
