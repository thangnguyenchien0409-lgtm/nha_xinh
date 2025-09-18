import {
    addCategoryApi,
    deleteCategoryApi,
    getAllCategoryApi,
    updateCategoryApi
} from '@/apis/categoryService';
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
    total: 0,
    searchText: '',
    loading: false
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

export const fetchAddCategory = createAsyncThunk<
    any,
    BodyFetchCategoryType,
    { rejectValue: string }
>('category/fetchAddCategory', async (data, { rejectWithValue }) => {
    try {
        const res = await addCategoryApi(data);
        toast.success('Thêm thành công');
        return res.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchUpdateCategory = createAsyncThunk<
    any,
    BodyFetchCategoryType,
    { rejectValue: string }
>('category/fetchUpdateCategory', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await updateCategoryApi(id!, data);
        toast.success('Sửa thành công');
        return res.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchDeleteCategory = createAsyncThunk<any, string, { rejectValue: string }>(
    'category/fetchDeleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteCategoryApi(id);
            toast.success('Xóa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

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
        },
        searchCategoryByText: (state, action) => {
            state.searchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(fetchGetAllCategory.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
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
                state.loading = false;
            })
            .addCase(fetchGetAllCategory.rejected, (state) => {
                state.status = 'error';
                state.loading = false;
            })
            // add

            .addCase(fetchAddCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                state.total += 1;
                state.numberPage = Math.ceil(state.total / state.limit);
                state.currentPage = state.numberPage;
                state.category.unshift(action.payload.Document);
            })
            .addCase(fetchAddCategory.rejected, (state) => {
                state.status = 'error';
            })
            //update
            .addCase(fetchUpdateCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                const { id, data } = action.meta.arg;
                state.category = state.category.map((item) =>
                    item._id === id ? { ...item, ...data } : item
                );
            })
            .addCase(fetchUpdateCategory.rejected, (state) => {
                state.status = 'error';
            })
            // delete
            .addCase(fetchDeleteCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                const deletedId = action.meta.arg; // id category cần xóa
                state.category = state.category.filter((item) => item._id !== deletedId);
                state.total -= 1;
                state.numberPage = Math.ceil(state.total / state.limit);
            })
            .addCase(fetchDeleteCategory.rejected, (state) => {
                state.status = 'error';
            });
    }
});
export const { setCurrentPage, setLimit, addCategoryToState, searchCategoryByText } =
    categorySlice.actions;

export default categorySlice;
