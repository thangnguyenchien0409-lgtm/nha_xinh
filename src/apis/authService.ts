import axiosClient from '@/apis/axiosClient';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

export type AuthBody = {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

const registerApi = async (body: AuthBody) => {
    return await axiosClient.post('auth/signup', body);
};

const loginApi = async (body: AuthBody) => {
    return await axiosClient.post('auth/login', body);
};

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};

export { registerApi, loginApi, signInWithGoogle };
