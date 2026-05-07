// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../utils/api';

// export const fetchCart = createAsyncThunk(
//     'cart/fetchCart',
//     async (userId, { rejectWithValue }) => {
//         // ✅ Agar userId undefined hai toh API call mat karo
//         if (!userId) {
//             return { items: [], totalAmount: 0, totalItems: 0 };
//         }
        
//         try {
//             const response = await API.get(`/cart/${userId}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
//         }
//     }
// );

// // ✅ Add to cart
// export const addToCart = createAsyncThunk(
//     'cart/addToCart',
//     async ({ userId, productId, quantity }, { rejectWithValue }) => {
//         try {
//             const response = await API.post('/cart/add', { userId, productId, quantity });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
//         }
//     }
// );

// // ✅ Update quantity
// export const updateCartQuantity = createAsyncThunk(
//     'cart/updateQuantity',
//     async ({ userId, productId, quantity }, { rejectWithValue }) => {
//         try {
//             const response = await API.put('/cart/update', { userId, productId, quantity });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
//         }
//     }
// );

// // ✅ Remove from cart
// export const removeFromCart = createAsyncThunk(
//     'cart/removeFromCart',
//     async ({ userId, productId }, { rejectWithValue }) => {
//         try {
//             const response = await API.delete(`/cart/remove/${userId}/${productId}`);
//             return { productId, ...response.data };
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
//         }
//     }
// );
// // cartSlice.js mein
// export const clearCart = createAsyncThunk(
//     'cart/clearCart',
//     async (userId, { rejectWithValue }) => {
//         if (!userId) {
//             return { success: true };
//         }
        
//         try {
//             // Clear cart from backend
//             await API.delete(`/cart/clear/${userId}`);
//             return { success: true };
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
//         }
//     }
// );

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: [],
//         cartId: null,
//         totalAmount: 0,
//         totalItems: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         clearCartState: (state) => {
//             state.items = [];
//             state.cartId = null;
//             state.totalAmount = 0;
//             state.totalItems = 0;
//             state.error = null;
//         },
//         updateLocalCart: (state, action) => {
//             state.items = action.payload.items || [];
//             state.totalAmount = action.payload.totalAmount || 0;
//             state.totalItems = action.payload.totalItems || 0;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch cart
//             .addCase(fetchCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.items = action.payload.items || [];
//                 state.cartId = action.payload.cartId;
//                 state.totalAmount = action.payload.totalAmount || 0;
//                 state.totalItems = action.payload.totalItems || 0;
//             })
//             .addCase(fetchCart.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
            
//             // Add to cart
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 // Refetch cart after add
//                 const userId = localStorage.getItem('userId');
//                 if (userId) {
//                     // Will be handled by separate fetch
//                 }
//             })
            
//             // Update quantity
//             .addCase(updateCartQuantity.fulfilled, (state, action) => {
//                 state.loading = false;
//             })
            
//             // Remove from cart
//             .addCase(removeFromCart.fulfilled, (state, action) => {
//                 state.items = state.items.filter(item => item.productId?._id !== action.payload.productId);
//                 state.totalItems = state.items.length;
//                 state.totalAmount = state.items.reduce((sum, item) => sum + (item.productId?.price * item.quantity || 0), 0);
//             });
//     },
// });

// export const { clearCartState, updateLocalCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Helper: Save cart to localStorage
const saveCartToLocalStorage = (state) => {
    try {
        localStorage.setItem('cart', JSON.stringify({
            items: state.items,
            totalAmount: state.totalAmount,
            totalItems: state.totalItems,
            cartId: state.cartId,
            lastUpdated: new Date().toISOString()
        }));
    } catch (err) {
        console.error('Failed to save cart to localStorage:', err);
    }
};

// ✅ Helper: Load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem('cart');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Check if cart is not older than 7 days
            const lastUpdated = new Date(parsed.lastUpdated);
            const now = new Date();
            const daysDiff = (now - lastUpdated) / (1000 * 60 * 60 * 24);
            
            if (daysDiff < 7) {
                return {
                    items: parsed.items || [],
                    totalAmount: parsed.totalAmount || 0,
                    totalItems: parsed.totalItems || 0,
                    cartId: parsed.cartId || null
                };
            }
        }
    } catch (err) {
        console.error('Failed to load cart from localStorage:', err);
    }
    return { items: [], totalAmount: 0, totalItems: 0, cartId: null };
};

// ✅ Fetch cart from backend
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId, { rejectWithValue, getState }) => {
        if (!userId) {
            // Agar userId nahi hai, localStorage se load karo
            const localCart = loadCartFromLocalStorage();
            return localCart;
        }
        
        try {
            const response = await API.get(`/cart/${userId}`);
            const cartData = response.data;
            
            // Save to localStorage after successful fetch
            if (cartData.items) {
                const stateToSave = {
                    items: cartData.items,
                    totalAmount: cartData.totalAmount || 0,
                    totalItems: cartData.totalItems || 0,
                    cartId: cartData.cartId
                };
                localStorage.setItem('cart', JSON.stringify({ ...stateToSave, lastUpdated: new Date().toISOString() }));
            }
            
            return cartData;
        } catch (error) {
            // If API fails, fallback to localStorage
            const localCart = loadCartFromLocalStorage();
            return localCart;
        }
    }
);

