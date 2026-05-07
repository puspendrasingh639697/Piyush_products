// // // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // // import API from '../../utils/api';

// // // // Get Wishlist
// // // export const fetchWishlist = createAsyncThunk(
// // //   'wishlist/fetchWishlist',
// // //   async (_, { rejectWithValue }) => {
// // //     try {
// // //       const response = await API.get('/user/wishlist');
// // //       return response.data;
// // //     } catch (err) {
// // //       return rejectWithValue(err.response?.data?.message);
// // //     }
// // //   }
// // // );

// // // // Toggle Wishlist (Add/Remove)
// // // export const toggleWishlist = createAsyncThunk(
// // //   'wishlist/toggleWishlist',
// // //   async (productId, { rejectWithValue }) => {
// // //     try {
// // //       const response = await API.post('/user/wishlist', { productId });
// // //       return response.data;
// // //     } catch (err) {
// // //       return rejectWithValue(err.response?.data?.message);
// // //     }
// // //   }
// // // );

// // // const wishlistSlice = createSlice({
// // //   name: 'wishlist',
// // //   initialState: {
// // //     items: [],
// // //     loading: false,
// // //     error: null,
// // //   },
// // //   reducers: {},
// // //   extraReducers: (builder) => {
// // //     builder
// // //       .addCase(fetchWishlist.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(fetchWishlist.fulfilled, (state, action) => {
// // //         state.loading = false;
// // //         state.items = action.payload.wishlist || [];
// // //       })
// // //       .addCase(fetchWishlist.rejected, (state, action) => {
// // //         state.loading = false;
// // //         state.error = action.payload;
// // //       })
// // //       .addCase(toggleWishlist.fulfilled, (state, action) => {
// // //         state.items = action.payload.wishlist || [];
// // //       });
// // //   },
// // // });

// // // export default wishlistSlice.reducer;

// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import API from '../../utils/api';

// // // Fetch wishlist
// // export const fetchWishlist = createAsyncThunk(
// //     'wishlist/fetchWishlist',
// //     async () => {
// //         const token = localStorage.getItem('token');
// //         if (!token) return [];
        
// //         const response = await API.get('/user/wishlist');
// //         return response.data.wishlist || [];
// //     }
// // );

// // // Toggle wishlist (add/remove)
// // export const toggleWishlist = createAsyncThunk(
// //     'wishlist/toggleWishlist',
// //     async (productId, { rejectWithValue }) => {
// //         try {
// //             const response = await API.post('/user/wishlist', { productId });
// //             return { productId, message: response.data.message };
// //         } catch (error) {
// //             return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
// //         }
// //     }
// // );

// // const wishlistSlice = createSlice({
// //     name: 'wishlist',
// //     initialState: {
// //         items: [],
// //         loading: false,
// //         error: null,
// //     },
// //     reducers: {
// //         clearWishlist: (state) => {
// //             state.items = [];
// //         },
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             // Fetch wishlist
// //             .addCase(fetchWishlist.pending, (state) => {
// //                 state.loading = true;
// //                 state.error = null;
// //             })
// //             .addCase(fetchWishlist.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.items = action.payload;
// //             })
// //             .addCase(fetchWishlist.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.error.message;
// //             })
// //             // Toggle wishlist
// //             .addCase(toggleWishlist.fulfilled, (state, action) => {
// //                 const productId = action.payload.productId;
// //                 const exists = state.items.some(item => item._id === productId);
                
// //                 if (exists) {
// //                     state.items = state.items.filter(item => item._id !== productId);
// //                 } else {
// //                     // Add temporary item (will be replaced on next fetch)
// //                     state.items.push({ _id: productId });
// //                 }
// //             });
// //     },
// // });

// // export const { clearWishlist } = wishlistSlice.actions;
// // export default wishlistSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../utils/api';

// // ✅ Helper: Save wishlist to localStorage (for guests)
// const saveWishlistToLocalStorage = (items) => {
//     try {
//         localStorage.setItem('wishlist', JSON.stringify(items.map(item => item._id || item)));
//     } catch (err) {
//         console.error('Failed to save wishlist to localStorage:', err);
//     }
// };

