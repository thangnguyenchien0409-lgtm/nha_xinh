// src/redux/authSlice.ts
import { loginApi, registerApi, signInWithGoogle, type AuthBody } from '@/apis/authService';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export interface User {
    uid?: string;
    displayName?: string | null;
    email: string;
    photoURL?: string | null;
    name?: string;
}

export interface AuthResponse {
    data: User;
    token: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

interface AuthState {
    status: Status;
    isAuth: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    status: 'idle',
    isAuth: !!Cookies.get('token'),
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,
    token: Cookies.get('token') || null,
    error: null
};

// ========== REGISTER ==========
export const fetchRegister = createAsyncThunk<AuthResponse, AuthBody>(
    'auth/fetchRegister',
    async (body, { rejectWithValue }) => {
        try {
            const res = await registerApi(body);
            toast.success('Đăng kí thành công');

            // Auto login sau khi đăng ký
            Cookies.set('user', JSON.stringify(res.data.data));
            Cookies.set('token', res.data.token);

            return res.data;
        } catch (error: any) {
            console.log(error);
            const message = error.response?.data?.err[0]?.msg || 'Có lỗi xảy ra';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// ========== LOGIN ==========
export const fetchLogin = createAsyncThunk<AuthResponse, AuthBody>(
    'auth/fetchLogin',
    async (body, { rejectWithValue }) => {
        try {
            const res = await loginApi(body);

            toast.success('Đăng nhập thành công');
            Cookies.set('user', JSON.stringify(res.data.data));
            Cookies.set('token', res.data.token);

            return res.data;
        } catch (error: any) {
            const message = error.response?.data?.err[0]?.msg || 'Đăng nhập thất bại';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// ========== GOOGLE LOGIN ==========
export const fetchLoginWithGoogle = createAsyncThunk<AuthResponse>(
    'auth/fetchLoginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const user = await signInWithGoogle(); // Firebase login

            const token = (user as any).accessToken || (user as any).stsTokenManager?.accessToken;

            const userData: User = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email!,
                photoURL: user.photoURL
            };

            toast.success('Đăng nhập Google thành công');

            Cookies.set('user', JSON.stringify(userData));
            Cookies.set('token', token);

            return { data: userData, token };
        } catch (error: any) {
            toast.error('Đăng nhập Google thất bại');
            return rejectWithValue(error.message || 'Google login failed');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.isAuth = false;
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
            Cookies.remove('user');
            Cookies.remove('token');
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.status = 'success';
                state.isAuth = true;
                state.user = action.payload.data;
                state.token = action.payload.token;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });

        // LOGIN
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.status = 'success';
                state.isAuth = true;
                state.user = action.payload.data;
                state.token = action.payload.token;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });

        // GOOGLE LOGIN
        builder
            .addCase(fetchLoginWithGoogle.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(
                fetchLoginWithGoogle.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.status = 'success';
                    state.isAuth = true;
                    state.user = action.payload.data;
                    state.token = action.payload.token;
                }
            )
            .addCase(fetchLoginWithGoogle.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    }
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
