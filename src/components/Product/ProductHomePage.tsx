import { useContext, useEffect } from 'react';

import { MdNavigateNext } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '@/context/ActiveContext';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    addViewedProduct,
    fetchGetAllProduct,
    getNewProduct
} from '@/redux/productSlice/productSlice';
import ProductItem from '@/components/Product/ProductItem';
import MainLayout from '@/components/Layout/MainLayout';
import ViewedProduct from '@/components/Product/ViewedProduct';

function ProductHomePage() {
    const { setIsActiveNav } = useContext(ActiveContext)!;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.product.product);

    let newProduct = useAppSelector((state) => state.product.newProduct);
    let viewedProduct = useAppSelector((state) => state.product.viewedProduct);

    const handleClickProductItem = (item: any) => {
        dispatch(addViewedProduct(item));
    };

    const handleNavigateToProduct = () => {
        navigate('/products-page');
        setIsActiveNav('products');
    };

    useEffect(() => {
        if (!product || product.length === 0) {
            dispatch(fetchGetAllProduct());
        }
    }, [dispatch, product]);

    useEffect(() => {
        if (product.length > 0) {
            dispatch(getNewProduct());
        }
    }, [dispatch, product]);

    // if (newProduct.length === 0) {
    //     return <Loading />;
    // }
    return (
        <MainLayout>
            <div className='text-text-des mt-[50px] mb-[50px] flex w-full items-center gap-7 border-b border-solid border-[#ececec] py-3'>
                <h2 className='text-[18px] font-semibold uppercase'>Sản phẩm mới</h2>
                <div className='flex items-center justify-center'>
                    <p onClick={handleNavigateToProduct} className='cursor-pointer text-sm'>
                        xem tất cả
                    </p>
                    <MdNavigateNext size={20} className='relative top-[2px] cursor-pointer' />
                </div>
            </div>

            <div className='grid w-full grid-cols-2 place-items-center gap-3 lg:grid-cols-3 lg:gap-0 xl:grid-cols-4'>
                {newProduct.map((item: any) => (
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
            <ViewedProduct onClick={(item) => handleClickProductItem(item)} />
        </MainLayout>
    );
}

export default ProductHomePage;
