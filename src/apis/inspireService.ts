import { axiosMockClient } from './axiosClient';

export const getAllInspireApi = async () => {
    return await axiosMockClient.get('inspire');
};

export const getInspireById = async (id: string) => {
    return await axiosMockClient.get(`inspire/${id}`);
};
