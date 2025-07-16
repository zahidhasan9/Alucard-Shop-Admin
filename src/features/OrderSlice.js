import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
// import toast from 'react-hot-toast';
import { toast } from '@/components/Ui/GlobalToast';

const initialState = {
  order: null,
  orders: [],
  myOrders: [],
  lastOrder: null,
  loading: false,
  error: null,
  total: 0,
  maxLimit: 0,
  maxSkip: 0,
  page: 1,
  success: false
};

// Create Order
export const createOrder = createAsyncThunk('order/create', async (orderData, thunkAPI) => {
  try {
    const res = await API.createOrder(orderData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

// Get My Orders
export const fetchMyOrders = createAsyncThunk('order/fetchMyOrders', async (_, thunkAPI) => {
  try {
    const res = await API.getMyOrders();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});
// Get Last Orders
export const getLastOrder = createAsyncThunk('order/Last-order', async (_, thunkAPI) => {
  try {
    const res = await API.getLastOrder();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

// Get Single Order
export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (orderId, thunkAPI) => {
  try {
    const res = await API.getOrderById(orderId);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

// Pay Order
export const payOrder = createAsyncThunk('order/pay', async ({ orderId, paymentResult }, thunkAPI) => {
  try {
    const res = await API.payOrder(orderId, paymentResult);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Payment failed');
  }
});

// Deliver Order (admin)
export const deliverOrder = createAsyncThunk('order/deliver', async (orderId, thunkAPI) => {
  try {
    const res = await API.deliverOrder(orderId);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delivery update failed');
  }
});

// Get All Orders (admin)
export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async (skip, limit, search, thunkAPI) => {
  try {
    const res = await API.getAllOrders(skip, limit, search);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
  }
});

// Delete Order
export const deleteOrder = createAsyncThunk('order/delete', async (orderId, thunkAPI) => {
  try {
    await API.deleteOrder(orderId);
    return orderId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete order');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
        toast.success('Order created successfully');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Create Order Failed: ${action.payload}`);
      })

      // Get My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      })

      // Get Last Orders
      .addCase(getLastOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(getLastOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Get Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pay Order
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
        toast.success('Payment successful');
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Deliver Order
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
        toast.success('Order delivered');
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.products = state.products.filter((p) => p._id !== action.payload);
        toast.success('Order deleted successfully');
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Fetch All Orders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.maxLimit = action.payload.maxLimit;
        state.maxSkip = action.payload.maxSkip;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
