import { useEffect, useMemo } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Upload, Input, InputNumber, Button, Modal, Select } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { normalizeUrl } from '@/utils/normalizeUrl';
import {
    fetchAddProduct,
    fetchDeleteProduct,
    fetchUpdateProduct
} from '@/redux/productSlice/productSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { categoryFilter } from '@/redux/categorySlice/categorySelector';
import { subCategoryFilter } from '@/redux/subCategorySlice/subCategorySelector';
import { roomFilter } from '@/redux/roomSlice/roomSelector';
import { fetchGetAllCategory } from '@/redux/categorySlice/categorySlice';
import { fetchGetAllRoom } from '@/redux/roomSlice/roomSlice';
import { fetchGetAllSubCateGory } from '@/redux/subCategorySlice/subCategorySlice';

// ==== Types ====
export interface ProductFormValues {
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number | null;
    category: string;
    subCategories: string[];
    brand: string;
    collections: string;
    material: string;
    size: string;
    imageCover: UploadFile[];
    images: UploadFile[][];
}

export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover?: string;
    images?: string[];
    category: { _id: string; name: string };
    subCategories: string[];
    brand: { _id: string; name: string };
    collections?: string;
    material: string;
    size: string;
}

interface CardProductProps {
    isOpenCard: boolean;
    handleToggleCard: () => void;
    typeAction: 'create' | 'update' | '';
    productData?: Product;
}

// ==== Validate form ====
const validateForm = yup.object().shape({
    title: yup.string().required('Vui lòng nhập tên sản phẩm'),
    slug: yup.string(),
    description: yup.string().required('Vui lòng nhập mô tả'),
    quantity: yup
        .number()
        .typeError('Số lượng phải là số')
        .required('Vui lòng nhập số lượng')
        .positive('Số lượng phải lớn hơn 0')
        .integer('Số lượng phải là số nguyên'),
    price: yup.number().typeError('Giá phải là số').required('Vui lòng nhập giá').positive(),
    priceAfterDiscount: yup
        .number()
        .typeError('Giá phải là số')
        .positive('Giá phải lớn hơn 0')
        .nullable()
        .notRequired()
        .test('is-less-than-price', 'Giá khi giảm phải thấp hơn giá gốc', function (value) {
            const { price } = this.parent;
            return value == null || value < price;
        }),
    category: yup.string().required('Vui lòng chọn danh mục'),
    subCategories: yup.array().of(yup.string()).min(1, 'Vui lòng chọn danh mục phụ'),
    brand: yup.string().required('Vui lòng chọn phòng'),
    collections: yup.string(),
    material: yup.string().required('Vui lòng nhập vật liệu'),
    size: yup.string().required('Vui lòng nhập kích thước'),
    imageCover: yup
        .array()
        .of(yup.mixed())
        .min(1, 'Vui lòng chọn ảnh chính')
        .required('Ảnh chính là bắt buộc'),
    images: yup.array().of(yup.array().of(yup.mixed())).required()
});

// ==== Default Values ====
const defaultValues: ProductFormValues = {
    title: '',
    slug: '',
    description: '',
    quantity: 0,
    price: 0,
    priceAfterDiscount: null,
    category: '',
    subCategories: [],
    brand: '',
    imageCover: [],
    images: [[], [], []],
    collections: '',
    material: '',
    size: ''
};

