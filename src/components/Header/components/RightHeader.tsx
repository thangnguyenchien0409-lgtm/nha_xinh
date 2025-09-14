import { FaUser } from 'react-icons/fa';
import type { IconType } from 'react-icons';

import { dataIcon, dataSubUser, type SubNavType } from '@/components/Header/data';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import SubNav from '@/components/Header/components/SubNav';
import { logOut } from '@/redux/authSlice';
import InputSearch from '@/components/Header/components/InputSearch';

type Icon = {
    name: IconType;
    size: number;
    type: string;
    path?: string;
};

function RightHeader() {
    const { handleToggleAuthForm, setTypeActionProduct, handleToggleModalProduct } =
        useContext(ModalContext)!;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const user = useAppSelector((state) => state.auth.user);

    const handleClickItem = (item: SubNavType | Icon) => {
        setTypeActionProduct(item.type!);

        if (item.type === 'logout') {
            dispatch(logOut());
        } else if (item.type === 'cart' || item.type === 'wishlist') {
            handleToggleModalProduct();
        }
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className='text-text-des flex items-center justify-center gap-3'>
            <div className='hidden md:block'>
                <InputSearch />
            </div>
            {dataIcon.map((icon: Icon) => (
                <div key={icon.type} className='hover:text-text-hover relative transition-all'>
                    <icon.name
                        onClick={() => handleClickItem(icon)}
                        size={icon.size}
                        className={`cursor-pointer ${
                            icon.type === 'cart' ? 'block sm:block' : 'hidden sm:block'
                        }`}
                    />
                    {/* {cart.length > 0 && icon.type === 'cart' && (
                        <div className='absolute top-[-8px] right-[-10px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black text-center text-[12px] font-semibold text-white'>
                            <p>{quantityCart}</p>
                        </div>
                    )} */}
                </div>
            ))}

            <div
                onClick={() => {
                    if (!isAuth) {
                        handleToggleAuthForm();
                    }
                }}
                className='group hover:text-text-hover relative flex cursor-pointer items-center justify-center gap-1 transition-all'
            >
                <p>
                    {isAuth
                        ? user?.name || (
                              <img
                                  src={user?.photoURL}
                                  className='h-[30px] w-[30px] rounded-full'
                                  alt=''
                              />
                          )
                        : 'Đăng nhập'}
                </p>
                <FaUser />
                {isAuth && (
                    <SubNav
                        data={dataSubUser}
                        position='right'
                        setTop='140%'
                        setWidth='200px'
                        onClick={(item) => handleClickItem(item)}
                        isAdmin={true}
                    />
                )}
            </div>
        </div>
    );
}

export default RightHeader;
