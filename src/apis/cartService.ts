import axiosClient from './axiosClient';

const getAllCartApi = async () => {
    return await axiosClient.get('carts');
};

const getCartItemApi = async (cartItemId: string) => {
    return await axiosClient.get(`carts/${cartItemId}`);
};
const addToCartApi = async (productId: string, quantity: number = 1) => {
    return await axiosClient.post('carts', { productId, quantity });
};

const updateCartItemApi = async (cartItemId: string, quantity: number) => {
    return await axiosClient.patch(`carts/${cartItemId}`, { quantity });
};

const deleteCartItemApi = async (cartItemId: string) => {
    return await axiosClient.delete(`carts/${cartItemId}`);
};

const clearCartApi = async () => {
    return await axiosClient.delete('carts');
};

const applyCouponApi = async (couponCode: any) => {
    return await axiosClient.put('carts/applyCoupon', { coupon: couponCode });
};

export {
    getAllCartApi,
    getCartItemApi,
    addToCartApi,
    updateCartItemApi,
    deleteCartItemApi,
    clearCartApi,
    applyCouponApi
};
