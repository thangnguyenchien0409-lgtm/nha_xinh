import { ActiveContext } from '@/context/ActiveContext';
import { ModalContext } from '@/context/ModalContext';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { fetchProductById } from '@/redux/productSlice/productSlice';
import { useContext } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type ProductItemType = {
    id: string;
    slug: string;
    imageCover: string;
    image: string;
    title: string;
    price: number;
    quantity?: number;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};

function ProductItem({
    id,
    slug,
    imageCover,
    image,
    title,
    price,
    onClick,
    quantity
}: ProductItemType) {
    // const { handleToggleAuthForm, handleToggleModalProduct, setTypeActionProduct } =
    //     useContext(ModalContext)!;

    const { setIsActiveNav } = useContext(ActiveContext)!;

    const dispatch = useAppDispatch();
    // const isAuth = useAppSelector((state) => state.auth.isAuth);

    const navigate = useNavigate();

    // const handleAddToCart = (id:ProductItemType) => {
    //     if (isAuth) {
    //         if (quantity > 0) {
    //             dispatch(fetchAddtoCart({ productId: id }));
    //             toast.success(`Đã thêm sản phẩm ${title} vào giỏ hàng`);
    //             setTypeActionProduct('cart');
    //             handleToggleModalProduct();
    //         } else {
    //             toast.warning('Sản phẩm đã hết hàng');
    //         }
    //     } else {
    //         toast.warning('Vui lòng đăng nhập!');
    //         handleToggleAuthForm();
    //     }
    // };

    const handleNavigateDetailProduct = (id: string) => {
        navigate(`/${slug}/${id}`);
        dispatch(fetchProductById(id));
        setIsActiveNav(null);
    };

    return (
        <div
            onClick={onClick}
            className='group w-full border border-solid border-[#ececec] p-4 transition-all hover:border-[#ececec] lg:w-[312px] lg:border-transparent'
        >
            <div
                onClick={() => handleNavigateDetailProduct(id)}
                className='relative aspect-square h-[150px] w-full cursor-pointer overflow-hidden sm:h-[175px]'
            >
                <img
                    src={imageCover}
                    alt={title}
                    className='absolute inset-0 h-full w-full bg-white object-contain object-center transition-opacity duration-700 group-hover:opacity-0'
                />
                <img
                    src={image}
                    alt={title}
                    className='absolute inset-0 h-full w-full bg-white object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100'
                />
            </div>

            <div className='flex w-full items-center justify-between gap-2'>
                <h3 className='text-text-des my-3 flex-1 truncate text-sm font-medium'>{title}</h3>
                <FaRegHeart size={20} className='cursor-pointer' />
            </div>
            <div className='flex justify-end text-sm font-normal text-[#111]'>
                <p>
                    {useFormatNumber(price)}
                    <span className='underline'>đ</span>
                </p>
            </div>
            <div className='mt-7 flex w-full flex-col items-center justify-between gap-2 text-[12px] transition-all group-hover:opacity-100 sm:text-sm md:flex-row lg:opacity-0'>
                <button
                    // onClick={() => handleAddToCart(id)}
                    className='border-text-des text-text-des hover:bg-text-des h-[40px] w-full cursor-pointer border-[2px] border-solid px-3 font-semibold transition-all hover:text-white md:w-[53%]'
                >
                    THÊM VÀO GIỎ
                </button>
                <button className='bg-text-des h-[40px] w-full cursor-pointer px-5 font-semibold text-white md:mt-0 md:flex-1'>
                    MUA NGAY
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
