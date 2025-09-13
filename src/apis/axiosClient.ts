import axios from 'axios';
import Cookies from 'js-cookie';
import type { AxiosError } from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3333/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosLocal = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
