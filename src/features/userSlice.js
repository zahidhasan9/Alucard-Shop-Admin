
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const extractUser = (payload) => {
  return (
    payload?.data?.user ||
    payload?.user ||
    payload?.data ||
    payload ||
    null
  );
};

const extractMessage = (payload, fallback = 'Success') => {
  return payload?.message || payload?.data?.message || fallback;
};

const initialState = {
  user: null,
  users: [],
  customer: null,
  customerOrders: [],
  customerSummary: null,
  customerStats: null,
  pagination: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      return await API.registerUser(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      return await API.loginUser(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      return await API.logoutUser();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Logout failed'
      );
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  'user/getLoggedInUser',
  async (_, thunkAPI) => {
    try {
      return await API.getLoggedInUser();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'User not logged in'
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      return await API.getAllUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data, thunkAPI) => {
    try {
      return await API.updateProfile(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Profile update failed'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, thunkAPI) => {
    try {
      return await API.changePassword(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Password change failed'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, thunkAPI) => {
    try {
      return await API.forgotPassword(email);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to send reset email'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ id, token, data }, thunkAPI) => {
    try {
      return await API.resetPassword(id, token, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Password reset failed'
      );
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  'user/fetchCustomers',
  async (params, thunkAPI) => {
    try {
      return await API.getCustomers(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch customers'
      );
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  'user/fetchCustomerById',
  async (id, thunkAPI) => {
    try {
      return await API.getCustomerById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch customer details'
      );
    }
  }
);

export const updateCustomerByAdmin = createAsyncThunk(
  'user/updateCustomerByAdmin',
  async ({ id, payload }, thunkAPI) => {
    try {
      return await API.updateCustomerByAdmin(id, payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update customer'
      );
    }
  }
);

export const deleteCustomerByAdmin = createAsyncThunk(
  'user/deleteCustomerByAdmin',
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteCustomerByAdmin(id);
      return { id, ...res };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete customer'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = extractUser(action.payload);
        state.user = user;
        state.isAuthenticated = Boolean(user);

        toast.success(
          extractMessage(action.payload, "Registration successful"),
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        toast.error(action.payload);
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = extractUser(action.payload);
        state.user = user;
        state.isAuthenticated = Boolean(user);

        if (typeof window !== "undefined") {
          const token =
            action.payload?.token ||
            action.payload?.data?.token ||
            action.payload?.accessToken ||
            action.payload?.data?.accessToken;

          if (token) localStorage.setItem("token", token);
        }

        toast.success(extractMessage(action.payload, "Login successful"));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        toast.error(action.payload);
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = null;
        state.isAuthenticated = false;

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }

        toast.success(extractMessage(action.payload, "Logout successful"));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get logged in user
      .addCase(getLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;

        const user = extractUser(action.payload);
        state.user = user;
        state.isAuthenticated = Boolean(user);
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.users =
          action.payload?.users ||
          action.payload?.data?.users ||
          action.payload?.data ||
          action.payload ||
          [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = extractUser(action.payload);
        state.user = user;
        state.isAuthenticated = Boolean(user);

        toast.success(extractMessage(action.payload, "Profile updated"));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(extractMessage(action.payload, "Password changed"));
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(extractMessage(action.payload, "Reset email sent"));
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(
          extractMessage(action.payload, "Password reset successful"),
        );
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.customers || [];
        state.pagination = action.payload?.pagination || null;
        state.customerStats = action.payload?.stats || null;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Fetch single customer
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload?.customer || null;
        state.customerOrders = action.payload?.orders || [];
        state.customerSummary = action.payload?.summary || null;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Update customer
      .addCase(updateCustomerByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedCustomer = action.payload?.customer;

        if (updatedCustomer) {
          state.users = state.users.map((user) =>
            user._id === updatedCustomer._id
              ? { ...user, ...updatedCustomer }
              : user,
          );

          if (state.customer?._id === updatedCustomer._id) {
            state.customer = { ...state.customer, ...updatedCustomer };
          }
        }

        toast.success(
          action.payload?.message || "Customer updated successfully",
        );
      })
      .addCase(updateCustomerByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete / deactivate customer
      .addCase(deleteCustomerByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomerByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.users = state.users.filter(
          (user) => user._id !== action.payload.id,
        );

        toast.success(
          action.payload?.message || "Customer removed successfully",
        );
      })
      .addCase(deleteCustomerByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });


      
  },
});

export const login = loginUser;
export const register = registerUser;
export const logout = logoutUser;
export const fetchLoggedInUser = getLoggedInUser;
export const { clearUserState, clearUserError, setUser } = userSlice.actions;
export default userSlice.reducer;