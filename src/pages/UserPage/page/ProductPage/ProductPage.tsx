import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    addViewedProduct,
    fetchGetAllProduct,
    fetchGetAllProductNoLimit,
    resetSearchProduct,
    searchProductBySubCategoryId
} from '@/redux/productSlice/productSlice';

import BannerRoom from '@/components/Banner/BannerHomePage/BannerRoom/BannerRoom';
import Footer from '@/components/Footer/Footer';
import BannerProductPage from '@/components/Banner/BannerProductPage/BannerProductPage';
import MainLayout from '@/components/Layout/MainLayout';
import { dataImgProduct } from '@/pages/UserPage/page/ProductPage/data';
import ViewedProduct from '@/components/Product/ViewedProduct';
import ProductItem from '@/components/Product/ProductItem';
import Pagination from '@/components/Pagination/Pagination';
import { getProductFilter, getProductSearch } from '@/redux/productSlice/productSelector';
import FilterProduct from '@/pages/UserPage/page/ProductPage/FilterProduct';
import { ActiveContext } from '@/context/ActiveContext';
import Loading from '@/components/Loading/Loading';

function ProductPage() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(useAppSelector((state) => state.product.page));
    const totalPage = useAppSelector((state) => state.product.totalPage);

    const dispatch = useAppDispatch();

    const { currentSubCate } = useContext(ActiveContext)!;

    const product = currentSubCate
        ? useAppSelector(getProductSearch)
        : useAppSelector(getProductFilter);

    const handleClickProductItem = (item: any) => {
        dispatch(addViewedProduct(item));
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
        const fetchData = async () => {
            setLoading(true);

            try {
                if (currentSubCate) {
                    dispatch(searchProductBySubCategoryId(currentSubCate._id));
                    await dispatch(fetchGetAllProductNoLimit());
                } else {
                    await dispatch(fetchGetAllProduct({ page, limit: 16 }));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            dispatch(resetSearchProduct());
        };
    }, [dispatch, page, currentSubCate]);

    useEffect(() => {
        if (currentSubCate) {
            window.scrollTo({
                top: 500,
                behavior: 'smooth'
            });
        }
    }, [currentSubCate]);

    useEffect(() => {}, [page]);

    return (
        <div className='font-monterrat mt-[123px] w-full md:mt-[80px]'>
            <BannerProductPage />
            <MainLayout>
                {/* Bộ lọc */}
                <FilterProduct />

                {/* Danh sách sản phẩm */}
                {loading ? (
                    <Loading />
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
                                    ratingsAverage={item.ratingsAverage}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='mx-auto mt-9 flex h-[100px] w-full items-center justify-center text-xl font-medium'>
                        <p>Không tìm thấy dữ liệu</p>
                    </div>
                )}
                {product.length > 0 && totalPage > 0 && currentSubCate === null && (
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