// ✅ Add to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ userId, productId, quantity }, { rejectWithValue, dispatch }) => {
        try {
            const response = await API.post('/cart/add', { userId, productId, quantity });
            // After adding, refresh cart
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

// ✅ Update quantity
export const updateCartQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ userId, productId, quantity }, { rejectWithValue, dispatch, getState }) => {
        // Optimistic update: pehle local state update karo
        const currentState = getState().cart;
        const updatedItems = currentState.items.map(item => 
            item.productId?._id === productId || item.productId === productId
                ? { ...item, quantity: quantity }
                : item
        );
        
        const newTotalAmount = updatedItems.reduce((sum, item) => {
            const price = item.productId?.price || item.price || 0;
            return sum + (price * (item.quantity || 1));
        }, 0);
        
        const newTotalItems = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Update localStorage optimistically
        const optimisticState = {
            items: updatedItems,
            totalAmount: newTotalAmount,
            totalItems: newTotalItems,
            cartId: currentState.cartId
        };
        saveCartToLocalStorage(optimisticState);
        
        try {
            const response = await API.put('/cart/update', { userId, productId, quantity });
            // Refresh cart from backend to confirm
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return response.data;
        } catch (error) {
            // If API fails, revert by refetching
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
        }
    }
);

// ✅ Remove from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ userId, productId }, { rejectWithValue, dispatch, getState }) => {
        // Optimistic update
        const currentState = getState().cart;
        const updatedItems = currentState.items.filter(item => 
            (item.productId?._id !== productId && item.productId !== productId)
        );
        
        const newTotalAmount = updatedItems.reduce((sum, item) => {
            const price = item.productId?.price || item.price || 0;
            return sum + (price * (item.quantity || 1));
        }, 0);
        
        const newTotalItems = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Update localStorage optimistically
        const optimisticState = {
            items: updatedItems,
            totalAmount: newTotalAmount,
            totalItems: newTotalItems,
            cartId: currentState.cartId
        };
        saveCartToLocalStorage(optimisticState);
        
        try {
            const response = await API.delete(`/cart/remove/${userId}/${productId}`);
            // Refresh cart from backend to confirm
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return { productId, ...response.data };
        } catch (error) {
            // If API fails, revert by refetching
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
        }
    }
);

// ✅ Clear cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (userId, { rejectWithValue, dispatch }) => {
        // Optimistic clear
        saveCartToLocalStorage({ items: [], totalAmount: 0, totalItems: 0, cartId: null });
        
        if (!userId) {
            return { success: true };
        }
        
        try {
            await API.delete(`/cart/clear/${userId}`);
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return { success: true };
        } catch (error) {
            // If API fails, revert by refetching
            if (userId) {
                await dispatch(fetchCart(userId));
            }
            return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
        }
    }
);

// ✅ Sync local cart with backend (for guest users)
export const syncCart = createAsyncThunk(
    'cart/syncCart',
    async (userId, { rejectWithValue, getState }) => {
        if (!userId) return { success: true };
        
        const localCart = loadCartFromLocalStorage();
        if (localCart.items.length === 0) return { success: true };
        
        try {
            // Sync local cart items to backend
            for (const item of localCart.items) {
                const productId = item.productId?._id || item.productId;
                if (productId) {
                    await API.post('/cart/add', { 
                        userId, 
                        productId, 
                        quantity: item.quantity || 1 
                    });
                }
            }
            // Clear local cart after sync
            localStorage.removeItem('cart');
            return { success: true };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to sync cart');
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
            saveCartToLocalStorage(state);
        },
        updateLocalCart: (state, action) => {
            state.items = action.payload.items || [];
            state.totalAmount = action.payload.totalAmount || 0;
            state.totalItems = action.payload.totalItems || 0;
            state.cartId = action.payload.cartId || null;
            saveCartToLocalStorage(state);
        },
        // ✅ For optimistic updates from components
        optimisticUpdateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => 
                (item.productId?._id === productId || item.productId === productId)
            );
            if (item) {
                item.quantity = quantity;
                state.totalAmount = state.items.reduce((sum, i) => {
                    const price = i.productId?.price || i.price || 0;
                    return sum + (price * (i.quantity || 1));
                }, 0);
                state.totalItems = state.items.reduce((sum, i) => sum + (i.quantity || 1), 0);
                saveCartToLocalStorage(state);
            }
        },
        optimisticRemoveItem: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => 
                (item.productId?._id !== productId && item.productId !== productId)
            );
            state.totalAmount = state.items.reduce((sum, i) => {
                const price = i.productId?.price || i.price || 0;
                return sum + (price * (i.quantity || 1));
            }, 0);
            state.totalItems = state.items.reduce((sum, i) => sum + (i.quantity || 1), 0);
            saveCartToLocalStorage(state);
        }
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
                state.cartId = action.payload.cartId || null;
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
                // Save to localStorage after successful fetch
                saveCartToLocalStorage(state);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Fallback to localStorage on error
                const localCart = loadCartFromLocalStorage();
                state.items = localCart.items;
                state.totalAmount = localCart.totalAmount;
                state.totalItems = localCart.totalItems;
                state.cartId = localCart.cartId;
            })
            
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.loading = false;
                // Cart will be updated via fetchCart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Clear cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.cartId = null;
                state.totalAmount = 0;
                state.totalItems = 0;
                saveCartToLocalStorage(state);
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Sync cart
            .addCase(syncCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(syncCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(syncCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { 
    clearCartState, 
    updateLocalCart, 
    optimisticUpdateQuantity, 
    optimisticRemoveItem 
} = cartSlice.actions;

export default cartSlice.reducer;