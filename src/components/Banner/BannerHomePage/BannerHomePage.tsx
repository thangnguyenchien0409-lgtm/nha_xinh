import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BannerFirst from '@/components/Banner/BannerHomePage/BannerFirst';
import BannerSecond from '@/components/Banner/BannerHomePage/BannerSecond';
import BannerCategory from '@/components/Banner/BannerHomePage/BannerCategory/BannerCategory';
import BannerRoom from '@/components/Banner/BannerHomePage/BannerRoom/BannerRoom';
import { dataImg } from '@/components/Banner/BannerHomePage/BannerRoom/data';

function BannerHomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        appendDots: (dots: any) => (
            <div className='mt-4'>
                <ul className='flex justify-center gap-2'> {dots} </ul>
            </div>
        ),
        customPaging: () => <div className='h-[4px] w-[30px] rounded-[99px] bg-gray-400'></div>
    };

    return (
        <div className='font-monterrat mt-[80px] w-full overflow-hidden px-2'>
            <Slider {...settings} className='w-full'>
                <div className='w-full cursor-pointer'>
                    <BannerFirst />
                </div>
                <div className='w-full cursor-pointer'>
                    <BannerSecond />
                </div>
            </Slider>

            <BannerCategory />
            <BannerRoom data={dataImg} isBgWhite={false} />
        </div>
    );
}

export default BannerHomePage;
