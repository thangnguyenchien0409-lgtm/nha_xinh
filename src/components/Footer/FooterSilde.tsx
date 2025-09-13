import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { dataLogo } from '@/components/Footer/data';

function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className='absolute top-1/2 right-0 z-10 h-[80px] -translate-y-1/2 cursor-pointer rounded-[90px] bg-black p-2 text-white opacity-0 shadow transition-opacity duration-300 ease-in group-hover:opacity-100'
        >
            <FaChevronRight size={16} />
        </button>
    );
}

function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className='absolute top-1/2 left-0 z-10 h-[80px] -translate-y-1/2 cursor-pointer rounded-[90px] bg-black p-2 text-white opacity-0 shadow transition-opacity duration-300 ease-in group-hover:opacity-100'
        >
            <FaChevronLeft size={16} />
        </button>
    );
}

function FooterSlide() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2500, // chậm hơn một chút cho mượt
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 4, slidesToScroll: 2 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
            }
        ]
    };

    return (
        <div className='group w-full border-t border-b border-solid border-[#525459] py-8'>
            <Slider {...settings} className='w-full'>
                {dataLogo.map((item, index) => (
                    <div
                        key={index}
                        className='flex items-center justify-center px-4' // padding container thay vì ảnh
                    >
                        <img
                            src={item.name}
                            alt={`logo-${index}`}
                            className='max-h-[40px] object-contain'
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default FooterSlide;
