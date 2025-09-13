import Banner from '@assets/img/banner-location.webp';

function BannerLocation() {
    return (
        <div
            style={{ backgroundImage: `url(${Banner})` }}
            className='relative h-[355px] w-full bg-cover bg-center bg-no-repeat md:h-[415px] lg:h-[570px]'
        >
            <div className='absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-end bg-[rgba(0,0,0,0.25)] px-4'>
                <p className='mobile-sm:text-[30px] text-[40px] font-semibold text-white md:text-[60px] lg:text-[72px]'>
                    Xem, chạm và cảm nhận
                </p>
                <div className='hover:text-text-des my-[60px] cursor-pointer rounded-[4px] border-[2px] border-solid border-white px-7 py-3 text-[18px] font-semibold text-white transition-all hover:bg-white'>
                    Tìm cửa hàng
                </div>
            </div>
        </div>
    );
}

export default BannerLocation;
