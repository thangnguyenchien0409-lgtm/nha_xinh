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
