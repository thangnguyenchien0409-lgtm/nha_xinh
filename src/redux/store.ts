import { authSlice } from '@/redux/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store: any = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
