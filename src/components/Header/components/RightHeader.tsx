import { FaUser } from 'react-icons/fa';
import type { IconType } from 'react-icons';

import { dataIcon } from '@/components/Header/mockData';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { useNavigate } from 'react-router-dom';

type Icon = {
    name: IconType;
    size: number;
    type: string;
};

function RightHeader() {
    const { handleToggleAuthForm, setTypeActionProduct, handleToggleModalProduct } =
        useContext(ModalContext)!;

    const navigate = useNavigate();

    const handleClickItem = (type: string, path: string | null) => {
        setTypeActionProduct(type);
        if (type === 'logout') {
            // dispatch(logOut());
        } else if (type === 'cart' || type === 'wishlist') {
            handleToggleModalProduct();
        }
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className='text-text-des flex items-center justify-center gap-3'>
            {/* <div className='hidden md:block'>
                <InputSearch />
            </div> */}
            {dataIcon.map((icon: Icon) => (
                <div key={icon.type} className='hover:text-text-hover relative transition-all'>
                    <icon.name
                        onClick={() => handleClickItem(icon.type, null)}
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
                onClick={handleToggleAuthForm}
                className='group hover:text-text-hover relative flex cursor-pointer items-center justify-center gap-1 transition-all'
            >
                {/* <p>
                    {isAuth
                        ? user?.name || (
                              <img
                                  src={user?.photoURL}
                                  className='h-[30px] w-[30px] rounded-full'
                                  alt=''
                              />
                          )
                        : 'Đăng nhập'}
                </p> */}
                <FaUser />
                {/* {isAuth && (
                    <SubNav
                        data={dataSubUser}
                        position='right'
                        setTop='140%'
                        setWidth='200px'
                        onClick={(item) => handleClickItem(item.type, item.path)}
                        isAdmin={true}
                    />
                )} */}
            </div>
        </div>
    );
}

export default RightHeader;
