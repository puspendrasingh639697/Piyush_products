// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../utils/api';

// // ✅ Async thunks for API calls
// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await API.get(`/cart/${userId}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async ({ userId, productId, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await API.post('/cart/add', { userId, productId, quantity });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// export const updateCartQuantity = createAsyncThunk(
//   'cart/updateQuantity',
//   async ({ userId, productId, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await API.put('/cart/update', { userId, productId, quantity });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async ({ userId, productId }, { rejectWithValue }) => {
//     try {
//       const response = await API.delete(`/cart/remove/${userId}/${productId}`);
//       return { productId, ...response.data };
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     totalAmount: 0,
//     totalItems: 0,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalItems = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart
//       .addCase(fetchCart.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload.items || [];
//         state.totalAmount = action.payload.totalAmount || 0;
//         state.totalItems = action.payload.totalItems || 0;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // Add to Cart
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items = action.payload.cart?.items || [];
//         state.totalAmount = action.payload.cart?.totalAmount || 0;
//       })
//       // Update Quantity
//       .addCase(updateCartQuantity.fulfilled, (state, action) => {
//         state.items = action.payload.cart?.items || [];
//         state.totalAmount = action.payload.cart?.totalAmount || 0;
//       })
//       // Remove from Cart
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.productId !== action.payload.productId);
//         state.totalAmount = state.items.reduce((sum, item) => 
//           sum + (item.productId?.price || 0) * item.quantity, 0
//         );
//         state.totalItems = state.items.length;
//       });
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Fetch cart from backend
// cartSlice.js mein fetchCart function mein
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId, { rejectWithValue }) => {
        // ✅ Agar userId undefined hai toh API call mat karo
        if (!userId) {
            return { items: [], totalAmount: 0, totalItems: 0 };
        }
        
        try {
            const response = await API.get(`/cart/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

// ✅ Add to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await API.post('/cart/add', { userId, productId, quantity });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

// ✅ Update quantity
export const updateCartQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await API.put('/cart/update', { userId, productId, quantity });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
        }
    }
);

// ✅ Remove from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/cart/remove/${userId}/${productId}`);
            return { productId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
        }
    }
);
// cartSlice.js mein
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (userId, { rejectWithValue }) => {
        if (!userId) {
            return { success: true };
        }
        
        try {
            // Clear cart from backend
            await API.delete(`/cart/clear/${userId}`);
            return { success: true };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        cartId: null,
        totalAmount: 0,
        totalItems: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearCartState: (state) => {
            state.items = [];
            state.cartId = null;
            state.totalAmount = 0;
            state.totalItems = 0;
            state.error = null;
        },
        updateLocalCart: (state, action) => {
            state.items = action.payload.items || [];
            state.totalAmount = action.payload.totalAmount || 0;
            state.totalItems = action.payload.totalItems || 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.cartId = action.payload.cartId;
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                // Refetch cart after add
                const userId = localStorage.getItem('userId');
                if (userId) {
                    // Will be handled by separate fetch
                }
            })
            
            // Update quantity
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
            })
            
            // Remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.productId?._id !== action.payload.productId);
                state.totalItems = state.items.length;
                state.totalAmount = state.items.reduce((sum, item) => sum + (item.productId?.price * item.quantity || 0), 0);
            });
    },
});

export const { clearCartState, updateLocalCart } = cartSlice.actions;
export default cartSlice.reducer;