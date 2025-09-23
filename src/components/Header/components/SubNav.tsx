import type { SubNavType } from '@/components/Header/data';
import { useAppSelector } from '@/hooks/reduxHook';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type SubNavPropType = {
    data: SubNavType[];
    position?: string;
    setTop?: string;
    setWidth?: string;
    onClick?: (item: SubNavType) => void;
    isAdmin?: boolean;
};

function SubNav({
    data,
    position = 'left',
    setTop = '105%',
    setWidth = '300px',
    onClick,
    isAdmin = false
}: SubNavPropType) {
    const { user, isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/admin');
    };

    return (
        <div
            className={classNames(
                'pointer-events-none absolute z-10 translate-y-2 scale-95 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100',
                {
                    'right-0': position === 'right',
                    'left-0': position === 'left'
                }
            )}
            style={{ top: setTop }}
        >
            <div
                className={classNames('absolute top-[-10px] z-510 h-[40px] bg-transparent', {
                    'right-0': position === 'right',
                    'left-0': position === 'left'
                })}
                style={{ width: setWidth }}
            ></div>

            <div
                className={classNames('shadow-box absolute h-[40px] w-[40px] rotate-45 bg-white', {
                    'right-[17px]': position === 'right',
                    'left-[17px]': position === 'left'
                })}
            ></div>

            <ul
                className={classNames('absolute bg-white px-4 shadow-md', {
                    'right-0': position === 'right',
                    'left-0': position === 'left'
                })}
                style={{ width: setWidth }}
            >
                {isAuth && user?.role === 'admin' && isAdmin && (
                    <li
                        onClick={handleNavigate}
                        className='hover:text-text-hover text-text-des cursor-pointer border-b border-solid border-[#e1e1e1] bg-white px-4 py-5 transition-all last:border-none'
                    >
                        Admin
                    </li>
                )}
                {data.map((item) => (
                    <li
                        key={item.name}
                        className='hover:text-text-hover text-text-des w-full cursor-pointer border-b border-solid border-[#e1e1e1] bg-white px-4 py-5 transition-all last:border-none'
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.(item);
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubNav;
