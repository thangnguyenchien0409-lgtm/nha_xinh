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
import FormSubCateAction from '@/components/FormAction/FormSubCateAction';
import { subCategoryFilter } from '@/redux/subCategorySlice/subCategorySelector';
import {
    fetchDeleteSubCategory,
    fetchGetAllSubCateGory,
    searchSubCateByCategoryId,
    searchSubCateByText
} from '@/redux/subCategorySlice/subCategorySlice';
import { categoryFilter } from '@/redux/categorySlice/categorySelector';
import { Skeleton, Spin } from 'antd';

type CategoryTable = {
    _id: string;
    name: string;
    action: string[];
};

function SubCategoryPage() {
    const [isOpenCard, setIsOpenCard] = useState(false);
    const [typeAction, setTypeAction] = useState<'update' | 'create' | ''>('');
    const [currentData, setCurrentData] = useState<any | null>(null);

    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.subCategory.loading);
    const subCategory = useAppSelector(subCategoryFilter) || [];
    const category = useAppSelector(categoryFilter);

    const categoryOptions = category.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                dispatch(searchSubCateByText(value));
            }, 300),
        [dispatch]
    );

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleFilterSubCateByCategoryId = (value: string | undefined) => {
        dispatch(searchSubCateByCategoryId(value));
    };

    const handleToggleCard = () => {
        setIsOpenCard(!isOpenCard);
    };

    const handleClickAction = (type: 'update' | 'create' | '', id: string | null) => {
        handleToggleCard();
        setTypeAction(type);
        if (type === 'update' && id) {
            const selected = subCategory.find((c) => c._id === id);
            setCurrentData(selected || null);
        } else {
            setCurrentData(null);
        }
    };

    const handleDeleteItem = (id: string) => {
        dispatch(fetchDeleteSubCategory(id));
    };

    const columns: ColumnsType<CategoryTable> = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
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
            <h1 className='mt-4 font-semibold'>Danh mục phụ</h1>
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
                    onChange={handleFilterSubCateByCategoryId}
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
            {loading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <Table<CategoryTable>
                    rowKey='_id'
                    columns={columns}
                    dataSource={subCategory}
                    bordered
                    loading={loading}
                    pagination={false}
                    scroll={{ y: 450 }}
                    components={{
                        body: {
                            row: (props) =>
                                !isOpenCard ? (
                                    <AnimatePresence>
                                        <motion.tr
                                            {...props}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.7 }}
                                        />
                                    </AnimatePresence>
                                ) : (
                                    <tr {...props} />
                                )
                        }
                    }}
                />
            )}
            <FormSubCateAction
                isOpenCard={isOpenCard}
                handleToggleCard={handleToggleCard}
                typeAction={typeAction}
                data={currentData}
            />
        </div>
    );
}

export default SubCategoryPage;
