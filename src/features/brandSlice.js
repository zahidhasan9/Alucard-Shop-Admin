// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// // import toast from 'react-hot-toast';
// import { toast } from '@/components/Ui/GlobalToast';

// const initialState = {
//   Brands: [],
//   Brand: null,
//   loading: false,
//   error: null,
//   success: false
// };

// // Create Brand
// export const createBrand = createAsyncThunk('Brand/create', async (data, thunkAPI) => {
//   try {
//     const res = await API.createBrand(data);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create Brand');
//   }
// });

// // Get All Brands
// export const getAllBrands = createAsyncThunk('Brand/getAll', async (_, thunkAPI) => {
//   try {
//     const res = await API.getAllBrands();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch Brands');
//   }
// });

// // Get Brand by ID
// export const getBrand = createAsyncThunk('Brand/get', async (id, thunkAPI) => {
//   try {
//     const res = await API.getBrand(id);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch Brand');
//   }
// });

// // Update Brand
// export const updateBrand = createAsyncThunk('Brand/update', async ({ id, data }, thunkAPI) => {
//   try {
//     const res = await API.updateBrand(id, data);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update Brand');
//   }
// });

// // Delete Brand
// export const deleteBrand = createAsyncThunk('Brand/delete', async (slug, thunkAPI) => {
//   try {
//     await API.deleteBrand(slug);
//     return slug;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete Brand');
//   }
// });

// // Slice
// const BrandSlice = createSlice({
//   name: 'Brand',
//   initialState,
//   reducers: {
//     clearBrandState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create
//       .addCase(createBrand.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.Brands.push(action.payload);
//         toast.success('Brand created successfully');
//       })
//       .addCase(createBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Get All
//       .addCase(getAllBrands.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllBrands.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.Brands = action.payload.data;
//       })
//       .addCase(getAllBrands.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         // toast.error(action.payload);
//       })

//       // Get One
//       .addCase(getBrand.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.Brand = action.payload;
//       })
//       .addCase(getBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Update
//       .addCase(updateBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         const index = state.Brands.findIndex((c) => c._id === action.payload._id);
//         if (index !== -1) {
//           state.Brands[index] = action.payload;
//         }
//         toast.success('Brand updated successfully');
//       })
//       .addCase(updateBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Delete
//       .addCase(deleteBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.Brands = state.Brands.filter((c) => c._id !== action.payload);
//         toast.success('Brand deleted successfully');
//       })
//       .addCase(deleteBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   }
// });

// export const { clearBrandState } = BrandSlice.actions;
// export default BrandSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const getPayload = (res) => res?.data || res;

const initialState = {
  Brands: [],
  Brand: null,
  brands: [],
  brand: null,
  loading: false,
  error: null,
  success: false,
};

export const createBrand = createAsyncThunk(
  'brand/create',
  async (data, thunkAPI) => {
    try {
      const res = await API.createBrand(data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create Brand'
      );
    }
  }
);

export const getAllBrands = createAsyncThunk(
  'brand/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await API.getAllBrands();
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch Brands'
      );
    }
  }
);

export const getBrand = createAsyncThunk(
  'brand/get',
  async (slug, thunkAPI) => {
    try {
      const res = await API.getBrand(slug);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch Brand'
      );
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brand/update',
  async ({ slug, id, data }, thunkAPI) => {
    try {
      const res = await API.updateBrand(slug || id, data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update Brand'
      );
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/delete',
  async (slug, thunkAPI) => {
    try {
      await API.deleteBrand(slug);
      return slug;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete Brand'
      );
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    clearBrandState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const brand = action.payload?.data || action.payload;
        if (brand) {
          state.Brands.unshift(brand);
          state.brands = state.Brands;
        }

        toast.success('Brand created successfully');
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const brands =
          action.payload?.data ||
          action.payload?.brands ||
          action.payload ||
          [];

        state.Brands = brands;
        state.brands = brands;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const brand = action.payload?.data || action.payload;
        state.Brand = brand;
        state.brand = brand;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload?.data || action.payload;
        const index = state.Brands.findIndex(
          (b) => b._id === updated?._id || b.slug === updated?.slug
        );

        if (index !== -1) state.Brands[index] = updated;
        state.brands = state.Brands;

        toast.success('Brand updated successfully');
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.Brands = state.Brands.filter(
          (b) => b.slug !== action.payload && b._id !== action.payload
        );
        state.brands = state.Brands;

        toast.success('Brand deleted successfully');
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearBrandState } = brandSlice.actions;
export default brandSlice.reducer;