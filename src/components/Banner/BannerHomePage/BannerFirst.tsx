import Banner from '@assets/img/banner-1.jpg';

function BannerFirst() {
    return (
        <div
            className={`ld:h-[500px] flex h-[400px] w-full flex-col items-center justify-between bg-cover bg-center bg-no-repeat py-6 text-white lg:h-screen`}
            style={{ backgroundImage: `url(${Banner})` }}
        >
            <div className='mt-[90px] text-center'>
                <p className='text-[30px] font-semibold uppercase sm:text-[35px] lg:text-[45px]'>
                    Cửa hàng nhà xinh mới
                </p>
                <p className='mt-[25px] text-[20px] font-light uppercase sm:text-[28px] lg:text-[32px]'>
                    Sun Ancora, 03 Lương Yên, Hà Nội
                </p>
            </div>

            <div className='font-bold'>Mời bạn ghé thăm</div>
        </div>
    );
}

export default BannerFirst;
