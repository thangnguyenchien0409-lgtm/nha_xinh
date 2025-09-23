import { authSlice } from '@/redux/authSlice';
import cartSlice from '@/redux/cartSlice/cartSlice';
import categorySlice from '@/redux/categorySlice/categorySlice';
import collectionSlice from '@/redux/collectionSlice/collectionSlice';
import inSpireSlice from '@/redux/inSpireSlice/inSpireSlice';
import orderSlice from '@/redux/orderSlice/orderSlice';
import productSlice from '@/redux/productSlice/productSlice';
import reviewSlice from '@/redux/reviewSlice/reviewSlice';
import roomSlice from '@/redux/roomSlice/roomSlice';
import subCategorySlice from '@/redux/subCategorySlice/subCategorySlice';
import { configureStore } from '@reduxjs/toolkit';

const store: any = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
        category: categorySlice.reducer,
        subCategory: subCategorySlice.reducer,
        room: roomSlice.reducer,
        review: reviewSlice.reducer,
        inspire: inSpireSlice.reducer,
        collection: collectionSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
