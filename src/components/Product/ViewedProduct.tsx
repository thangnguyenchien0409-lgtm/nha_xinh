import ProductItem from '@/components/Product/ProductItem';
import { useAppSelector } from '@/hooks/reduxHook';

type ViewedProductType = {
    onClick: (item: any) => void;
};

function ViewedProduct({ onClick }: ViewedProductType) {
    const reviewedProduct = useAppSelector((state) => state.product.viewedProduct) || [];
    return (
        reviewedProduct.length > 0 && (
            <div>
                <div className='text-text-des mt-[50px] mb-[50px] flex w-full items-center gap-7 border-b border-solid border-[#ececec] py-3'>
                    <h2 className='text-[18px] font-semibold uppercase'>Sản phẩm vừa xem</h2>
                </div>
                <div className='grid grid-cols-1 place-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {reviewedProduct.map((item: any) => (
                        <div key={item._id} className='w-full lg:px-4'>
                            <ProductItem
                                id={item._id}
                                slug={item.slug}
                                imageCover={item.imageCover}
                                image={item.images[0]}
                                title={item.title}
                                price={item.price}
                                onClick={() => onClick(item)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}

export default ViewedProduct;
