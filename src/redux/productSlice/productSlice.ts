import { getAllProductsApi } from '@/apis/productService';
import type { ApiResponse, FetchParam, InitialStateType } from '@/redux/productSlice/product.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialViewed: any[] = (() => {
    try {
        const data = localStorage.getItem('viewedProduct');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
})();

const initialState: InitialStateType = {
    status: 'idle',
    product: [],
    totalPage: 1,
    newProduct: [],
    viewedProduct: initialViewed
};

export const fetchGetAllProduct = createAsyncThunk<
    ApiResponse,
    FetchParam | void,
    { rejectValue: string }
>('product/fetchGetAllProduct', async ({ page = 1, limit = 1000 } = {}, { rejectWithValue }) => {
    try {
        const res = await getAllProductsApi<ApiResponse>(page, limit);
        console.log(res.data);
        return res.data as ApiResponse;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getNewProduct(state) {
            state.newProduct = state.product?.slice(-8);
        },
        addViewedProduct(state, action) {
            if (!Array.isArray(state.viewedProduct)) {
                state.viewedProduct = [];
            }

            state.viewedProduct = state.viewedProduct.filter((p) => p._id !== action.payload._id);

            state.viewedProduct.unshift(action.payload);

            state.viewedProduct = state.viewedProduct.slice(0, 4);

            localStorage.setItem('viewedProduct', JSON.stringify(state.viewedProduct));
        }
    },
    extraReducers: (builder) => {
        // --- GET ALL ---
        builder.addCase(fetchGetAllProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            state.product = action.payload.Document || [];
            state.totalPage = action.payload.paginationResult.numberOfPages;
        });
        builder.addCase(fetchGetAllProduct.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const { getNewProduct, addViewedProduct } = productSlice.actions;

export default productSlice;
