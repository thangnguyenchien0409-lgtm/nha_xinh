import {
    cancelOrderApi,
    createCheckoutSessionApi,
    createOrderApi,
    getAllOrdersApi
} from '@/apis/orderService';
import type {
    BodyFetchOrderType,
    InitialStateOrderType,
    StripeCheckoutSession
} from '@/redux/orderSlice/order.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const initialState: InitialStateOrderType = {
    status: 'idle',
    order: null,
    allOrder: [],
    isStatusOrder: false,
    session: null
};

export const fetchCreateOrder = createAsyncThunk<any, BodyFetchOrderType, { rejectValue: string }>(
    'order/fetchCreateOrder',
    async ({ cartId, data }, { rejectWithValue }) => {
        try {
            const res = await createOrderApi(cartId!, data!);
            console.log(res.data);

            toast.success('Đặt hàng thành công');
            return res.data;
        } catch (error: any) {
            console.log(error);

            toast.error(error.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCreateCheckoutSession = createAsyncThunk<
    { session: StripeCheckoutSession }, // return type
    BodyFetchOrderType, // argument type
    { rejectValue: string }
>('order/fetchCreateCheckoutSession', async ({ cartId, data }, { rejectWithValue }) => {
    try {
        const res = await createCheckoutSessionApi(cartId!, data!);

        // Trả về session, không redirect ở đây
        return { session: res.data.session };
    } catch (error: any) {
        console.error('Checkout session error:', error);
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchGetAllOrder = createAsyncThunk<any, BodyFetchOrderType, { rejectValue: string }>(
    'order/fetchGetAllOrder',
    async ({ page = 1, limit = 5 } = {}, { rejectWithValue }) => {
        try {
            const res = await getAllOrdersApi(page, limit);
            return res.data;
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCancelledOrder = createAsyncThunk<
    any,
    BodyFetchOrderType,
    { rejectValue: string }
>('order/fetchCancelledOrder', async ({ orderId } = {}, { rejectWithValue }) => {
    try {
        const res = await cancelOrderApi(orderId!);
        toast.success('Hủy đơn hàng thành công');
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            // get all order
            .addCase(fetchGetAllOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetAllOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.allOrder = action.payload;
                state.isStatusOrder = false;
            })
            .addCase(fetchGetAllOrder.rejected, (state) => {
                state.status = 'error';
            })
            // create order
            .addCase(fetchCreateOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.order = action.payload.order;
            })
            .addCase(fetchCreateOrder.rejected, (state) => {
                state.status = 'error';
            })
            // create checkout session (Stripe)
            .addCase(fetchCreateCheckoutSession.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateCheckoutSession.fulfilled, (state, action) => {
                state.status = 'success';
                state.session = action.payload.session;
            })
            .addCase(fetchCreateCheckoutSession.rejected, (state) => {
                state.status = 'error';
            })
            // cancel order
            .addCase(fetchCancelledOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCancelledOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.order = action.payload.order;
                state.isStatusOrder = true;
            })
            .addCase(fetchCancelledOrder.rejected, (state) => {
                state.status = 'error';
            });
    }
});

export const { resetStatus } = orderSlice.actions;

export default orderSlice;
