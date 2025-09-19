import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
    fetchGetAllOrder,
    fetchUpdateStatusOrder,
    searchOrderByStatus
} from '@/redux/orderSlice/orderSlice';
import { useEffect } from 'react';
import { Select, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { orderFilter } from '@/redux/orderSlice/orderSelector';
import { Option } from 'antd/es/mentions';

type ShippingAddress = {
    city: string;
    details: string;
    phone: string;
    postalCode: string;
};

type CartItem = {
    productId: {
        _id: string;
        title: string;
    };
    quantity: number;
    price: number;
    _id: string;
};

const statusOptions: string[] = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];

const statusColors: Record<string, string> = {
    pending: 'orange',
    confirmed: 'blue',
    shipping: 'geekblue',
    completed: 'green',
    cancelled: 'red'
};

type OrderType = {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    shippingAddress: ShippingAddress;
    status: string;
    isPaid: boolean;
    isDelivered: boolean;
    totalOrderPrice: number;
    updatedAt: string;
    createdAt: string;
    cartItems: CartItem[];
};

function OrderPage() {
    const dispatch = useAppDispatch();
    const order: any = useAppSelector(orderFilter);
    const loading = useAppSelector((state) => state.order.loading);

    const columns: ColumnsType<OrderType> = [
        {
            title: 'Mã đơn',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <span className='font-mono'>{text.slice(-6)}</span> // chỉ hiển thị 6 ký tự cuối
        },
        {
            title: 'Sản phẩm',
            key: 'products',
            render: (_, record) => (
                <ul className='w-[110px] list-disc pl-4'>
                    {record.cartItems.map((item) => (
                        <li key={item._id} className='flex'>
                            <p className='w-full truncate'>{item.productId?.title}</p> ×
                            <p>{item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Khách hàng',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'SĐT',
            dataIndex: ['shippingAddress', 'phone'],
            key: 'phone'
        },
        {
            title: 'Địa chỉ',
            key: 'address',
            render: (_, record) => (
                <p className='w-[120px] truncate'>
                    {record.shippingAddress.details}, {record.shippingAddress.city}
                </p>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    variant={'borderless'}
                    suffixIcon={null}
                    style={{ width: '100%' }}
                    defaultValue={status}
                    onChange={(newStatus) => {
                        if (newStatus === status) return;
                        dispatch(
                            fetchUpdateStatusOrder({ orderId: record._id, statusOrder: newStatus })
                        );
                    }}
                    optionLabelProp='children' // Hiển thị nội dung của children khi chọn
                >
                    {statusOptions.map((s) => (
                        <Option style={{ width: '100%', height: '100%' }} key={s} value={s}>
                            <Tag style={{ width: '100%', height: '100%' }} color={statusColors[s]}>
                                {s}
                            </Tag>
                        </Option>
                    ))}
                </Select>
            )
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (
                <Tag color={isPaid ? 'blue' : 'red'}>
                    {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Tag>
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalOrderPrice',
            key: 'totalOrderPrice',
            render: (price) => price.toLocaleString('vi-VN') + ' ₫'
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => new Date(date).toLocaleString('vi-VN'),
            sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
            defaultSortOrder: 'descend'
        }
    ];

    useEffect(() => {
        dispatch(fetchGetAllOrder({ page: 1, limit: 5 }));
    }, [dispatch]);

    return (
        <div className='pr-3'>
            <h1 className='mt-4 font-semibold'>Đơn hàng</h1>
            <Select
                allowClear
                placeholder={'Chọn trạng thái '}
                style={{ marginBottom: 20, width: 220 }}
                options={statusOptions.map((s) => ({ label: s, value: s }))}
                onChange={(value) => {
                    dispatch(searchOrderByStatus(value));
                }}
            />
            <Table
                loading={loading}
                rowKey='_id'
                columns={columns}
                dataSource={order?.orders}
                bordered
                style={{ minHeight: 400 }}
                pagination={{
                    current: order?.paginationResult?.currentPage || 1,
                    pageSize: order?.paginationResult?.limit || 5,
                    total: order?.paginationResult?.totalDocs || 0,
                    onChange: (page, pageSize) => {
                        dispatch(fetchGetAllOrder({ page, limit: pageSize }));
                    }
                }}
            />
        </div>
    );
}

export default OrderPage;
