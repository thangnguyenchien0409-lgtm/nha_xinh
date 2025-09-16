import axiosClient from '@/apis/axiosClient';

const getAllCategoryApi = async (page = 1, limit = 6) => {
    return await axiosClient.get(`categories?page=${page}&limit=${limit}`);
};

const addCategoryApi = async (body: any) => {
    return await axiosClient.post('categories', body);
};

const deleteCategoryApi = async (id: string) => {
    return await axiosClient.delete(`categories/${id}`);
};

const updateCategoryApi = async (id: string, body: any) => {
    return await axiosClient.patch(`categories/${id}`, body);
};

export { getAllCategoryApi, addCategoryApi, deleteCategoryApi, updateCategoryApi };
