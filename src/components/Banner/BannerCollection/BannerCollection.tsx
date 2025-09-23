import Banner from '@/assets/img/banner-collection.jpg';

function BannerCollection() {
    return (
        <div
            style={{ backgroundImage: `url(${Banner})` }}
            className='relative flex h-[300px] w-full items-end bg-cover bg-center bg-no-repeat sm:h-[400px] md:h-[486px]'
        >
            <div className='absolute inset-0 bg-black/25'></div>
            <div className='text-shadow-b z-1 flex w-full flex-col items-center justify-between gap-4 p-[50px] text-white sm:flex-row'>
                <p className='text-[35px] font-semibold text-white md:text-[45px]'>Bộ sưu tập</p>
                <p className='text-[18px]'>
                    Trang chủ <span className='opacity-50'>/</span>{' '}
                    <span className='font-semibold'>Bộ sưu tập</span>
                </p>
            </div>
        </div>
    );
}

export default BannerCollection;
