// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userInfo: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.userInfo = action.payload;
//       state.isAuthenticated = !!action.payload;
//     },
//     logout: (state) => {
//       state.userInfo = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     },
//   },
// });

// export const { setUser, logout } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

// ✅ Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/user/profile');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Fetch Addresses
export const fetchAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/user/address');
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.addresses) {
        return response.data.addresses;
      }
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Add Address
export const addAddress = createAsyncThunk(
  'user/addAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await API.post('/user/address', addressData);
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.addresses) {
        return response.data.addresses;
      }
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Update Address
export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/user/address/${id}`, addressData);
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.addresses) {
        return response.data.addresses;
      }
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Delete Address
export const deleteAddress = createAsyncThunk(
  'user/deleteAddress',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/user/address/${id}`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.addresses) {
        return response.data.addresses;
      }
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('user') || '{}'),
    addresses: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.addresses = [];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add Address
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload || [];
      })
      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload || [];
      })
      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload || [];
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;