// // ✅ Helper: Load wishlist from localStorage
// const loadWishlistFromLocalStorage = () => {
//     try {
//         const saved = localStorage.getItem('wishlist');
//         if (saved) {
//             const ids = JSON.parse(saved);
//             return ids.map(id => ({ _id: id }));
//         }
//     } catch (err) {
//         console.error('Failed to load wishlist from localStorage:', err);
//     }
//     return [];
// };

// // ✅ Fetch wishlist (with localStorage fallback)
// export const fetchWishlist = createAsyncThunk(
//     'wishlist/fetchWishlist',
//     async (_, { rejectWithValue }) => {
//         const token = localStorage.getItem('token');
        
//         // If not logged in, return localStorage wishlist
//         if (!token) {
//             return loadWishlistFromLocalStorage();
//         }
        
//         try {
//             const response = await API.get('/user/wishlist');
//             const wishlist = response.data.wishlist || [];
//             // Save to localStorage as backup
//             saveWishlistToLocalStorage(wishlist);
//             return wishlist;
//         } catch (error) {
//             // Fallback to localStorage if API fails
//             const localWishlist = loadWishlistFromLocalStorage();
//             return localWishlist;
//         }
//     }
// );

// // ✅ Toggle wishlist (Add/Remove) with optimistic update
// export const toggleWishlist = createAsyncThunk(
//     'wishlist/toggleWishlist',
//     async (productId, { rejectWithValue, getState, dispatch }) => {
//         const token = localStorage.getItem('token');
//         const { items } = getState().wishlist;
        
//         // Optimistic update: check if already exists
//         const exists = items.some(item => (item._id === productId || item === productId));
        
//         // If not logged in, just update localStorage
//         if (!token) {
//             let localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//             if (exists) {
//                 localWishlist = localWishlist.filter(id => id !== productId);
//             } else {
//                 localWishlist.push(productId);
//             }
//             localStorage.setItem('wishlist', JSON.stringify(localWishlist));
//             return { productId, action: exists ? 'removed' : 'added', localOnly: true };
//         }
        
//         try {
//             const response = await API.post('/user/wishlist', { productId });
//             // Refresh wishlist after toggle to ensure consistency
//             await dispatch(fetchWishlist());
//             return { productId, action: exists ? 'removed' : 'added', message: response.data.message };
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
//         }
//     }
// );

// // ✅ Sync wishlist after login (merge local wishlist with backend)
// export const syncWishlistAfterLogin = createAsyncThunk(
//     'wishlist/syncWishlistAfterLogin',
//     async (_, { rejectWithValue, dispatch }) => {
//         try {
//             // Get local wishlist
//             const localWishlist = loadWishlistFromLocalStorage();
            
//             if (localWishlist.length > 0) {
//                 // Sync each item to backend
//                 for (const item of localWishlist) {
//                     await API.post('/user/wishlist', { productId: item._id });
//                 }
//                 // Clear local wishlist after sync
//                 localStorage.removeItem('wishlist');
//             }
            
//             // Fetch fresh wishlist from backend
//             await dispatch(fetchWishlist());
            
//             return { success: true };
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to sync wishlist');
//         }
//     }
// );

// const wishlistSlice = createSlice({
//     name: 'wishlist',
//     initialState: {
//         items: [],
//         loading: false,
//         error: null,
//         synced: false,
//     },
//     reducers: {
//         clearWishlist: (state) => {
//             state.items = [];
//             localStorage.removeItem('wishlist');
//         },
//         clearWishlistError: (state) => {
//             state.error = null;
//         },
//         // ✅ Optimistic toggle for immediate UI update
//         optimisticToggleWishlist: (state, action) => {
//             const productId = action.payload;
//             const exists = state.items.some(item => (item._id === productId || item === productId));
            
//             if (exists) {
//                 state.items = state.items.filter(item => (item._id !== productId && item !== productId));
//             } else {
//                 state.items.push({ _id: productId });
//             }
            
//             // Save to localStorage for guest users
//             saveWishlistToLocalStorage(state.items);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch wishlist
//             .addCase(fetchWishlist.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchWishlist.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.items = action.payload;
//                 state.synced = true;
//                 // Save to localStorage as backup
//                 saveWishlistToLocalStorage(state.items);
//             })
//             .addCase(fetchWishlist.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || action.error?.message;
//                 // Fallback to localStorage
//                 const localItems = loadWishlistFromLocalStorage();
//                 state.items = localItems;
//             })
            
