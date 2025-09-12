import LeftHeader from '@/components/Header/components/LeftHeader';
import { useEffect, useState } from 'react';

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`font-roboto fixed top-0 left-0 z-10 w-full bg-white py-2 transition-transform duration-500 ease-in-out ${
                scrolled ? 'animate-slide-down shadow-md' : ''
            }`}
        >
            <div className='mx-auto flex h-full items-center justify-between bg-white px-2 transition-all duration-500 ease-in-out sm:mx-auto lg:max-w-7xl'>
                <LeftHeader />
                {/* <RightHeader /> */}
            </div>
            <div className='py-2 md:hidden'>{/* <InputSearch /> */}</div>
        </div>
    );
}

export default Header;
