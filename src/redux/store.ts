import { authSlice } from '@/redux/authSlice';
import productSlice from '@/redux/productSlice/productSlice';
import { configureStore } from '@reduxjs/toolkit';

const store: any = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
