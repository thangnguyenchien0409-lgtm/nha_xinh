import axiosClient from '@/apis/axiosClient';

export const getAllRoomApi = async () => {
    return await axiosClient.get('brands');
};

export const addRoomApi = async (body: any) => {
    return await axiosClient.post('brands', body);
};

export const deleteRoomApi = async (id: string) => {
    return await axiosClient.delete(`brands/${id}`);
};

export const updateRoomApi = async (id: string, body: any) => {
    return await axiosClient.patch(`brands/${id}`, body);
};
