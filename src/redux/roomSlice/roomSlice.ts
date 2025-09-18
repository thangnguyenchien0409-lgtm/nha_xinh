import { addRoomApi, deleteRoomApi, getAllRoomApi, updateRoomApi } from '@/apis/roomService';
import type { BodyFetchRoomType, InitialStateRoomType } from '@/redux/roomSlice/room.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState: InitialStateRoomType = {
    status: 'idle',
    room: [],
    searchText: ''
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

export const fetchAddRoom = createAsyncThunk<any, BodyFetchRoomType, { rejectValue: string }>(
    'room/fetchAddRoom',
    async (data, { rejectWithValue }) => {
        try {
            const res = await addRoomApi(data);
            toast.success('Thêm thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUpdateRoom = createAsyncThunk<any, BodyFetchRoomType, { rejectValue: string }>(
    'room/fetchUpdateRoom',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateRoomApi(id!, data);
            toast.success('Sửa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchDeleteRoom = createAsyncThunk<any, string, { rejectValue: string }>(
    'room/fetchDeleteRoom',
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteRoomApi(id);
            toast.success('Xóa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        searchRoomByText: (state, action) => {
            state.searchText = action.payload;
        }
    },
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
        // add
        builder.addCase(fetchAddRoom.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAddRoom.fulfilled, (state, action) => {
            state.status = 'idle';
            state.room.unshift(action.payload.Document);
        });
        builder.addCase(fetchAddRoom.rejected, (state) => {
            state.status = 'error';
        });

        // update
        builder.addCase(fetchUpdateRoom.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUpdateRoom.fulfilled, (state, action) => {
            state.status = 'idle';
            const { id, data } = action.meta.arg;
            state.room = state.room.map((item) => (item._id === id ? { ...item, ...data } : item));
        });
        builder.addCase(fetchUpdateRoom.rejected, (state) => {
            state.status = 'error';
        });

        // delete
        builder.addCase(fetchDeleteRoom.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDeleteRoom.fulfilled, (state, action) => {
            state.status = 'idle';
            const id = action.meta.arg;
            state.room = state.room.filter((item) => item._id !== id);
        });
        builder.addCase(fetchDeleteRoom.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const { searchRoomByText } = roomSlice.actions;

export default roomSlice;
