import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
// import toast from 'react-hot-toast';
import { toast } from '@/components/Ui/GlobalToast';

const initialState = {
  Brands: [],
  Brand: null,
  loading: false,
  error: null,
  success: false
};

// Create Brand
export const createBrand = createAsyncThunk('Brand/create', async (data, thunkAPI) => {
  try {
    const res = await API.createBrand(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create Brand');
  }
});

// Get All Brands
export const getAllBrands = createAsyncThunk('Brand/getAll', async (_, thunkAPI) => {
  try {
    const res = await API.getAllBrands();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch Brands');
  }
});

// Get Brand by ID
export const getBrand = createAsyncThunk('Brand/get', async (id, thunkAPI) => {
  try {
    const res = await API.getBrand(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch Brand');
  }
});

// Update Brand
export const updateBrand = createAsyncThunk('Brand/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await API.updateBrand(id, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update Brand');
  }
});

// Delete Brand
export const deleteBrand = createAsyncThunk('Brand/delete', async (slug, thunkAPI) => {
  try {
    await API.deleteBrand(slug);
    return slug;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete Brand');
  }
});

// Slice
const BrandSlice = createSlice({
  name: 'Brand',
  initialState,
  reducers: {
    clearBrandState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Brands.push(action.payload);
        toast.success('Brand created successfully');
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Get All
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Brands = action.payload.data;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      })

      // Get One
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Brand = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Update
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.Brands.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.Brands[index] = action.payload;
        }
        toast.success('Brand updated successfully');
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Brands = state.Brands.filter((c) => c._id !== action.payload);
        toast.success('Brand deleted successfully');
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { clearBrandState } = BrandSlice.actions;
export default BrandSlice.reducer;
