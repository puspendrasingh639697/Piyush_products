import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Fetch Content by Type
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (contentType, { rejectWithValue }) => {
    try {
      const response = await API.get(`/content/${contentType}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch content');
    }
  }
);

// ✅ Update Content
export const updateContent = createAsyncThunk(
  'content/updateContent',
  async ({ contentType, title, body }, { rejectWithValue }) => {
    try {
      const response = await API.put('/content/update', { type: contentType, title, body });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    about: null,
    terms: null,
    privacy: null,
    contact: null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearContentState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Content
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        const { type, content } = action.payload;
        if (type === 'about') state.about = content;
        if (type === 'terms') state.terms = content;
        if (type === 'privacy') state.privacy = content;
        if (type === 'contact') state.contact = content;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Content
      .addCase(updateContent.pending, (state) => {
        state.isLoading = true;
        state.success = false;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        const { type, content } = action.payload;
        if (type === 'about') state.about = content;
        if (type === 'terms') state.terms = content;
        if (type === 'privacy') state.privacy = content;
        if (type === 'contact') state.contact = content;
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContentState } = contentSlice.actions;
export default contentSlice.reducer;