import { useAppDispatch } from '@/hooks/reduxHook';
import { dataMaterial, dataSelectProduct } from '@/pages/UserPage/page/ProductPage/data';
import SelectProduct from '@/pages/UserPage/page/ProductPage/SelectProduct';
import { filterProductByMaterial, filterSelectProduct } from '@/redux/productSlice/productSlice';
import { useState } from 'react';

type FilterType = {
    category: string | null;
    material: string | null;
};

function FilterProduct() {
    const [filters, setFilters] = useState<FilterType>({ category: '', material: '' });

    const dispatch = useAppDispatch();

    const handleClearSelect = () => {
        setFilters((prev) => ({
            category: prev.category === '' ? null : '',
            material: prev.material === '' ? null : ''
        }));
        dispatch(filterSelectProduct(''));
        dispatch(filterProductByMaterial(''));
    };

    const handleApplyFilter = () => {
        dispatch(filterSelectProduct(filters.category));
        dispatch(filterProductByMaterial(filters.material));
    };

    return (
        <div className='mt-[50px] grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-50 lg:mt-0 lg:h-[97px]'>
            <SelectProduct
                value={filters.category as string}
                setValue={(val: string) => setFilters((prev) => ({ ...prev, category: val }))}
                data={dataSelectProduct}
                title={'Sản phẩm'}
            />
            <SelectProduct
                value={filters.material as string}
                setValue={(val: string) => setFilters((prev) => ({ ...prev, material: val }))}
                data={dataMaterial}
                title={'Chất liệu'}
            />
            <div className='flex max-h-[97px] items-center gap-2 text-sm md:w-[120px] md:flex-col lg:w-full lg:flex-row lg:text-[16px]'>
                <div
                    onClick={handleApplyFilter}
                    className='w-full cursor-pointer bg-black px-3 py-2 text-center font-medium text-white uppercase transition-all hover:opacity-80 lg:w-[50%]'
                >
                    Áp dụng
                </div>
                <div
                    onClick={handleClearSelect}
                    className='w-full cursor-pointer bg-black px-3 py-2 text-center font-medium text-white uppercase transition-all hover:opacity-80 lg:w-[50%]'
                >
                    Xóa bộ lọc
                </div>
            </div>
        </div>
    );
}

export default FilterProduct;
