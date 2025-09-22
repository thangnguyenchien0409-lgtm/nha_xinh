import {
    addProductApi,
    addReviewApi,
    deleteProductApi,
    getAllProductsApi,
    getProductApi,
    updateProductApi
} from '@/apis/productService';
import type { ApiResponse, FetchParam, InitialStateType } from '@/redux/productSlice/product.type';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
    searchText: '',
    categoryId: '',
    subCategoryId: '',
    roomId: '',
    loading: false
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

export const fetchAddProduct = createAsyncThunk<any, FetchParam, { rejectValue: string }>(
    'product/fetchAddProduct',
    async ({ data }, { rejectWithValue }) => {
        try {
            const res = await addProductApi(data);

            toast.success('Thêm thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUpdateProduct = createAsyncThunk<any, FetchParam, { rejectValue: string }>(
    'product/fetchUpdateProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateProductApi(id!, data);
            toast.success('Sửa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchDeleteProduct = createAsyncThunk<any, string, { rejectValue: string }>(
    'product/fetchDeleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteProductApi(id);
            toast.success('Xóa thành công');
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message);
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
        },
        searchProductByCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        searchProductBySubCategoryId(state, action) {
            state.subCategoryId = action.payload;
        },
        searchProductByRoomId(state, action) {
            state.roomId = action.payload;
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
            state.loading = true;
        });
        builder.addCase(fetchGetAllProductNoLimit.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productNoLimit = action.payload.Document || [];
            state.loading = false;
        });
        builder.addCase(fetchGetAllProductNoLimit.rejected, (state) => {
            state.status = 'error';
            state.loading = false;
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

        // --- ADD ---
        builder.addCase(fetchAddProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAddProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload?.Document) {
                state.productNoLimit.unshift(action.payload.Document);
            }
        });
        builder.addCase(fetchAddProduct.rejected, (state) => {
            state.status = 'error';
        });

        // --- UPDATE ---
        builder.addCase(fetchUpdateProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUpdateProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload?.Document) {
                state.productNoLimit = state.productNoLimit.map((item) =>
                    item._id === action.payload.Document._id ? action.payload.Document : item
                );
            }
        });
        builder.addCase(fetchUpdateProduct.rejected, (state) => {
            state.status = 'error';
        });

        // --- DELETE ---
        builder.addCase(fetchDeleteProduct.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
            state.status = 'idle';
            const id = action.meta.arg;
            state.productNoLimit = state.productNoLimit.filter((item) => item._id !== id);
        });
        builder.addCase(fetchDeleteProduct.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const {
    getNewProduct,
    addViewedProduct,
    filterSelectProduct,
    filterProductByMaterial,
    searchProductByText,
    searchProductByCategoryId,
    searchProductBySubCategoryId,
    searchProductByRoomId
} = productSlice.actions;

export default productSlice;
