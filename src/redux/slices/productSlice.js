import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// Fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ keyword, category, sort } = {}) => {
        let url = '/products/all';
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category && category !== 'All') params.append('category', category);
        if (sort) params.append('sort', sort);
        if (params.toString()) url += `?${params.toString()}`;
        
        const response = await API.get(url);
        return response.data;
    }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
        const response = await API.get(`/products/${id}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        currentProduct: null,
        loading: false,
        error: null,
        totalProducts: 0,
    },
    reducers: {
        clearProducts: (state) => {
            state.items = [];
            state.currentProduct = null;
            state.error = null;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload) ? action.payload : action.payload.products || [];
                state.totalProducts = state.items.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch single product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearProducts, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;