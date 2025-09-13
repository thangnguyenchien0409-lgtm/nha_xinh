import { axiosMockClient } from './axiosClient';

export const getAllInspireApi = async () => {
    return await axiosMockClient.get('inspire');
};
