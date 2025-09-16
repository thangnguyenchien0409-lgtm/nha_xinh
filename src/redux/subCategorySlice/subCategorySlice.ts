import { getAllSubCategoryAPI } from '@/apis/subCategoryService';
import type { InitialStateSubCateType } from '@/redux/subCategorySlice/subCategory.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateSubCateType = {
    status: 'idle',
    subCategory: []
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

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get all
        builder.addCase(fetchGetAllSubCateGory.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllSubCateGory.fulfilled, (state, action) => {
            state.status = 'idle';
            state.subCategory = action.payload.Document || action.payload;
        });
        builder.addCase(fetchGetAllSubCateGory.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export default subCategorySlice;
