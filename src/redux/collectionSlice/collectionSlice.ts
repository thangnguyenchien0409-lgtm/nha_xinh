import { getAllCollectionApi, getCollectionById } from '@/apis/collectionService';
import type { InitialStateCollectionType } from '@/redux/collectionSlice/collectionSlice.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateCollectionType = {
    status: 'idle',
    collection: [],
    collectionById: []
};
export const fetchGetAllCollection = createAsyncThunk<any, void, { rejectValue: string }>(
    'collection/fetchGetAllCollection',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllCollectionApi();
            return res.data;
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchGetCollectionById = createAsyncThunk<any, string, { rejectValue: string }>(
    'collection/fetchGetCollectionById',
    async (collectionId, { rejectWithValue }) => {
        try {
            const res = await getCollectionById(collectionId);
            return res.data;
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(fetchGetAllCollection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetAllCollection.fulfilled, (state, action) => {
                state.status = 'idle';
                state.collection = action.payload;
            })
            .addCase(fetchGetAllCollection.rejected, (state) => {
                state.status = 'error';
            })
            // get by id
            .addCase(fetchGetCollectionById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetCollectionById.fulfilled, (state, action) => {
                state.status = 'idle';

                state.collectionById = action.payload;
            })
            .addCase(fetchGetCollectionById.rejected, (state) => {
                state.status = 'error';
            });
    }
});

export default collectionSlice;
