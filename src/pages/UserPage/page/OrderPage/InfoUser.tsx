import { dataPayment } from '@/pages/UserPage/page/OrderPage/data';
import InputOrder from '@/pages/UserPage/page/OrderPage/InputOrder';
import type { OrderFormValues } from '@/pages/UserPage/page/OrderPage/validate';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type InfoUserType = {
    selectPayment: any;
    setSelectPayment: any;
};

const InfoUser = ({ selectPayment, setSelectPayment }: InfoUserType) => {
    const [provinces, setProvinces] = useState<any[]>([]);

    const {
        register,
        formState: { errors }
    } = useFormContext<OrderFormValues>();

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const data = await fetch('https://api.vnappmob.com/api/v2/province/').then((res) =>
                    res.json()
                );
                localStorage.setItem('province', JSON.stringify(data.results));
                setProvinces(data.results);
            } catch (err) {
                console.error('Fetch provinces error:', err);
            }
        };

        const saved = localStorage.getItem('province');
        if (saved) {
            setProvinces(JSON.parse(saved));
        } else {
            fetchProvince();
        }
    }, []);

    return (
        <div className='w-full md:w-[45%] lg:w-[55%]'>
            <p className='font-monterrat text-text-title text-[20px] font-semibold uppercase'>
                Địa chỉ giao hàng
            </p>

            {/* fullName */}
            <InputOrder
                name='fullName'
                label='Họ và tên'
                placeholder='Nhập họ và tên'
                register={register('fullName')}
                error={errors.fullName}
            />

            {/* phone + postalCode */}
            <div className='mb-4 flex w-full gap-5'>
                <InputOrder
                    name='shippingAddress.phone'
                    label='Số điện thoại'
                    placeholder='Nhập SĐT'
                    register={register('shippingAddress.phone')}
                    error={errors.shippingAddress?.phone}
                />

                <InputOrder
                    name='shippingAddress.postalCode'
                    label='Mã bưu điện'
                    placeholder='Nhập mã bưu điện'
                    register={register('shippingAddress.postalCode')}
                    error={errors.shippingAddress?.postalCode}
                    require={false}
                />
            </div>

            {/* city */}
            <div className='mt-6 mb-4'>
                <label className='my-2 block text-[14px]'>
                    Tỉnh / Thành phố <span className='text-red-400'>*</span>
                </label>
                <select
                    className={`w-full border border-solid px-3 py-3 shadow-md outline-none ${
                        errors.shippingAddress?.city ? 'border-red-400' : 'border-[#ddd]'
                    }`}
                    {...register('shippingAddress.city')}
                >
                    <option value=''>Chọn tỉnh / Thành phố </option>
                    {provinces.map((item) => (
                        <option key={item.province_id} value={item.province_name}>
                            {item.province_name}
                        </option>
                    ))}
                </select>
                {errors.shippingAddress?.city && (
                    <p className='text-sm text-red-500'>{errors.shippingAddress.city.message}</p>
                )}
            </div>

            {/* details */}
            <InputOrder
                name='shippingAddress.details'
                label='Địa chỉ cụ thể'
                placeholder='Nhập địa chỉ cụ thể'
                register={register('shippingAddress.details')}
                error={errors.shippingAddress?.details}
            />

            {/* note */}
            <div className='mt-6'>
                <p className='font-monterrat text-text-title text-[20px] font-semibold uppercase'>
                    Thông tin thêm
                </p>
                <label className='text-text-title my-2 block font-semibold'>
                    Lưu ý cho đơn hàng
                </label>
                <textarea
                    className='h-[100px] w-full border border-solid border-[#ddd] p-4 shadow-md outline-none'
                    {...register('note')}
                />
            </div>

            {/* payment */}
            <div className='mt-6'>
                <p className='font-monterrat text-text-title text-[20px] font-semibold uppercase'>
                    Phương thức thanh toán
                </p>
                <div className='mt-4 flex gap-4'>
                    {dataPayment.map((item) => (
                        <div
                            key={item.type}
                            onClick={() => setSelectPayment(item.type)}
                            className={`flex flex-1 cursor-pointer flex-col items-center justify-center border border-solid p-6 ${
                                selectPayment === item.type ? 'border-text-title' : 'border-[#ddd]'
                            }`}
                        >
                            <item.icon size={50} />
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoUser;
