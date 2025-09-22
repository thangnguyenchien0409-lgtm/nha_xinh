import { addReviewApi, getAllReviewsApi } from '@/apis/productService';
import type { FetchParam, InitialStateReviewType } from '@/redux/reviewSlice/review.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateReviewType = {
    status: 'idle',
    review: []
};

export const fetchGetAllReview = createAsyncThunk<any>(
    'product/fetchGetAllReview',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllReviewsApi();
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchReviewProduct = createAsyncThunk<any, FetchParam, { rejectValue: string }>(
    'product/fetchReviewProduct',
    async ({ productId, orderId, data }, { rejectWithValue }) => {
        try {
            const res = await addReviewApi(productId!, orderId!, data);
            toast.success('Đánh giá thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // --- GET ALL ---
        builder.addCase(fetchGetAllReview.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllReview.fulfilled, (state, action) => {
            state.status = 'idle';

            state.review = action.payload.Document;
        });
        builder.addCase(fetchGetAllReview.rejected, (state) => {
            state.status = 'error';
        });
        // --- REVIEW ---
        builder.addCase(fetchReviewProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchReviewProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.Document) {
                state.review.unshift(action.payload.Document);
            }
        });
        builder.addCase(fetchReviewProduct.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export default reviewSlice;
