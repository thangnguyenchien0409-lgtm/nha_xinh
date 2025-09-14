import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    addViewedProduct,
    fetchGetAllProduct,
    filterProductByMaterial,
    filterSelectProduct
} from '@/redux/productSlice/productSlice';

import BannerRoom from '@/components/Banner/BannerHomePage/BannerRoom/BannerRoom';
import Footer from '@/components/Footer/Footer';
import BannerProductPage from '@/components/Banner/BannerProductPage/BannerProductPage';
import MainLayout from '@/components/Layout/MainLayout';
import {
    dataImgProduct,
    dataMaterial,
    dataSelectProduct
} from '@/pages/UserPage/page/ProductPage/data';
import ViewedProduct from '@/components/Product/ViewedProduct';
import ProductItem from '@/components/Product/ProductItem';
import Pagination from '@/components/Pagination/Pagination';
import SelectProduct from '@/pages/UserPage/page/ProductPage/SelectProduct';
import { getProductFilter } from '@/redux/productSlice/productSelector';

type FilterType = {
    category: string | null;
    material: string | null;
};

function ProductPage() {
    const [filters, setFilters] = useState<FilterType>({ category: '', material: '' });

    const [page, setPage] = useState(useAppSelector((state) => state.product.page));
    const totalPage = useAppSelector((state) => state.product.totalPage);

    const product = useAppSelector(getProductFilter);
    console.log(product);

    const status = useAppSelector((state) => state.product.status);

    const dispatch = useAppDispatch();

    const handleClearSelect = () => {
        setFilters((prev) => ({
            category: prev.category === '' ? null : '',
            material: prev.material === '' ? null : ''
        }));
        dispatch(filterSelectProduct(''));
        dispatch(filterProductByMaterial(''));
    };

    const handleClickProductItem = (item: any) => {
        dispatch(addViewedProduct(item));
    };

    const handleApplyFilter = () => {
        dispatch(filterSelectProduct(filters.category));
        dispatch(filterProductByMaterial(filters.material));
    };

    const handleChangePage = (page: number) => {
        setPage(page);
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    };

    const handleNextPage = () => {
        setPage((page: number) => page + 1);
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    };

    const handlePrevPage = () => {
        setPage((page: number) => page - 1);
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        dispatch(fetchGetAllProduct({ page: page, limit: 16 }));
    }, [dispatch, page]);

    useEffect(() => {}, [page]);

    return (
        <div className='font-monterrat mt-[123px] w-full md:mt-[80px]'>
            <BannerProductPage />
            <MainLayout>
                {/* Bộ lọc */}
                <div className='mt-[50px] grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-50 lg:mt-0 lg:h-[97px]'>
                    <SelectProduct
                        value={filters.category as string}
                        setValue={(val: string) =>
                            setFilters((prev) => ({ ...prev, category: val }))
                        }
                        data={dataSelectProduct}
                        title={'Sản phẩm'}
                    />
                    <SelectProduct
                        value={filters.material as string}
                        setValue={(val: string) =>
                            setFilters((prev) => ({ ...prev, material: val }))
                        }
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

                {/* Danh sách sản phẩm */}
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : product.length > 0 ? (
                    <div className='mt-9 grid w-full grid-cols-2 place-items-center gap-5 lg:grid-cols-3 xl:grid-cols-4'>
                        {product.map((item: any) => (
                            <div key={item._id} className='w-full lg:px-4'>
                                <ProductItem
                                    id={item._id}
                                    slug={item.slug}
                                    imageCover={item.imageCover}
                                    image={item.images[0]}
                                    title={item.title}
                                    price={item.price}
                                    onClick={() => handleClickProductItem(item)}
                                    quantity={item.quantity}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='mx-auto mt-9 flex h-[100px] w-full items-center justify-center text-xl font-medium'>
                        <p>Không tìm thấy dữ liệu</p>
                    </div>
                )}
                {product.length > 0 && totalPage > 0 && (
                    <Pagination
                        totalPage={totalPage}
                        currentPage={page}
                        onPageChange={handleChangePage}
                        nextPage={handleNextPage}
                        prevPage={handlePrevPage}
                    />
                )}
                <ViewedProduct onClick={(item) => handleClickProductItem(item)} />
            </MainLayout>
            <BannerRoom isBgWhite={true} data={dataImgProduct} />
            <Footer />
        </div>
    );
}

export default ProductPage;