//             // Toggle wishlist
//             .addCase(toggleWishlist.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(toggleWishlist.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // If local only update, already handled by optimistic toggle
//                 if (!action.payload?.localOnly) {
//                     // Wishlist is already refreshed via fetchWishlist in the thunk
//                 }
//             })
//             .addCase(toggleWishlist.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Failed to update wishlist';
//             })
            
//             // Sync wishlist after login
//             .addCase(syncWishlistAfterLogin.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(syncWishlistAfterLogin.fulfilled, (state) => {
//                 state.loading = false;
//                 state.synced = true;
//             })
//             .addCase(syncWishlistAfterLogin.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { clearWishlist, clearWishlistError, optimisticToggleWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Helper: Save wishlist to localStorage (for guests)
const saveWishlistToLocalStorage = (items) => {
    try {
        localStorage.setItem('wishlist', JSON.stringify(items.map(item => item._id || item)));
    } catch (err) {
        console.error('Failed to save wishlist to localStorage:', err);
    }
};

// ✅ Helper: Load wishlist from localStorage
const loadWishlistFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            const ids = JSON.parse(saved);
            return ids.map(id => ({ _id: id }));
        }
    } catch (err) {
        console.error('Failed to load wishlist from localStorage:', err);
    }
    return [];
};

// ✅ Fetch wishlist
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            return loadWishlistFromLocalStorage();
        }
        
        try {
            const response = await API.get('/user/wishlist');  // ✅ Correct
            const wishlist = response.data.wishlist || [];
            saveWishlistToLocalStorage(wishlist);
            return wishlist;
        } catch (error) {
            const localWishlist = loadWishlistFromLocalStorage();
            return localWishlist;
        }
    }
);

// ✅ Toggle wishlist - FIXED URL
export const toggleWishlist = createAsyncThunk(
    'wishlist/toggleWishlist',
    async (productId, { rejectWithValue, getState, dispatch }) => {
        const token = localStorage.getItem('token');
        const { items } = getState().wishlist;
        const exists = items.some(item => (item._id === productId || item === productId));
        
        // If not logged in, just update localStorage
        if (!token) {
            let localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (exists) {
                localWishlist = localWishlist.filter(id => id !== productId);
            } else {
                localWishlist.push(productId);
            }
            localStorage.setItem('wishlist', JSON.stringify(localWishlist));
            return { productId, action: exists ? 'removed' : 'added', localOnly: true };
        }
        
        try {
            // ✅ FIXED: Changed from '/user/wishlist' to '/user/wishlist/toggle'
            const response = await API.post('/user/wishlist/toggle', { productId });
            await dispatch(fetchWishlist());
            return { productId, action: exists ? 'removed' : 'added', message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update wishlist');
        }
    }
);

// ✅ Sync wishlist after login
export const syncWishlistAfterLogin = createAsyncThunk(
    'wishlist/syncWishlistAfterLogin',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const localWishlist = loadWishlistFromLocalStorage();
            
            if (localWishlist.length > 0) {
                for (const item of localWishlist) {
                    await API.post('/user/wishlist/toggle', { productId: item._id });
                }
                localStorage.removeItem('wishlist');
            }
            
            await dispatch(fetchWishlist());
            return { success: true };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to sync wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        loading: false,
        error: null,
        synced: false,
    },
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem('wishlist');
        },
        clearWishlistError: (state) => {
            state.error = null;
        },
        optimisticToggleWishlist: (state, action) => {
            const productId = action.payload;
            const exists = state.items.some(item => (item._id === productId || item === productId));
            
            if (exists) {
                state.items = state.items.filter(item => (item._id !== productId && item !== productId));
            } else {
                state.items.push({ _id: productId });
            }
            saveWishlistToLocalStorage(state.items);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.synced = true;
                saveWishlistToLocalStorage(state.items);
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message;
                const localItems = loadWishlistFromLocalStorage();
                state.items = localItems;
            })
            .addCase(toggleWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(toggleWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update wishlist';
            })
            .addCase(syncWishlistAfterLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(syncWishlistAfterLogin.fulfilled, (state) => {
                state.loading = false;
                state.synced = true;
            })
            .addCase(syncWishlistAfterLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWishlist, clearWishlistError, optimisticToggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;