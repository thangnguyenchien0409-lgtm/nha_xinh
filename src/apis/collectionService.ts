import { axiosMockClient } from './axiosClient';

export const getAllCollectionApi = async () => {
    return await axiosMockClient.get('collection');
};

export const getCollectionById = async (collectionId: string) => {
    return await axiosMockClient.get(`collection/${collectionId}`);
};
