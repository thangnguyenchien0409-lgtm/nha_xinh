import { useEffect, useState } from 'react';
import { GrFormNextLink } from 'react-icons/gr';

type BannerRoomItemType = {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    topDes?: string;
    rightDes?: string;
    src?: string;
    title?: string;
    des?: string;
    wImg?: string;
    hImg?: string;
    reverse?: boolean;
};

function BannerRoomItem({
    top = '',
    right = '',
    bottom = '',
    left = '',
    topDes = '',
    rightDes = '',
    src,
    title,
    des,
    wImg,
    hImg,
    reverse = false
}: BannerRoomItemType) {
    const [isPosition, setPosition] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setPosition(true);
            } else {
                setPosition(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{ top, right, bottom, left }}
            className={`gap-8 md:flex xl:absolute xl:block ${
                reverse ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
        >
            <div
                style={isPosition ? { width: wImg, height: hImg } : {}}
                className='w-full overflow-hidden sm:h-[400px] sm:w-full md:mb-8 md:w-[60%] xl:relative'
            >
                <img
                    src={src}
                    alt=''
                    className='h-full w-full cursor-pointer object-cover transition duration-500 ease-linear hover:scale-110'
                />
            </div>

            <div
                style={isPosition ? { top: topDes, right: rightDes } : {}}
                className='w-full py-6 sm:w-full md:w-[30%] lg:w-[250px] lg:py-0 xl:absolute'
            >
                <p className='text-text-title mb-[15px] text-[25px] leading-10 font-semibold md:text-[30px]'>
                    {title}
                </p>
                <p className='text-text-des mb-[10px] text-[14px] leading-6 font-medium'>{des}</p>
                <div className='flex cursor-pointer items-center justify-start gap-1 text-[14px] text-[#a9a9b2] uppercase'>
                    <p>Khám phá ngay</p>
                    <GrFormNextLink size={25} />
                </div>
            </div>
        </div>
    );
}

export default BannerRoomItem;
