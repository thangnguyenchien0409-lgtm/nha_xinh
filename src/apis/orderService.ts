import axiosClient from './axiosClient';

const createOrderApi = async (cartId: string, data: any) => {
    return await axiosClient.post(`orders/${cartId}`, data);
};

const createCheckoutSessionApi = async (cartId: string, data: any) => {
    return await axiosClient.post(`orders/checkout-sessions/${cartId}`, data);
};

const getAllOrdersApi = async (page: number = 1, limit: number = 5) => {
    return await axiosClient.get(`orders?page=${page}&limit=${limit}`);
};

const getOrderApi = async (orderId: string) => {
    return await axiosClient.get(`orders/${orderId}`);
};

const deleteOrderApi = async (orderId: string) => {
    return await axiosClient.delete(`orders/${orderId}`);
};

const updateOrderPaidApi = async (orderId: string) => {
    return await axiosClient.patch(`orders/${orderId}/pay`);
};

const updateOrderDeliveredApi = async (orderId: string) => {
    return await axiosClient.patch(`orders/${orderId}/deliver`);
};

const updateOrderStatusApi = async (orderId: string, status: string) => {
    return await axiosClient.patch(`orders/${orderId}/status`, { status });
};

const updateOrderShippingApi = async (orderId: string, shippingAddress: string) => {
    return await axiosClient.patch(`orders/${orderId}/shipping`, { shippingAddress });
};

const cancelOrderApi = async (orderId: string) => {
    return await axiosClient.patch(`orders/${orderId}/cancel`);
};

export {
    createOrderApi,
    createCheckoutSessionApi,
    getAllOrdersApi,
    getOrderApi,
    deleteOrderApi,
    updateOrderPaidApi,
    updateOrderDeliveredApi,
    updateOrderStatusApi,
    updateOrderShippingApi,
    cancelOrderApi
};
