import { useContext, useEffect, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ActiveContext } from '@/context/ActiveContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import debounce from 'lodash.debounce';
import {
    fetchGetAllProductNoLimit,
    fetchProductById,
    searchProductByText
} from '@/redux/productSlice/productSlice';
import { getProductSearch } from '@/redux/productSlice/productSelector';

function InputSearch() {
    const [value, setValue] = useState<string>('');

    const { setIsActiveNav } = useContext(ActiveContext)!;

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const productList = useAppSelector(getProductSearch);

    const handleSearch = (text: string) => {
        if (text.trim() !== '') {
            dispatch(searchProductByText(text));
        }
    };

    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    const handleChangeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setValue(text);
        debouncedSearch(text);
    };

    const handleClearValue = () => {
        setValue('');
    };

    const handleNavigateDetailProduct = (slug: string, id: string) => {
        console.log('Thành công');

        navigate(`/${slug}/${id}`);
        dispatch(fetchProductById(id));
        setIsActiveNav(null);
        setValue('');
    };

    useEffect(() => {
        if (value !== '') {
            dispatch(fetchGetAllProductNoLimit());
        }
    }, [dispatch, value]);

    return (
        <div className='relative mx-auto w-[95%] bg-white text-sm md:w-[250px]'>
            <div className='flex w-full items-center justify-between rounded-full border border-solid border-[#ccc] px-3 py-2 md:py-1'>
                <input
                    value={value}
                    onChange={(e) => handleChangeValueInput(e)}
                    className='text-text-des w-full bg-white text-[12px] font-medium outline-none'
                    type='text'
                    placeholder='Tìm sản phẩm'
                />

                {value === '' ? (
                    <IoIosSearch size={25} className='cursor-pointer' />
                ) : (
                    <IoMdClose size={25} className='cursor-pointer' onClick={handleClearValue} />
                )}
            </div>
            {value !== '' && (
                <div className='shadow-box absolute top-[56px] max-h-[583px] w-full overflow-y-auto bg-white'>
                    {productList.length > 0 ? (
                        productList.map((item) => (
                            <div
                                onClick={() => handleNavigateDetailProduct(item.slug, item._id)}
                                key={item._id}
                                className='flex cursor-pointer items-center justify-between gap-2 overflow-hidden border-b border-solid border-[#ebebeb] px-2 py-2 last:border-transparent hover:bg-gray-100'
                            >
                                <img
                                    className='h-[50px] w-[60px] object-cover'
                                    src={item.imageCover}
                                    alt={item.title}
                                />
                                <p className='truncate overflow-hidden'>{item.title}</p>
                            </div>
                        ))
                    ) : (
                        <div className='text-text-des h-full w-full py-5 text-center text-[16px] font-medium'>
                            Không tìm thấy dữ liệu...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default InputSearch;
