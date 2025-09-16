import axiosClient from '@/apis/axiosClient';

const getAllSubCategoryAPI = async (page = 1, limit = 1000) => {
    return await axiosClient.get(`sub-categories?page=${page}&limit=${limit}`);
};

const addSubCategoryAPI = async (body: any) => {
    return await axiosClient.post(`sub-categories`, body);
};

const updateSubCategoryAPI = async (id: string, body: any) => {
    return await axiosClient.patch(`sub-categories/${id}`, body);
};

const deleteSubCategoryAPI = async (id: string) => {
    return await axiosClient.delete(`sub-categories/${id}`);
};

export { getAllSubCategoryAPI, addSubCategoryAPI, updateSubCategoryAPI, deleteSubCategoryAPI };
