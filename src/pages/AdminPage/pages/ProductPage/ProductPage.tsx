import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { fetchGetAllCategory } from '@/redux/categorySlice/categorySlice';
import { useEffect, useMemo, useState } from 'react';
import { Input, Select, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CiSquarePlus } from 'react-icons/ci';
import { subCategoryFilter } from '@/redux/subCategorySlice/subCategorySelector';
import { fetchGetAllSubCateGory } from '@/redux/subCategorySlice/subCategorySlice';
import { categoryFilter } from '@/redux/categorySlice/categorySelector';
import {
    fetchDeleteProduct,
    fetchGetAllProductNoLimit,
    searchProductByCategoryId,
    searchProductByRoomId,
    searchProductBySubCategoryId,
    searchProductByText
} from '@/redux/productSlice/productSlice';
import { getProductSearch } from '@/redux/productSlice/productSelector';
import { normalizeUrl } from '@/utils/normalizeUrl';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import FormProductAction from '@/components/FormAction/FormProductAction';
import { roomFilter } from '@/redux/roomSlice/roomSelector';

type ProductTable = {
    _id: string;
    imageCover: string;
    title: string;
    price: number;
    quantity: number;

    action: string[];
};

function ProductPage() {
    const [isOpenCard, setIsOpenCard] = useState(false);
    const [typeAction, setTypeAction] = useState<'update' | 'create' | ''>('');
    const [currentData, setCurrentData] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.product.loading);
    const products = useAppSelector(getProductSearch);
    const subCategory = useAppSelector(subCategoryFilter) || [];
    const category = useAppSelector(categoryFilter);
    const room = useAppSelector(roomFilter);

    const subCategoryOptions = useMemo(() => {
        return subCategory
            .filter((sc) => sc.category === selectedCategory)
            .map((c) => ({
                value: c._id,
                label: c.name
            }));
    }, [subCategory, selectedCategory]);

    const roomOptions = room.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const categoryOptions = category.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                dispatch(searchProductByText(value));
            }, 300),
        [dispatch]
    );

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleFilterProductByCategoryId = (value: string | undefined) => {
        setSelectedCategory(value);
        dispatch(searchProductByCategoryId(value));
    };

    const handleFilterProductBySubCategoryId = (value: string | undefined) => {
        dispatch(searchProductBySubCategoryId(value));
    };

    const handleFilterProductByRoomId = (value: string | undefined) => {
        dispatch(searchProductByRoomId(value));
    };

    const handleToggleCard = () => {
        setIsOpenCard(!isOpenCard);
    };

    const handleClickAction = (type: 'update' | 'create' | '', id: string | null) => {
        handleToggleCard();
        setTypeAction(type);
        if (type === 'update' && id) {
            const selected = products.find((c) => c._id === id);
            setCurrentData(selected || null);
        } else {
            setCurrentData(null);
        }
    };

    const handleDeleteItem = (id: string) => {
        dispatch(fetchDeleteProduct(id));
    };

    const columns: ColumnsType<ProductTable> = [
        {
            title: 'Ảnh',
            dataIndex: 'imageCover',
            key: 'imageCover',
            render: (imageCover) => {
                if (!imageCover) return <span className='text-gray-400'>Không có ảnh</span>;
                const url = typeof imageCover === 'string' ? imageCover : imageCover[0]?.url;
                const finalUrl = normalizeUrl(url); // luôn trả về /uploads/filename
                return (
                    <img
                        src={finalUrl}
                        alt='Ảnh sản phẩm'
                        className='h-16 w-16 rounded border border-gray-200 object-cover'
                    />
                );
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title)
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => `${useFormatNumber(price)} ₫`
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type='primary'
                        icon={<EditOutlined />}
                        onClick={() => handleClickAction('update', record._id)}
                    ></Button>

                    {/* Nút xóa */}
                    <Popconfirm
                        title='Bạn có chắc muốn xóa?'
                        onConfirm={() => handleDeleteItem(record._id)}
                        okText='Có'
                        cancelText='Không'
                    >
                        <Button danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    useEffect(() => {
        dispatch(fetchGetAllProductNoLimit());
        dispatch(fetchGetAllSubCateGory());
        dispatch(fetchGetAllCategory({ page: 1, limit: 1000 }));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className='pr-3'>
            <h1 className='mt-4 font-semibold'>Sản phẩm</h1>
            <div className='mb-4 flex items-center gap-4'>
                <Input
                    placeholder='Tìm kiếm danh mục'
                    style={{ width: 300, height: 40 }}
                    onChange={handleSearchInput}
                />

                <Select
                    allowClear
                    options={categoryOptions}
                    placeholder='Chọn danh mục'
                    onChange={handleFilterProductByCategoryId}
                    style={{ height: 40, width: 200 }}
                />

                <Select
                    allowClear
                    options={subCategoryOptions}
                    placeholder='Chọn danh mục phụ'
                    onChange={handleFilterProductBySubCategoryId}
                    style={{ height: 40, width: 200 }}
                />

                <Select
                    allowClear
                    options={roomOptions}
                    placeholder='Chọn phòng'
                    onChange={handleFilterProductByRoomId}
                    style={{ height: 40, width: 200 }}
                />

                <Tooltip placement='top' title='Thêm danh mục'>
                    <CiSquarePlus
                        onClick={() => handleClickAction('create', null)}
                        size={50}
                        className='cursor-pointer transition-all hover:text-blue-400'
                    />
                </Tooltip>
            </div>

            <Table<ProductTable>
                rowKey='_id'
                columns={columns}
                dataSource={products}
                bordered
                loading={loading}
                pagination={false}
                scroll={{ y: 450 }}
                components={{
                    body: {
                        row: (props) =>
                            !isOpenCard && !loading ? (
                                <AnimatePresence>
                                    <motion.tr
                                        {...props}
                                        // initial={{ opacity: 0, y: 20 }}
                                        // animate={{ opacity: 1, y: 0 }}
                                        // exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.7 }}
                                        layout
                                    />
                                </AnimatePresence>
                            ) : (
                                <tr {...props} />
                            )
                    }
                }}
            />
            <FormProductAction
                isOpenCard={isOpenCard}
                handleToggleCard={handleToggleCard}
                typeAction={typeAction}
                productData={currentData}
            />
        </div>
    );
}

export default ProductPage;
