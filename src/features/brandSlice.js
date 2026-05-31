// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// import { toast } from '@/components/Ui/GlobalToast';

// const getPayload = (res) => res?.data || res;

// const initialState = {
//   Brands: [],
//   Brand: null,
//   brands: [],
//   brand: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// export const createBrand = createAsyncThunk(
//   'brand/create',
//   async (data, thunkAPI) => {
//     try {
//       const res = await API.createBrand(data);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to create Brand'
//       );
//     }
//   }
// );

// export const getAllBrands = createAsyncThunk(
//   'brand/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.getAllBrands();
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch Brands'
//       );
//     }
//   }
// );

// export const getBrand = createAsyncThunk(
//   'brand/get',
//   async (slug, thunkAPI) => {
//     try {
//       const res = await API.getBrand(slug);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch Brand'
//       );
//     }
//   }
// );

// export const updateBrand = createAsyncThunk(
//   'brand/update',
//   async ({ slug, id, data }, thunkAPI) => {
//     try {
//       const res = await API.updateBrand(slug || id, data);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to update Brand'
//       );
//     }
//   }
// );

// export const deleteBrand = createAsyncThunk(
//   'brand/delete',
//   async (slug, thunkAPI) => {
//     try {
//       await API.deleteBrand(slug);
//       return slug;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to delete Brand'
//       );
//     }
//   }
// );

// const brandSlice = createSlice({
//   name: 'brand',
//   initialState,
//   reducers: {
//     clearBrandState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createBrand.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const brand = action.payload?.data || action.payload;
//         if (brand) {
//           state.Brands.unshift(brand);
//           state.brands = state.Brands;
//         }

//         toast.success('Brand created successfully');
//       })
//       .addCase(createBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(getAllBrands.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllBrands.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const brands =
//           action.payload?.data ||
//           action.payload?.brands ||
//           action.payload ||
//           [];

//         state.Brands = brands;
//         state.brands = brands;
//       })
//       .addCase(getAllBrands.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getBrand.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const brand = action.payload?.data || action.payload;
//         state.Brand = brand;
//         state.brand = brand;
//       })
//       .addCase(getBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(updateBrand.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const updated = action.payload?.data || action.payload;
//         const index = state.Brands.findIndex(
//           (b) => b._id === updated?._id || b.slug === updated?.slug
//         );

//         if (index !== -1) state.Brands[index] = updated;
//         state.brands = state.Brands;

//         toast.success('Brand updated successfully');
//       })
//       .addCase(updateBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(deleteBrand.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteBrand.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         state.Brands = state.Brands.filter(
//           (b) => b.slug !== action.payload && b._id !== action.payload
//         );
//         state.brands = state.Brands;

//         toast.success('Brand deleted successfully');
//       })
//       .addCase(deleteBrand.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   },
// });

// export const { clearBrandState } = brandSlice.actions;
// export default brandSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const getPayload = (res) => res?.data || res;

const initialState = {
  brands: [],
  Brands: [],
  brand: null,
  Brand: null,
  stats: null,
  loading: false,
  error: null,
  success: false,
};

const setBrandArrays = (state, brands) => {
  state.brands = brands;
  state.Brands = brands;
};

export const createBrand = createAsyncThunk(
  'brand/create',
  async (data, thunkAPI) => {
    try {
      const res = await API.createBrand(data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create brand'
      );
    }
  }
);

export const getAllBrands = createAsyncThunk(
  'brand/getAll',
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.getAllBrands(params);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch brands'
      );
    }
  }
);

export const getAdminBrands = createAsyncThunk(
  'brand/getAdminAll',
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.getAdminBrands(params);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch admin brands'
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
        err.response?.data?.message || 'Failed to fetch brand'
      );
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brand/update',
  async ({ slug, data }, thunkAPI) => {
    try {
      const res = await API.updateBrand(slug, data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update brand'
      );
    }
  }
);

export const toggleBrandStatus = createAsyncThunk(
  'brand/toggleStatus',
  async ({ slug, payload }, thunkAPI) => {
    try {
      const res = await API.toggleBrandStatus(slug, payload);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update brand status'
      );
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/delete',
  async (slug, thunkAPI) => {
    try {
      const res = await API.deleteBrand(slug);
      return { slug, ...getPayload(res) };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete brand'
      );
    }
  }
);

const replaceBrand = (state, updated) => {
  if (!updated) return;

  const nextBrands = state.brands.map((item) =>
    item._id === updated._id || item.slug === updated.slug
      ? { ...item, ...updated }
      : item
  );

  setBrandArrays(state, nextBrands);
};

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
        if (brand) setBrandArrays(state, [brand, ...state.brands]);

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

        const brands = action.payload?.data || action.payload || [];
        setBrandArrays(state, brands);
        state.stats = action.payload?.stats || state.stats;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAdminBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const brands = action.payload?.data || action.payload || [];
        setBrandArrays(state, brands);
        state.stats = action.payload?.stats || null;
      })
      .addCase(getAdminBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getBrand.fulfilled, (state, action) => {
        const brand = action.payload?.data || action.payload;
        state.brand = brand;
        state.Brand = brand;
      })

      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload?.data || action.payload;
        replaceBrand(state, updated);

        toast.success('Brand updated successfully');
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(toggleBrandStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        replaceBrand(state, updated);
        toast.success('Brand status updated');
      })
      .addCase(toggleBrandStatus.rejected, (state, action) => {
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

        if (action.payload?.softDeleted && action.payload?.data) {
          replaceBrand(state, action.payload.data);
        } else {
          const nextBrands = state.brands.filter(
            (item) => item.slug !== action.payload.slug
          );
          setBrandArrays(state, nextBrands);
        }

        toast.success(action.payload?.message || 'Brand removed');
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