// ==== Component ====
function FormProductAction({
    isOpenCard,
    handleToggleCard,
    typeAction,
    productData
}: CardProductProps) {
    const dispatch = useAppDispatch();

    const category = useAppSelector(categoryFilter);
    const subCategory = useAppSelector(subCategoryFilter);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<ProductFormValues>({
        resolver: yupResolver(validateForm) as unknown as Resolver<ProductFormValues>,
        defaultValues
    });

    const selectedCategory = watch('category');
    const room = useAppSelector(roomFilter);

    const categoryOptions = category.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const subCategoryOptions = useMemo(() => {
        return subCategory
            .filter((sc) => sc.category === selectedCategory)
            .map((c) => ({
                value: c._id,
                label: c.name
            }));
    }, [subCategory, watch('category')]);

    const roomOptions = room.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const onSubmit = async (data: ProductFormValues) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('description', data.description);
        if (data.quantity !== undefined) formData.append('quantity', String(data.quantity));
        if (data.price !== undefined) formData.append('price', String(data.price));
        formData.append('collections', data.collections || '');
        formData.append('category', data.category || '');
        formData.append('material', data.material || '');
        formData.append('size', data.size || '');

        if (data.priceAfterDiscount != null && data.priceAfterDiscount !== undefined) {
            formData.append('priceAfterDiscount', String(data.priceAfterDiscount));
        }

        data.subCategories.forEach((scId) => formData.append('subCategories[]', scId));
        formData.append('brand', data.brand || '');

        if (data.imageCover?.[0]?.originFileObj) {
            formData.append('imageCover', data.imageCover[0].originFileObj as Blob);
        }

        data.images.forEach((imgArr) => {
            imgArr.forEach((img) => {
                if (img?.originFileObj) formData.append('images', img.originFileObj as Blob);
            });
        });

        if (typeAction === 'create') {
            dispatch(fetchAddProduct({ data: formData }));
        } else if (typeAction === 'update' && productData?._id) {
            dispatch(fetchUpdateProduct({ id: productData._id, data: formData }));
        }

        handleToggleCard();
        reset(defaultValues);
    };

    useEffect(() => {
        if (isOpenCard && productData) {
            reset({
                ...defaultValues,
                title: productData.title || '',
                slug: productData.slug || '',
                description: productData.description || '',
                quantity: productData.quantity ?? 0,
                price: productData.price ?? 0,
                priceAfterDiscount: productData.priceAfterDiscount ?? null,
                imageCover: productData.imageCover
                    ? [
                          {
                              uid: '-1',
                              name: 'imageCover',
                              status: 'done',
                              url: normalizeUrl(productData.imageCover)
                          }
                      ]
                    : [],
                images: productData.images?.map((img: string, i: number) =>
                    img
                        ? [
                              {
                                  uid: String(-i - 2),
                                  name: `image-${i}`,
                                  status: 'done',
                                  url: normalizeUrl(img)
                              }
                          ]
                        : []
                ) || [[], [], []],
                category: productData.category?._id ?? '',
                subCategories: productData.subCategories ?? [],
                brand: productData.brand?._id ?? '',
                collections: productData.collections || '',
                material: productData.material || '',
                size: productData.size || ''
            });
        } else {
            reset(defaultValues);
        }
    }, [isOpenCard, productData, reset]);

    useEffect(() => {
        dispatch(fetchGetAllCategory({ page: 1, limit: 1000 }));
        dispatch(fetchGetAllRoom());
        dispatch(fetchGetAllSubCateGory());
    }, [dispatch]);

    return (
        <Modal
            title={
                typeAction === 'create'
                    ? 'Thêm sản phẩm'
                    : typeAction === 'update'
                      ? 'Cập nhật sản phẩm'
                      : 'Xóa sản phẩm'
            }
            open={isOpenCard}
            onCancel={handleToggleCard}
            footer={null}
            // destroyOnClose
            centered
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 space-y-4'>
                {/* Tên sản phẩm */}
                <Controller
                    name='title'
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='Tên sản phẩm' />}
                />
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

                {/* Slug */}
                <Controller
                    name='slug'
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='Slug sản phẩm' />}
                />
                {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}

                {/* Mô tả */}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <Input.TextArea {...field} placeholder='Mô tả' rows={3} />
                    )}
                />
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                <div className='flex gap-4'>
                    {/* Số lượng */}
                    <div>
                        <label>Số lượng</label>
                        <Controller
                            name='quantity'
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    placeholder='Số lượng'
                                    style={{ width: '100%' }}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.quantity && (
                            <p className='text-red-500'>{errors.quantity.message}</p>
                        )}
                    </div>

                    {/* Giá */}
                    <div>
                        <label>Giá</label>
                        <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    style={{ width: '100%' }}
                                    placeholder='Giá'
                                    min={0}
                                    step={0.01}
                                    formatter={(value) =>
                                        value
                                            ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            : ''
                                    }
                                    parser={(value) =>
                                        value ? Number(value.replace(/\./g, '')) : 0
                                    }
                                />
                            )}
                        />
                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                    </div>

                    {/* Giá giảm */}
                    <div>
                        <label>Giá khi giảm</label>
                        <Controller
                            name='priceAfterDiscount'
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    style={{ width: '100%' }}
                                    placeholder='Giá khi giảm'
                                    min={0}
                                    step={0.01}
                                    formatter={(value) =>
                                        value
                                            ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            : ''
                                    }
                                    parser={(value) =>
                                        value ? Number(value.replace(/\./g, '')) : 0
                                    }
                                />
                            )}
                        />
                        {errors.priceAfterDiscount && (
                            <p className='text-red-500'>{errors.priceAfterDiscount.message}</p>
                        )}
                    </div>
                </div>

                {/* Vật liệu */}
                <Controller
                    name='material'
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='Vật liệu' />}
                />
                {errors.material && <p className='text-red-500'>{errors.material.message}</p>}

                <div className='flex gap-4'>
                    <Controller
                        name='collections'
                        control={control}
                        render={({ field }) => <Input {...field} placeholder='Bộ sưu tập' />}
                    />
                    {errors.collections && (
                        <p className='text-red-500'>{errors.collections.message}</p>
                    )}

                    <Controller
                        name='size'
                        control={control}
                        render={({ field }) => <Input {...field} placeholder='Kích thước' />}
                    />
                    {errors.size && <p className='text-red-500'>{errors.size.message}</p>}
                </div>

                {/* Selects */}
                <div className='flex gap-4'>
                    <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value || undefined}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                allowClear
                                options={categoryOptions}
                                placeholder='Chọn danh mục'
                                style={{ width: '100%' }}
                            />
                        )}
                    />
                    {errors.category && <p className='text-red-500'>{errors.category.message}</p>}

                    <Controller
                        name='subCategories'
                        control={control}
                        render={({ field }) => (
                            <Select
                                mode='multiple'
                                value={field.value || undefined}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                allowClear
                                options={subCategoryOptions}
                                placeholder='Chọn danh mục phụ'
                                style={{ width: '100%' }}
                            />
                        )}
                    />
                    {errors.subCategories && (
                        <p className='text-red-500'>{errors.subCategories.message}</p>
                    )}

                    <Controller
                        name='brand'
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value || undefined}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                allowClear
                                options={roomOptions}
                                placeholder='Chọn phòng'
                                style={{ width: '100%' }}
                            />
                        )}
                    />
                    {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
                </div>

                {/* Upload ảnh */}
                <div className='flex gap-4'>
                    <Controller
                        control={control}
                        name='imageCover'
                        render={({ field: { value, onChange } }) => (
                            <Upload
                                listType='picture-card'
                                fileList={value}
                                beforeUpload={() => false}
                                onChange={({ fileList }) => onChange(fileList)}
                            >
                                {!value?.length && 'Ảnh chính'}
                            </Upload>
                        )}
                    />
                    {errors.imageCover && (
                        <p className='text-red-500'>{errors.imageCover.message as string}</p>
                    )}

                    {['Ảnh 1', 'Ảnh 2', 'Ảnh 3'].map((label, i) => (
                        <Controller
                            key={i}
                            control={control}
                            name={`images.${i}`}
                            render={({ field: { value, onChange } }) => (
                                <Upload
                                    listType='picture-card'
                                    fileList={value}
                                    beforeUpload={() => false}
                                    onChange={({ fileList }) => onChange(fileList)}
                                >
                                    {!value?.length && label}
                                </Upload>
                            )}
                        />
                    ))}
                </div>

                {/* Buttons */}
                <div className='mt-4 flex justify-end gap-3'>
                    <Button onClick={handleToggleCard}>Hủy</Button>
                    <Button type='primary' htmlType='submit'>
                        {typeAction === 'create' ? 'Thêm' : 'Cập nhật'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default FormProductAction;
