import type { DataProductPageType } from '@/pages/UserPage/page/ProductPage/data';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type SelectProduct = {
    data: DataProductPageType[];
    title: string;
    value: string;
    setValue: any;
};

type ItemType = {
    type: string;
    name: string | null;
};

function SelectProduct({ data, title, value, setValue }: SelectProduct) {
    const [active, setActive] = useState(false);

    const [isActiveItem, setIsActiveItem] = useState<string | null>(null);
    const handleActive = () => {
        setActive(!active);
    };

    const handleClickValueItem = (item: ItemType) => {
        setValue(item.type);
        setActive(false);
        setIsActiveItem(item.name);
    };

    useEffect(() => {
        if (value === '') {
            setIsActiveItem(null);
            setActive(false);
        }
    }, [value]);

    const content = isActiveItem ? isActiveItem : `Lọc theo: ${title}`;

    return (
        <div className='font-roboto relative z-1 w-full md:w-[264px]'>
            <p className='px-2 py-2'>{title}</p>
            <div
                onClick={handleActive}
                className={`text-text-des flex w-full items-center justify-between rounded-[4px] border-b border-solid border-[#ccc] px-2 py-2 text-sm outline-none ${
                    active ? 'shadow-select-product' : ''
                }`}
            >
                <p>{content}</p>
                <IoIosArrowDown
                    size={15}
                    className={`transition-all ${active ? 'rotate-180' : ''}`}
                />
            </div>

            {active && (
                <div className='shadow-select-product mt-3 w-full rounded-[4px] border border-solid border-red-200 bg-white px-4 py-4 text-sm'>
                    <ul>
                        {data.map((item) => (
                            <li
                                key={item.type}
                                className={`cursor-pointer py-3 transition-all hover:text-red-400 ${
                                    isActiveItem === item.name ? 'text-red-400' : 'text-text-des'
                                }`}
                                onClick={() => handleClickValueItem(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SelectProduct;
