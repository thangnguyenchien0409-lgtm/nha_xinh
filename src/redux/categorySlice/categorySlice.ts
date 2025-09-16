import { getAllCategoryApi } from '@/apis/categoryService';
import type {
    BodyFetchCategoryType,
    InitialStateCategoryType
} from '@/redux/categorySlice/category.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateCategoryType = {
    status: 'idle',
    category: [],
    currentPage: 1,
    numberPage: 1,
    limit: 6,
    total: 0
};

export const fetchGetAllCategory = createAsyncThunk<
    any,
    BodyFetchCategoryType,
    { rejectValue: string }
>('category/fetchGetAllCategory', async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
        const res = await getAllCategoryApi(page, limit);
        return res.data;
    } catch (error: any) {
        toast.error(error.message || 'Có lỗi xảy ra');
        return rejectWithValue(error.response?.data || error.message);
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        addCategoryToState: (state, action) => {
            state.category.push(action.payload);
            state.total += 1;
            state.numberPage = Math.ceil(state.total / state.limit);
        }
    },
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(fetchGetAllCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetAllCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                const { Document, paginationResult, result } = action.payload;

                state.category = Document;
                state.currentPage = paginationResult.currentPage;
                state.numberPage = paginationResult.numberOfPages;
                state.limit = paginationResult.limit;

                state.total =
                    (paginationResult.numberOfPages - 1) * paginationResult.limit + result;
            })
            .addCase(fetchGetAllCategory.rejected, (state) => {
                state.status = 'error';
            });
    }
});
export const { setCurrentPage, setLimit, addCategoryToState } = categorySlice.actions;

export default categorySlice;
