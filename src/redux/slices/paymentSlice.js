// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../utils/api';

// // ✅ Apply Coupon
// export const applyCoupon = createAsyncThunk(
//   'payment/applyCoupon',
//   async ({ couponCode, totalAmount }, { rejectWithValue }) => {
//     try {
//       const response = await API.post('/coupon/apply', { couponCode, totalAmount });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Invalid coupon');
//     }
//   }
// );

// // ✅ Create Razorpay Order
// export const createRazorpayOrder = createAsyncThunk(
//   'payment/createRazorpayOrder',
//   async ({ amount, receipt }, { rejectWithValue }) => {
//     try {
//       const response = await API.post('/payment/checkout', { amount, receipt });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to create payment order');
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: 'payment',
//   initialState: {
//     coupon: null,
//     discountAmount: 0,
//     finalAmount: 0,
//     razorpayOrder: null,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     clearCoupon: (state) => {
//       state.coupon = null;
//       state.discountAmount = 0;
//       state.finalAmount = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Apply Coupon
//       .addCase(applyCoupon.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(applyCoupon.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.coupon = action.payload.coupon;
//         state.discountAmount = action.payload.discountAmount || 0;
//         state.finalAmount = action.payload.finalAmount || 0;
//       })
//       .addCase(applyCoupon.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // Create Razorpay Order
//       .addCase(createRazorpayOrder.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createRazorpayOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.razorpayOrder = action.payload.order;
//       })
//       .addCase(createRazorpayOrder.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearCoupon } = paymentSlice.actions;
// export default paymentSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Apply Coupon
export const applyCoupon = createAsyncThunk(
  'payment/applyCoupon',
  async ({ couponCode, totalAmount }, { rejectWithValue }) => {
    try {
      const response = await API.post('/coupon/apply', { code: couponCode, orderAmount: totalAmount });
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

// ✅ Initial State
const initialState = {
  coupon: null,           // Applied coupon object
  discountAmount: 0,      // Discount amount in rupees
  finalAmount: 0,         // Final amount after discount
  razorpayOrder: null,    // Razorpay order object
  isLoading: false,       // Loading state
  error: null,            // Error message
  appliedCoupon: null,    // Alias for coupon (for Cart/Checkout)
  couponLoading: false,   // Separate loading for coupon
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Clear coupon
    clearCoupon: (state) => {
      state.coupon = null;
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
    },
    
    // ✅ Clear applied coupon (for Cart/Checkout)
    clearAppliedCoupon: (state) => {
      state.coupon = null;
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
    },
    
    // ✅ Reset payment state
    resetPayment: (state) => {
      state.coupon = null;
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
      state.razorpayOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Apply Coupon - Pending
      .addCase(applyCoupon.pending, (state) => {
        state.isLoading = true;
        state.couponLoading = true;
        state.error = null;
      })
      // ✅ Apply Coupon - Fulfilled
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.couponLoading = false;
        state.coupon = action.payload.coupon;
        state.appliedCoupon = action.payload.coupon;  // ✅ For Cart/Checkout
        state.discountAmount = action.payload.discountAmount || 0;
        state.finalAmount = action.payload.finalAmount || 0;
      })
      // ✅ Apply Coupon - Rejected
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.couponLoading = false;
        state.error = action.payload;
        state.coupon = null;
        state.appliedCoupon = null;
        state.discountAmount = 0;
      })
      
      // ✅ Create Razorpay Order - Pending
      .addCase(createRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      // ✅ Create Razorpay Order - Fulfilled
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.razorpayOrder = action.payload.order;
      })
      // ✅ Create Razorpay Order - Rejected
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions
export const { clearCoupon, clearAppliedCoupon, resetPayment } = paymentSlice.actions;

// ✅ Selectors - Cart aur Checkout page ke liye
export const selectAppliedCoupon = (state) => state.payment.appliedCoupon || state.payment.coupon;
export const selectCouponDiscount = (state) => state.payment.discountAmount;
export const selectCouponLoading = (state) => state.payment.couponLoading || state.payment.isLoading;
export const selectFinalAmount = (state) => state.payment.finalAmount;
export const selectCouponError = (state) => state.payment.error;

// ✅ Default export
export default paymentSlice.reducer;