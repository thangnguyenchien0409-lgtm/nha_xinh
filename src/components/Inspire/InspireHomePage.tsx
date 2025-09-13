import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { getAllInspireApi } from '@/apis/inspireService';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import InspireItem from '@/components/Inspire/Inspiretem';

function InspireHomePage() {
    const [inSpire, setInSpire] = useState([]);
    const inSpireSlice = inSpire.slice(-4);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // mặc định desktop
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: (dots: any) => (
            <div className='mt-4'>
                <ul className='mb-10 flex justify-center gap-2'>{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className='mt-7 h-[4px] w-[30px] rounded-[99px] bg-gray-400'></div>
        ),
        responsive: [
            {
                breakpoint: 1024, // <= 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768, // <= 768px (tablet + mobile)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            }
        ]
    };

    const fetchAllInspire = async () => {
        try {
            const res = await getAllInspireApi();
            setInSpire(res.data);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        fetchAllInspire();
    }, []);

    return (
        <MainLayout>
            <p className='text-text-des mt-[50px] w-full text-center text-[40px] font-semibold'>
                Góc cảm hứng
            </p>
            <div className='mt-9 w-full max-w-full cursor-pointer overflow-hidden px-2'>
                <Slider {...settings}>
                    {inSpireSlice.map((item: any) => (
                        <InspireItem
                            key={item.id}
                            title={item.title}
                            des={item.description}
                            src={item.image}
                        />
                    ))}
                </Slider>
            </div>
        </MainLayout>
    );
}

export default InspireHomePage;
