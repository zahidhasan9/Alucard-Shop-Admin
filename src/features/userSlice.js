// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// // import toast from 'react-hot-toast'; // make sure to import it
// import { toast } from '@/components/Ui/GlobalToast';

// const initialState = {
//   user: null,
//   users: [],
//   loading: true,
//   error: null,
//   success: false,
//   isAuthenticated: false
//   // token: localStorage.getItem('token') || null
//   // isAuthenticated: !!localStorage.getItem('token')
// };

// // // Async Thunks
// // export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
// //   try {
// //     const res = await API.registerUser(data);
// //     return res.data;
// //   } catch (err) {
// //     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
// //   }
// // });

// export const register = createAsyncThunk('user/register', async (data, thunkAPI) => {
//   try {
//     const res = await API.registerUser(data);
//     return { user: res.data, token: res.data.token };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
//   try {
//     const res = await API.loginUser(data);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
//   try {
//     const res = await API.logoutUser();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
//   }
// });

// export const updateProfile = createAsyncThunk('user/updateProfile', async (data, thunkAPI) => {
//   try {
//     const res = await API.updateProfile(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const forgotPassword = createAsyncThunk('user/forgotPassword', async (data, thunkAPI) => {
//   try {
//     const res = await API.forgotPassword(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const resetPassword = createAsyncThunk('user/resetPassword', async ({ data, id, token }, thunkAPI) => {
//   try {
//     const res = await API.resetPassword(id, token, data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Profile update failed');
//   }
// });

// export const changePassword = createAsyncThunk('user/changePassword', async (data, thunkAPI) => {
//   try {
//     console.log('pass', data);
//     const res = await API.changePassword(data);
//     return res.data;
//   } catch (err) {
//     console.log('error', err);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Password update failed');
//   }
// });

// export const fetchLoggedInUser = createAsyncThunk('/me', async (_, thunkAPI) => {
//   try {
//     const res = await API.getLoggedInUser();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
//   }
// });

// // Slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     //   logout(state) {
//     //     state.user = null;
//     //     state.token = null;
//     //     state.isAuthenticated = false;
//     //     localStorage.removeItem('token');
//     //     toast.info('Logged out'); // toast info on logout
//     //   },
//     clearState(state) {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder

//       // LOGIN
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.success = true;
//         state.isAuthenticated = true;
//         localStorage.setItem('token', action.payload.token); // <-- Save token
//         toast.success('Login successful'); // success toast on login
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         state.isAuthenticated = false;
//         toast.error(`Login failed: ${action.payload}`); // error toast on login failure
//       })

//       // REGISTER
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         // state.user = action.payload.user;
//         // state.token = action.payload.token;
//         state.success = true;
//         // state.isAuthenticated = true;
//         toast.success('Registration successful'); // success toast on register
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         state.isAuthenticated = false;
//         toast.error(`Registration failed: ${action.payload}`); // error toast on registration failure
//       })

//       // UPDATE USER PROFILE
//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Profile updated successfully');
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // FORGOT USER PASSWORD
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.forgotPasswordError = null;
//         state.success = false;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Email send successfully');
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.forgotPasswordError = action.payload;
//         state.success = false;
//         // toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // RESET USER PASSWORD
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.resetPasswordError = null;
//         state.success = false;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('New password set successfully');
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.resetPasswordError = action.payload;
//         state.success = false;
//         //   toast.error(`Profile update failed: ${action.payload}`);
//       })

//       // UPDATE/CHANGE  USER PASSWORD
//       .addCase(changePassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(changePassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success('Password updated successfully');
//       })
//       .addCase(changePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//         toast.error(`Password update failed: ${action.payload}`);
//       })

//       // FETCH LOGGED-IN USER
//       .addCase(fetchLoggedInUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//       })
//       .addCase(fetchLoggedInUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })

//       // logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//         state.loading = false;
//         localStorage.removeItem('token');
//         toast.success('Logged out successfully');
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(`Logout failed: ${action.payload}`);
//       });
//   }
// });

// export const { logout, clearState } = userSlice.actions;
// export default userSlice.reducer;




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

        toast.success(extractMessage(action.payload, 'Registration successful'));
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

        if (typeof window !== 'undefined') {
          const token =
            action.payload?.token ||
            action.payload?.data?.token ||
            action.payload?.accessToken ||
            action.payload?.data?.accessToken;

          if (token) localStorage.setItem('token', token);
        }

        toast.success(extractMessage(action.payload, 'Login successful'));
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

        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        toast.success(extractMessage(action.payload, 'Logout successful'));
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

        toast.success(extractMessage(action.payload, 'Profile updated'));
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
        toast.success(extractMessage(action.payload, 'Password changed'));
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
        toast.success(extractMessage(action.payload, 'Reset email sent'));
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
        toast.success(extractMessage(action.payload, 'Password reset successful'));
      })
      .addCase(resetPassword.rejected, (state, action) => {
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