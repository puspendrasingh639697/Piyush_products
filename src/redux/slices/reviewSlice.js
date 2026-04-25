import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Add Review
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/products/${productId}/reviews`, { rating, comment });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add review');
    }
  }
);

// ✅ Get Product Reviews
export const getProductReviews = createAsyncThunk(
  'reviews/getProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Reviews
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.reviews || [];
        state.averageRating = action.payload.averageRating || 0;
        state.totalReviews = action.payload.totalReviews || 0;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;