import { FiMenu } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Logo from '@assets/img/logo-NX-web.png';
// import SubNav from '@/components/Header/components/SubNav/SubNav';
import { useContext } from 'react';
// import { ModalContext } from '@/context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '@/context/ActiveContext';
import { dataNav, dataSubNav } from '@/components/Header/data';
import SubNav from '@/components/Header/components/SubNav';
import { ModalContext } from '@/context/ModalContext';

type Item = {
    type: string;
    path: string;
    name: string;
};

function LeftHeader() {
    const { isActiveNav, setIsActiveNav, handleNavigateHome, setRoom, setCurrentSubCate } =
        useContext(ActiveContext)!;

    const { handleToggleSideBar } = useContext(ModalContext)!;

    const navigate = useNavigate();

    const handleClickNavItem = (item: Item) => {
        setIsActiveNav(item.type);
        setCurrentSubCate(null);
        navigate(item.path);
    };

    const handleClickSubNavItem = (i: any) => {
        setRoom(i);
        setIsActiveNav('rooms');
        navigate(i.path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='flex items-center justify-center gap-[20px]'>
            <FiMenu onClick={handleToggleSideBar} className='cursor-pointer text-xl sm:text-3xl' />
            <img
                onClick={() => handleNavigateHome()}
                className='w-[150px] cursor-pointer sm:w-[180px]'
                src={Logo}
                alt=''
            />
            <ul className='hidden items-center justify-center gap-3 lg:flex'>
                {dataNav.map((item: Item) => (
                    <li
                        className={`group hover:text-text-hover relative cursor-pointer px-2 py-[10px] text-sm uppercase transition-all duration-200 ease-in ${
                            isActiveNav === item.type ? 'text-text-hover' : 'text-text-des'
                        }`}
                        key={item.name}
                        onClick={() => handleClickNavItem(item)}
                    >
                        {item.name}

                        {item.type === 'rooms' && (
                            <MdKeyboardArrowDown
                                className='absolute top-[25%] right-[-12px]'
                                size={20}
                            />
                        )}

                        {item.type === 'rooms' && (
                            <SubNav
                                data={dataSubNav}
                                onClick={(i) => handleClickSubNavItem(i as Item)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeftHeader;
