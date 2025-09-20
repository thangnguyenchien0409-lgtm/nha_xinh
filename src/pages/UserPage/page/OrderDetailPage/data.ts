type DataNavOrderType = {
    type: string;
    title: string;
};

export const dataNavOrder: DataNavOrderType[] = [
    {
        type: 'all',
        title: 'Tất cả đơn hàng'
    },
    {
        type: 'pending',
        title: 'Chờ xác nhận'
    },
    {
        type: 'confirmed',
        title: 'Đã xác nhận'
    },
    {
        type: 'shipping',
        title: 'Đang vận chuyển'
    },
    {
        type: 'completed',
        title: 'Đã hoàn thành'
    },
    {
        type: 'cancelled',
        title: 'Đã hủy'
    }
];
