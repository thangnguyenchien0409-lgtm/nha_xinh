import Logo from '@/assets/img/logo-NX-web.png';
import { dataSideBarAdmin } from '@/components/SideBar/data';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function SideBarAdmin() {
    const [isActive, setIsActive] = useState<string | null>(null);
    const [isOpenSub, setIsOpenSub] = useState<string | null>(null);
    const [activeSub, setActiveSub] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleClickSideBarItem = (name: string, path: string) => {
        setIsActive(name);
        setActiveSub(null);
        setIsOpenSub(null);
        navigate(`/admin${path}`);
    };

    const handleClickDownIcon = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpenSub((prev) => (prev === name ? null : name));
        setIsActive(name);
    };

    const handleClickSubItem = (subName: string, path: string) => {
        setActiveSub(subName);
        navigate(`/admin${path}`);
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 w-[230px] border-r border-solid border-[#e1e1e1] p-[20px]'>
            {/* Logo */}
            <div>
                <img src={Logo} alt='Logo' className='cursor-pointer' />
            </div>

            <div className='mt-9 font-medium'>
                {dataSideBarAdmin.map((item) => (
                    <div
                        key={item.path}
                        className={`my-5 rounded-[4px] ${
                            isActive === item.name ? 'shadow-box' : 'text-[#333] transition-all'
                        }`}
                    >
                        <div
                            onClick={() => handleClickSideBarItem(item.name, item.path)}
                            className='flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-2 py-2 transition-all'
                        >
                            <div className='flex items-center gap-4'>
                                <item.icon size={23} />
                                <div>{item.name}</div>
                            </div>
                            {item.subs && (
                                <IoIosArrowDown
                                    onClick={(e) => handleClickDownIcon(item.name, e)}
                                    className={`transition-transform duration-200 ${
                                        isOpenSub === item.name ? 'rotate-180' : ''
                                    }`}
                                />
                            )}
                        </div>

                        {/* Subs */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                isOpenSub === item.name ? 'max-h-40' : 'max-h-0'
                            }`}
                        >
                            {item.subs?.map((sub) => (
                                <div
                                    key={sub.path}
                                    onClick={() => handleClickSubItem(sub.name, sub.path)}
                                    className={`ml-9 cursor-pointer rounded px-2 py-3 text-[14px] transition-all hover:underline ${
                                        activeSub === sub.name
                                            ? 'font-semibold underline'
                                            : 'text-[#555]'
                                    }`}
                                >
                                    {sub.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBarAdmin;
