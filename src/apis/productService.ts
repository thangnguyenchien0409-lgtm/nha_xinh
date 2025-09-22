import axiosClient from './axiosClient';

export const getAllProductsApi = async <T>(page = 1, limit = 1000) => {
    return await axiosClient.get<T>(`products?page=${page}&limit=${limit}`);
};

export const getProductApi = async (id: string) => {
    return await axiosClient.get(`products/${id}`);
};

export const addProductApi = async (data: any) => {
    return await axiosClient.post('products', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateProductApi = async (id: string, data: any) => {
    return await axiosClient.patch(`products/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteProductApi = async (id: string) => {
    return await axiosClient.delete(`products/${id}`);
};

// REVIEW

// Lấy tất cả review (hoặc review theo productId)
export const getAllReviewsApi = async <T>(productId?: string) => {
    if (productId) {
        return await axiosClient.get<T>(`products/${productId}/reviews`);
    }
    return await axiosClient.get<T>('reviews');
};

// Lấy 1 review theo id
export const getReviewApi = async <T>(id: string) => {
    return await axiosClient.get<T>(`reviews/${id}`);
};

// Thêm review cho 1 sản phẩm
export const addReviewApi = async (productId: string, orderId: string, data: any) => {
    return await axiosClient.post(`products/${productId}/orders/${orderId}/reviews`, data);
};

// Cập nhật review
export const updateReviewApi = async (id: string, data: any) => {
    return await axiosClient.put(`reviews/${id}`, data);
};

// Xoá review
export const deleteReviewApi = async (id: string) => {
    return await axiosClient.delete(`reviews/${id}`);
};
