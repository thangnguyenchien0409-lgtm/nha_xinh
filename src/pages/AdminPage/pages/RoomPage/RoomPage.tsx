import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    fetchDeleteCategory,
    fetchGetAllCategory,
    searchCategoryByText
} from '@/redux/categorySlice/categorySlice';
import { useEffect, useMemo, useState } from 'react';
import { Input, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnimatePresence, motion } from 'framer-motion';
import { categoryFilter } from '@/redux/categorySlice/categorySelector';
import debounce from 'lodash.debounce';
import { Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CiSquarePlus } from 'react-icons/ci';
import FormCategotyAction from '@/components/FormAction/FormCategotyAction';
import { roomFilter } from '@/redux/roomSlice/roomSelector';
import { fetchDeleteRoom, fetchGetAllRoom, searchRoomByText } from '@/redux/roomSlice/roomSlice';
import FormRoomAction from '@/components/FormAction/FormRoomAction';

type RoomTable = {
    _id: string;
    name: string;
    action: string[];
};

function RoomPage() {
    const [isOpenCard, setIsOpenCard] = useState(false);
    const [typeAction, setTypeAction] = useState<'update' | 'create' | ''>('');
    const [currentData, setCurrentData] = useState<any | null>(null);
    const dispatch = useAppDispatch();
    const room = useAppSelector(roomFilter);

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                dispatch(searchRoomByText(value));
            }, 300),
        [dispatch]
    );

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handleToggleCard = () => {
        setIsOpenCard(!isOpenCard);
    };

    const handleClickAction = (type: 'update' | 'create' | '', id: string | null) => {
        handleToggleCard();
        setTypeAction(type);
        if (type === 'update' && id) {
            const selected = room.find((c) => c._id === id);
            setCurrentData(selected || null);
        } else {
            setCurrentData(null);
        }
    };

    const handleDeleteItem = (id: string) => {
        dispatch(fetchDeleteRoom(id));
    };

    const columns: ColumnsType<RoomTable> = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Tên phòng',
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
        dispatch(fetchGetAllRoom());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className='pr-3'>
            <h1 className='mt-4 font-semibold'>Phòng</h1>
            <div className='mb-4 flex items-center gap-4'>
                <Input
                    placeholder='Tìm kiếm danh mục'
                    style={{ width: 300, height: 40 }}
                    onChange={handleSearchInput}
                />

                <Tooltip placement='top' title='Thêm phòng'>
                    <CiSquarePlus
                        onClick={() => handleClickAction('create', null)}
                        size={50}
                        className='cursor-pointer transition-all hover:text-blue-400'
                    />
                </Tooltip>
            </div>
            <div>
                <Table<RoomTable>
                    rowKey='_id'
                    columns={columns}
                    dataSource={room}
                    bordered
                    pagination={false}
                    scroll={{ y: 450 }}
                    components={{
                        body: {
                            row: (props) =>
                                !isOpenCard ? (
                                    <AnimatePresence>
                                        <motion.tr
                                            {...props}
                                            initial={{ opacity: 0, y: 120 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -120 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                ) : (
                                    <tr {...props} />
                                )
                        }
                    }}
                />
            </div>
            <FormRoomAction
                isOpenCard={isOpenCard}
                handleToggleCard={handleToggleCard}
                typeAction={typeAction}
                data={currentData}
            />
        </div>
    );
}

export default RoomPage;
