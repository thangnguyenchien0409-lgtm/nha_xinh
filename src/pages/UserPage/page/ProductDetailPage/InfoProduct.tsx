import { AiOutlinePlus } from 'react-icons/ai';
import { FiMinus } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

import { useContext, useEffect, useState } from 'react';

import Check from '@assets/img/check.png';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { ModalContext } from '@/context/ModalContext';
// import { fetchAddtoCart } from '@/redux/cartSlice';
import { toast } from 'react-toastify';
import {
    dataGuarantee,
    dataTitle,
    dataTransport
} from '@/pages/UserPage/page/ProductDetailPage/data';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

function InfoProduct({ data }: { data: any }) {
    const [type, setType] = useState<string>('describe');
    const [quantityToCart, setQuantityTocart] = useState(1);
    const [errorQuantity, setErrorQuantity] = useState('');

    const dataGuaranteeValid = dataGuarantee.filter((item) => item.textValid);
    const dataGuaranteeInValid = dataGuarantee.filter((item) => item.textInvalid);

    // const { handleToggleAuthForm, handleToggleModalProduct, setTypeActionProduct } =
    //     useContext(ModalContext)!;

    // const isAuth = useAppSelector((state) => state.auth.isAuth);
    // const dispatch = useAppDispatch();

    const handleClickTitle = (type: string) => {
        setType(type);
    };

    const handleIncreaseQuantity = () => {
        if (quantityToCart + 1 > data.quantity) {
            setErrorQuantity('Đã vượt quá số lượng trong kho!');
        } else {
            setQuantityTocart((prev) => prev + 1);
            setErrorQuantity('');
        }
    };
    const handleDecreaseQuantity = () => {
        if (quantityToCart - 1 <= 0) {
            setQuantityTocart(1);
        } else {
            setQuantityTocart((prev) => prev - 1);
        }
        setErrorQuantity('');
    };

    // const handleAddToCart = () => {
    //     if (isAuth) {
    //         if (data.quantity > 0) {
    //             dispatch(fetchAddtoCart({ productId: data._id, quantity: quantityToCart }));
    //             toast.success(`Đã thêm sản phẩm ${data.title} vào giỏ hàng`);
    //             setTypeActionProduct('cart');
    //             handleToggleModalProduct();
    //         } else {
    //             toast.warning('Sản phẩm hiện đã hết hàng');
    //         }
    //     } else {
    //         toast.warning('Vui lòng đăng nhập!');
    //         handleToggleAuthForm();
    //     }
    // };

    return (
        <div className='flex-1'>
            <p className='text-[30px] font-semibold'>{data.title}</p>
            <div className='my-6 h-[4px] w-[40px] bg-gray-200'></div>
            <FaRegHeart size={20} className='cursor-pointer' />
            <div className='my-6 flex flex-col gap-4'>
                {data.collections !== '' && (
                    <div className='flex items-center gap-4'>
                        <p className='min-w-[100px] text-[18px] font-semibold'>Collection</p>
                        <div className='border border-solid border-[#e1e1e1] px-2 py-1'>
                            {data.collections}
                        </div>
                    </div>
                )}
                <div className='flex items-center gap-4'>
                    <p className='min-w-[100px] text-[18px] font-semibold'>Danh mục</p>
                    <div className='border border-solid border-[#e1e1e1] px-2 py-1'>
                        {data.category.name}
                        <span className='mx-2 text-[20px]'>-</span>
                        {data.brand.name}
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='min-w-[100px] text-[18px] font-semibold'>Vật liệu</p>
                    <div className='border border-solid border-[#e1e1e1] px-2 py-1'>
                        {data.material}
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='min-w-[100px] text-[18px] font-semibold'>Kích thước</p>
                    <div className='border border-solid border-[#e1e1e1] px-2 py-1'>
                        {data.size}
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='min-w-[100px] text-[18px] font-semibold'>Giá</p>
                    <div className=''>
                        {useFormatNumber(data.price)} <span className='underline'>đ</span>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='min-w-[100px] text-[18px] font-semibold'>Số lượng trong kho</p>
                    <div className=''>{data.quantity}</div>
                </div>

                <div className='flex h-[24px] items-center text-[20px]'>
                    <div
                        onClick={handleDecreaseQuantity}
                        className='h-full cursor-pointer border border-solid border-[#e1e1e1] px-1'
                    >
                        <FiMinus size={16} className='h-full' />
                    </div>

                    <div className='h-full border border-solid border-[#e1e1e1] px-2'>
                        {quantityToCart}
                    </div>

                    <div
                        onClick={handleIncreaseQuantity}
                        className='h-full cursor-pointer border border-solid border-[#e1e1e1] px-1'
                    >
                        <AiOutlinePlus size={16} className='h-full' />
                    </div>
                </div>

                <p className='text-red-400'>{errorQuantity} </p>

                <div className='flex gap-3'>
                    <div
                        // onClick={handleAddToCart}
                        className='border-text-des cursor-pointer border border-solid bg-black px-2 py-3 font-medium text-white uppercase hover:opacity-85'
                    >
                        Thêm vào giỏ hàng
                    </div>
                    <div className='border-text-des cursor-pointer border border-solid px-2 py-3 font-medium uppercase transition-all hover:bg-black hover:text-white'>
                        Mua ngay
                    </div>
                </div>
            </div>

            <div className='flex gap-5 border-b-[2px] border-solid border-[#ebebeb] py-3 text-[18px] font-semibold'>
                {dataTitle.map((item) => (
                    <div
                        onClick={() => handleClickTitle(item.type)}
                        className={`cursor-pointer ${type === item.type ? 'text-text-hover' : 'text-[#666666D9]'}`}
                        key={item.type}
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            <div className='mt-5 transition-all'>
                {type === 'guarantee' && (
                    <div className='flex flex-col gap-4'>
                        {dataGuaranteeValid.map((item, index) => (
                            <div key={index}>
                                <div className='flex'>
                                    <img
                                        className='h-[30px] w-[30px] object-cover'
                                        src={Check}
                                        alt=''
                                    />
                                    <p className='leading-7'>{item.textValid}</p>
                                </div>
                            </div>
                        ))}
                        <p className='font-bold'>
                            TUY NHIÊN NHÀ XINH KHÔNG BẢO HÀNH CHO CÁC TRƯỜNG HỢP SAU:
                        </p>
                        {dataGuaranteeInValid.map((item, index) => (
                            <div key={index}>
                                <div className='flex'>
                                    <img
                                        className='h-[30px] w-[30px] object-cover'
                                        src={Check}
                                        alt=''
                                    />
                                    <p className='leading-7'>{item.textInvalid}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {type === 'transport' && (
                    <div className='flex flex-col gap-4'>
                        <p className='font-semibold uppercase'>Giao hàng tận nơi</p>
                        {dataTransport.map((item, index) => (
                            <p key={index}>{item.text}</p>
                        ))}
                    </div>
                )}

                {type === 'describe' && <div>{data.description}</div>}
            </div>
        </div>
    );
}

export default InfoProduct;
