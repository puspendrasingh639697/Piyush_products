// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../utils/api';

// // Get Wishlist
// export const fetchWishlist = createAsyncThunk(
//   'wishlist/fetchWishlist',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get('/user/wishlist');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// // Toggle Wishlist (Add/Remove)
// export const toggleWishlist = createAsyncThunk(
//   'wishlist/toggleWishlist',
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await API.post('/user/wishlist', { productId });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.wishlist || [];
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleWishlist.fulfilled, (state, action) => {
//         state.items = action.payload.wishlist || [];
//       });
//   },
// });

// export default wishlistSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async () => {
        const token = localStorage.getItem('token');
        if (!token) return [];
        
        const response = await API.get('/user/wishlist');
        return response.data.wishlist || [];
    }
);

// Toggle wishlist (add/remove)
export const toggleWishlist = createAsyncThunk(
    'wishlist/toggleWishlist',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await API.post('/user/wishlist', { productId });
            return { productId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Toggle wishlist
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                const productId = action.payload.productId;
                const exists = state.items.some(item => item._id === productId);
                
                if (exists) {
                    state.items = state.items.filter(item => item._id !== productId);
                } else {
                    // Add temporary item (will be replaced on next fetch)
                    state.items.push({ _id: productId });
                }
            });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;