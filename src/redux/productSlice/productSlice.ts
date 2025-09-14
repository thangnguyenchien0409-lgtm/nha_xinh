import { getAllProductsApi, getProductApi } from '@/apis/productService';
import type { ApiResponse, FetchParam, InitialStateType } from '@/redux/productSlice/product.type';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialViewed: any[] = (() => {
    try {
        const data = localStorage.getItem('viewedProduct');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
})();

const initialState: InitialStateType = {
    status: 'idle',
    product: [],
    productNoLimit: [],
    productById: {},
    page: 1,
    totalPage: 1,
    newProduct: [],
    viewedProduct: initialViewed,
    filterSelectProduct: '',
    filterMaterial: '',
    searchText: ''
};

export const fetchGetAllProduct = createAsyncThunk<
    ApiResponse,
    FetchParam | void,
    { rejectValue: string }
>('product/fetchGetAllProduct', async ({ page = 1, limit = 16 } = {}, { rejectWithValue }) => {
    try {
        const res = await getAllProductsApi<ApiResponse>(page, limit);
        return res.data as ApiResponse;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

export const fetchGetAllProductNoLimit = createAsyncThunk<
    ApiResponse,
    void,
    { rejectValue: string }
>('product/fetchGetAllProductNoLimit', async (_, { rejectWithValue }) => {
    try {
        const res = await getAllProductsApi<ApiResponse>();
        return res.data as ApiResponse;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Unknown error');
    }
});

export const fetchProductById = createAsyncThunk<any, string, { rejectValue: string }>(
    'product/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProductApi(id);

            return res.data.Document;
        } catch (error: any) {
            console.log(error);

            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getNewProduct(state) {
            state.newProduct = state.product?.slice(-8);
        },
        addViewedProduct(state, action) {
            if (!Array.isArray(state.viewedProduct)) {
                state.viewedProduct = [];
            }

            state.viewedProduct = state.viewedProduct.filter((p) => p._id !== action.payload._id);

            state.viewedProduct.unshift(action.payload);

            state.viewedProduct = state.viewedProduct.slice(0, 4);

            localStorage.setItem('viewedProduct', JSON.stringify(state.viewedProduct));
        },
        filterSelectProduct(state, action: PayloadAction<string | null>) {
            state.filterSelectProduct = action.payload;
        },
        filterProductByMaterial(state, action: PayloadAction<string | null>) {
            state.filterMaterial = action.payload;
        },
        searchProductByText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        // --- GET ALL ---
        builder.addCase(fetchGetAllProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            state.product = action.payload.Document || [];
            state.totalPage = action.payload.paginationResult.numberOfPages;
        });
        builder.addCase(fetchGetAllProduct.rejected, (state) => {
            state.status = 'error';
        });
        builder.addCase(fetchGetAllProductNoLimit.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchGetAllProductNoLimit.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productNoLimit = action.payload.Document || [];
        });
        builder.addCase(fetchGetAllProductNoLimit.rejected, (state) => {
            state.status = 'error';
        });

        // PRODUCT BY ID
        // ---PRODUCT DETAIL---
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productById = action.payload;
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const {
    getNewProduct,
    addViewedProduct,
    filterSelectProduct,
    filterProductByMaterial,
    searchProductByText
} = productSlice.actions;

export default productSlice;
