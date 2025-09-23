import { getAllInspireApi } from '@/apis/inspireService';
import type { InitialStateInspireType } from '@/redux/inSpireSlice/inSpireSlice.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateInspireType = {
    status: 'idle',
    inspire: []
};
export const fetchGetAllInspire = createAsyncThunk<any, void, { rejectValue: string }>(
    'inspire/fetchGetAllInspire',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllInspireApi();
            return res.data;
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const inSpireSlice = createSlice({
    name: 'inspire',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all order
            .addCase(fetchGetAllInspire.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetAllInspire.fulfilled, (state, action) => {
                state.status = 'idle';
                state.inspire = action.payload;
            })
            .addCase(fetchGetAllInspire.rejected, (state) => {
                state.status = 'error';
            });
    }
});

export default inSpireSlice;
