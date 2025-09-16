import { getAllRoomApi } from '@/apis/roomService';
import type { InitialStateRoomType } from '@/redux/roomSlice/room.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateRoomType = {
    status: 'idle',
    room: []
};

export const fetchGetAllRoom = createAsyncThunk(
    'room/fetchGetAllRoom',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllRoomApi();

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get all
        builder.addCase(fetchGetAllRoom.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllRoom.fulfilled, (state, action) => {
            state.status = 'idle';
            state.room = action.payload.Document;
        });
        builder.addCase(fetchGetAllRoom.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export default roomSlice;
