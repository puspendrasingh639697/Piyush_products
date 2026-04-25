

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Create Order (Place Order)
export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await API.post('/orders/place', orderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to place order');
        }
    }
);

// ✅ Get My Orders
export const fetchMyOrders = createAsyncThunk(
    'order/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/orders/myorders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// ✅ Get Order Details
export const fetchOrderDetails = createAsyncThunk(
    'order/fetchOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
        }
    }
);

// ✅ Cancel Order
export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await API.put(`/orders/${orderId}/cancel`);
            return { orderId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        currentOrder: null,
        placedOrder: null,        // ✅ New - Success page ke liye
        orderPlaced: false,       // ✅ New - Order placed flag
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
        clearOrderState: (state) => {
            state.success = false;
            state.error = null;
        },
        clearOrderPlaced: (state) => {      // ✅ New - Clear success state
            state.orderPlaced = false;
            state.placedOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Place Order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderPlaced = true;           // ✅ New
                state.placedOrder = action.payload.order;  // ✅ New
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.orderPlaced = false;
                state.placedOrder = null;
            })
            
            // ✅ Fetch My Orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // ✅ Fetch Order Details
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // ✅ Cancel Order
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                
                // Update currentOrder if it's the cancelled one
                if (state.currentOrder && state.currentOrder._id === action.payload.orderId) {
                    state.currentOrder.status = 'Cancelled';
                    state.currentOrder.isCancelled = true;
                }
                
                // Update in orders list
                state.orders = state.orders.map(order =>
                    order._id === action.payload.orderId
                        ? { ...order, status: 'Cancelled', isCancelled: true }
                        : order
                );
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderError, clearOrderState, clearOrderPlaced } = orderSlice.actions;
export default orderSlice.reducer;