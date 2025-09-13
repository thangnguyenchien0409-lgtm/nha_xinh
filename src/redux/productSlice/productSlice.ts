import { getAllProductsApi } from '@/apis/productService';
import type { ApiResponse, FetchParam, InitialStateType } from '@/redux/productSlice/product.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    status: 'idle',
    product: [],
    totalPage: 1
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
    reducers: {},
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

export default productSlice;
