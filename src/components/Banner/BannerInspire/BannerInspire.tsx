import Banner from '@/assets/img/banner-inspire.webp';
import SubBannerFirst from '@/assets/img/banner-sub-inspire.webp';
import SubBannerSecond from '@/assets/img/banner-sub-inspire-2.webp';

function BannerInspire() {
    return (
        <div className='flex flex-col gap-6 md:flex-row'>
            <div className='group relative flex h-[500px] w-full cursor-pointer items-center justify-start overflow-hidden md:w-[60%] lg:w-[70%]'>
                <div className='absolute inset-0 bg-black/10 group-hover:bg-white/30'></div>
                <div className='absolute z-10 ml-10 flex w-[40%] flex-col gap-4 md:ml-[80px] md:w-[50%]'>
                    <p className='font-dacing text-[28px] text-white md:text-[32px]'>
                        Góc cảm hứng
                    </p>
                    <p className='font-monterrat text-[35px] font-semibold text-white text-shadow-lg md:text-[50px] lg:text-[64px]'>
                        Ý tưởng không gian sống
                    </p>
                </div>
                <img
                    className='h-full w-full transform object-cover duration-700 group-hover:scale-110'
                    src={Banner}
                    alt=''
                />
            </div>

            <div className='hidden h-[500px] flex-1 flex-col gap-6 md:flex'>
                <div className='group relative h-[275px] w-full overflow-hidden md:h-[50%]'>
                    <img
                        className='h-full w-full transform object-cover duration-500 group-hover:scale-110'
                        src={SubBannerFirst}
                        alt=''
                    />
                    <div className='absolute inset-0 cursor-pointer bg-transparent duration-500 group-hover:bg-black/20'></div>
                </div>

                <div className='group relative h-[275px] w-full overflow-hidden md:h-[50%]'>
                    <img
                        className='h-full w-full transform object-cover duration-500 group-hover:scale-110'
                        src={SubBannerSecond}
                        alt=''
                    />
                    <div className='absolute inset-0 cursor-pointer bg-transparent duration-500 group-hover:bg-black/20'></div>
                </div>
            </div>
        </div>
    );
}

export default BannerInspire;
