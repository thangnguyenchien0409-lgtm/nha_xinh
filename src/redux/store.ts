import { authSlice } from '@/redux/authSlice';
import cartSlice from '@/redux/cartSlice/cartSlice';
import orderSlice from '@/redux/orderSlice/orderSlice';
import productSlice from '@/redux/productSlice/productSlice';
import { configureStore } from '@reduxjs/toolkit';

const store: any = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
