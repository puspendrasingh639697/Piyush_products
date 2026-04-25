import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Apply Coupon
export const applyCoupon = createAsyncThunk(
  'payment/applyCoupon',
  async ({ couponCode, totalAmount }, { rejectWithValue }) => {
    try {
      const response = await API.post('/coupon/apply', { couponCode, totalAmount });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Invalid coupon');
    }
  }
);

// ✅ Create Razorpay Order
export const createRazorpayOrder = createAsyncThunk(
  'payment/createRazorpayOrder',
  async ({ amount, receipt }, { rejectWithValue }) => {
    try {
      const response = await API.post('/payment/checkout', { amount, receipt });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create payment order');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    coupon: null,
    discountAmount: 0,
    finalAmount: 0,
    razorpayOrder: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload.coupon;
        state.discountAmount = action.payload.discountAmount || 0;
        state.finalAmount = action.payload.finalAmount || 0;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Razorpay Order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.razorpayOrder = action.payload.order;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCoupon } = paymentSlice.actions;
export default paymentSlice.reducer;