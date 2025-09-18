import {
    addSubCategoryAPI,
    deleteSubCategoryAPI,
    getAllSubCategoryAPI,
    updateSubCategoryAPI
} from '@/apis/subCategoryService';
import type {
    BodyFetchSubCategoryType,
    InitialStateSubCateType
} from '@/redux/subCategorySlice/subCategory.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateSubCateType = {
    status: 'idle',
    subCategory: [],
    searchText: '',
    categoryId: '',
    loading: false,
    initialized: false
};

export const fetchGetAllSubCateGory = createAsyncThunk(
    'subCategory/fetchGetAllSubCateGory',
    async (_, thunkAPI) => {
        try {
            const res = await getAllSubCategoryAPI();
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

export const fetchAddSubCategory = createAsyncThunk(
    'subCategory/fetchAddSubCategory',
    async (data, thunkAPI) => {
        try {
            const res = await addSubCategoryAPI(data);
            console.log(res);
            toast.success('Thêm thành công');

            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data.message);
            console.log(error);

            return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

export const fetchUpdateSubCategory = createAsyncThunk<
    any,
    BodyFetchSubCategoryType,
    { rejectValue: string }
>('subCategory/fetchUpdateSubCategory', async ({ id, data }, thunkAPI) => {
    try {
        const res = await updateSubCategoryAPI(id!, data);
        toast.success('Sửa thành công');
        return res.data;
    } catch (error: any) {
        toast.error(error.response?.data.message);
        console.log(error);

        return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
    }
});

export const fetchDeleteSubCategory = createAsyncThunk<any, string, { rejectValue: string }>(
    'subCategory/fetchDeleteSubCategory',
    async (id, thunkAPI) => {
        try {
            const res = await deleteSubCategoryAPI(id);
            toast.success('Xóa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data.message);
            console.log(error);

            return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {
        searchSubCateByText(state, action) {
            state.searchText = action.payload;
        },
        searchSubCateByCategoryId(state, action) {
            state.categoryId = action.payload;
        }
    },
    extraReducers: (builder) => {
        // get all
        builder.addCase(fetchGetAllSubCateGory.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        });
        builder.addCase(fetchGetAllSubCateGory.fulfilled, (state, action) => {
            state.status = 'idle';
            state.subCategory = action.payload.Document || action.payload;
            state.loading = false;
            state.initialized = true;
        });
        builder.addCase(fetchGetAllSubCateGory.rejected, (state) => {
            state.status = 'error';
            state.loading = false;
            state.initialized = true;
        });
        // add
        builder.addCase(fetchAddSubCategory.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAddSubCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            state.subCategory.unshift(action.payload.Document);
        });
        builder.addCase(fetchAddSubCategory.rejected, (state) => {
            state.status = 'error';
        });
        // update
        builder.addCase(fetchUpdateSubCategory.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUpdateSubCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            const { id, data } = action.meta.arg;
            state.subCategory = state.subCategory.map((item) => {
                return item._id === id ? { ...item, ...data } : item;
            });
        });
        builder.addCase(fetchUpdateSubCategory.rejected, (state) => {
            state.status = 'error';
        });

        // delete
        builder.addCase(fetchDeleteSubCategory.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDeleteSubCategory.fulfilled, (state, action) => {
            state.status = 'idle';
            const id = action.meta.arg;
            state.subCategory = state.subCategory.filter((item) => item._id !== id);
        });
        builder.addCase(fetchDeleteSubCategory.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const { searchSubCateByText, searchSubCateByCategoryId } = subCategorySlice.actions;

export default subCategorySlice;
