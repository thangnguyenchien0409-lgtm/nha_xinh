import {
    addToCartApi,
    deleteCartItemApi,
    getAllCartApi,
    updateCartItemApi
} from '@/apis/cartService';
import type { BodyFetchCart, InitialStateCartType } from '@/redux/cartSlice/cart.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateCartType = {
    status: 'idle',
    cart: [],
    cartUser: []
};

export const fetchGetAllCart = createAsyncThunk(
    'cart/fetchGetAllCart',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllCartApi();

            return res.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return [];
            }
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchAddtoCart = createAsyncThunk<any, BodyFetchCart, { rejectValue: string }>(
    'cart/fetchAddtoCart',
    async ({ productId, quantity = 1 }, { rejectWithValue }) => {
        try {
            const res = await addToCartApi(productId!, quantity!);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchDeleteCartItem = createAsyncThunk<any, BodyFetchCart, { rejectValue: string }>(
    'cart/fetchDeleteCartItem',
    async ({ cartItemId }, { rejectWithValue }) => {
        try {
            const res = await deleteCartItemApi(cartItemId!);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUpdateCartItem = createAsyncThunk<any, BodyFetchCart, { rejectValue: string }>(
    'cart/fetchUpdateCartItem',
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            const res = await updateCartItemApi(cartItemId!, quantity!);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetAllCart.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cart = action.payload?.carts?.cartItems || [];
                state.cartUser = action.payload;
            })
            .addCase(fetchGetAllCart.rejected, (state) => {
                state.status = 'error';
                state.cart = [];
            })
            // add
            .addCase(fetchAddtoCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddtoCart.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cart = action.payload?.carts?.cartItems;
            })
            .addCase(fetchAddtoCart.rejected, (state) => {
                state.status = 'error';
            })
            // delete  cart item
            .addCase(fetchDeleteCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteCartItem.fulfilled, (state, action) => {
                state.status = 'idle';
                const { cartItemId } = action.meta.arg;
                state.cart = state.cart.filter((item) => item._id !== cartItemId);
            })
            .addCase(fetchDeleteCartItem.rejected, (state) => {
                state.status = 'error';
            })
            // update cart item
            .addCase(fetchUpdateCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpdateCartItem.fulfilled, (state, action) => {
                state.status = 'idle';
                const updatedItem = action.payload.specifieCart;
                const { cartItemId } = action.meta.arg;
                state.cart = state.cart.map((item) =>
                    item._id === cartItemId ? updatedItem : item
                );
            })
            .addCase(fetchUpdateCartItem.rejected, (state) => {
                state.status = 'error';
            });
    }
});

export const { clearCart } = cartSlice.actions;

export default cartSlice;
