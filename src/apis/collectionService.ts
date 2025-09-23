import { axiosMockClient } from './axiosClient';

export const getAllCollectionApi = async () => {
    return await axiosMockClient.get('collection');
};
