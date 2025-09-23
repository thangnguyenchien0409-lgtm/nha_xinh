import { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { ModalContext } from '@/context/ModalContext';
import { fetchGetAllCategory } from '@/redux/categorySlice/categorySlice';
import { dataRoom, dataSideBar } from '@/components/SideBar/data';
import { fetchGetAllSubCateGory } from '@/redux/subCategorySlice/subCategorySlice';
import { fetchGetAllRoom } from '@/redux/roomSlice/roomSlice';
import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '@/context/ActiveContext';

function SideBar() {
    const [openCateId, setOpenCateId] = useState(null);
    const [openSubSideBar, setOpenSubSideBar] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const category: any[] = useAppSelector((state) => state.category.category);
    const subCategory: any[] = useAppSelector((state) => state.subCategory.subCategory);
    const rooms: any[] = useAppSelector((state) => state.room.room);

    const { isOpenSideBar, handleToggleSideBar } = useContext(ModalContext)!;
    const { setIsActiveNav, setCurrentSubCate, setRoom } = useContext(ActiveContext)!;

    useEffect(() => {
        dispatch(fetchGetAllCategory({ page: 1, limit: 1000 }));
        dispatch(fetchGetAllSubCateGory());
        dispatch(fetchGetAllRoom());
    }, [dispatch]);

    const handleToggleSubCate = (cateId: any) => {
        setOpenCateId((prev) => (prev === cateId ? null : cateId));
    };

    const handleToggleSubSideBar = () => {
        setOpenSubSideBar((prev) => !prev);
    };

    const handleClickSideBarItem = (item: any) => {
        setCurrentSubCate(item);
        navigate('/products-page');
        handleToggleSideBar();
        setIsActiveNav('products');
    };

    const handleClickNavItem = (item: any) => {
        setIsActiveNav(item.type);
        navigate(item.path);
        handleToggleSideBar();
    };

    const handleClickSubRoomItem = (i: any) => {
        setRoom(i);
        setIsActiveNav('rooms');
        navigate(i.path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        handleToggleSideBar();
    };

    return (
        <AnimatePresence>
            {isOpenSideBar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='fixed inset-0 z-2000 bg-[rgba(0,0,0,0.5)]'
                    onClick={handleToggleSideBar}
                >
                    <IoCloseSharp
                        size={28}
                        onClick={handleToggleSideBar}
                        className='absolute top-[10px] left-[90%] z-200 cursor-pointer text-black opacity-70 sm:top-[20px] sm:left-[410px] sm:text-white'
                    />

                    <motion.div
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className='absolute top-0 bottom-0 left-0 w-full overflow-y-auto bg-white py-[70px] shadow-lg sm:w-[400px] sm:py-[30px]'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Categories */}
                        {category.map((cate) => {
                            const subs = subCategory.filter((sub) => sub.category === cate._id);
                            const isOpen = openCateId === cate._id;

                            return (
                                <div
                                    key={cate._id}
                                    className='flex w-full flex-col border-b border-solid border-[#ececec] last:border-b-0'
                                >
                                    <div
                                        className='flex cursor-pointer items-center justify-between py-[10px] pr-[30px] pl-[20px]'
                                        onClick={() => handleToggleSubCate(cate._id)}
                                    >
                                        <div className='py-[6px] text-[20px] text-[#0A0A0B] sm:text-[18px]'>
                                            {cate.name}
                                        </div>
                                        <IoIosArrowDown
                                            size={25}
                                            className={`text-[#838386] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className='mt-[10px] pb-[10px] pl-[30px]'
                                            >
                                                {subs.map((sub) => (
                                                    <div
                                                        onClick={() => handleClickSideBarItem(sub)}
                                                        key={sub._id}
                                                        className='cursor-pointer py-[10px] text-[18px] text-[#0a0a0b] hover:text-black sm:text-[16px]'
                                                    >
                                                        {sub.name}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}

                        {/* Sub SideBar */}
                        {dataSideBar.map((item, index) => {
                            const isOpenRoom = openSubSideBar && item.type === 'rooms';

                            return (
                                <div
                                    key={index}
                                    className='flex w-full flex-col border-b border-solid border-[#ececec] last:border-b-0 lg:hidden'
                                >
                                    <div
                                        className='flex cursor-pointer items-center justify-between py-[10px] pr-[30px] pl-[20px]'
                                        onClick={() => {
                                            if (item.type === 'rooms') handleToggleSubSideBar();
                                        }}
                                    >
                                        <div
                                            onClick={() => handleClickNavItem(item)}
                                            className='py-[6px] text-[20px] text-[#0A0A0B] sm:text-[18px]'
                                        >
                                            {item.name}
                                        </div>
                                        {item.type === 'rooms' && (
                                            <IoIosArrowDown
                                                size={25}
                                                className={`text-[#838386] transition-transform ${isOpenRoom ? 'rotate-180' : ''}`}
                                            />
                                        )}
                                    </div>

                                    {/* Rooms List */}
                                    <AnimatePresence>
                                        {isOpenRoom && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className='pb-[10px] pl-[30px]'
                                            >
                                                {dataRoom.map((room) => (
                                                    <div
                                                        onClick={() => handleClickSubRoomItem(room)}
                                                        key={room.type}
                                                        className='cursor-pointer py-[10px] text-[18px] text-[#0a0a0b] hover:text-black sm:text-[16px]'
                                                    >
                                                        {room.name}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SideBar;
