
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// import { toast } from '@/components/Ui/GlobalToast';

// const getPayload = (res) => res?.data || res;

// const initialState = {
//   categories: [],
//   category: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// export const createCategory = createAsyncThunk(
//   'category/create',
//   async (data, thunkAPI) => {
//     try {
//       const res = await API.createCategory(data);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to create category'
//       );
//     }
//   }
// );

// export const getAllCategories = createAsyncThunk(
//   'category/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.getAllCategories();
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch categories'
//       );
//     }
//   }
// );

// export const getCategory = createAsyncThunk(
//   'category/get',
//   async (slug, thunkAPI) => {
//     try {
//       const res = await API.getCategory(slug);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch category'
//       );
//     }
//   }
// );

// export const updateCategory = createAsyncThunk(
//   'category/update',
//   async ({ slug, id, data }, thunkAPI) => {
//     try {
//       const res = await API.updateCategory(slug || id, data);
//       return getPayload(res);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to update category'
//       );
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   'category/delete',
//   async (slug, thunkAPI) => {
//     try {
//       await API.deleteCategory(slug);
//       return slug;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to delete category'
//       );
//     }
//   }
// );

// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
//   reducers: {
//     clearCategoryState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         const category = action.payload?.data || action.payload;
//         if (category) state.categories.unshift(category);
//         toast.success('Category created successfully');
//       })
//       .addCase(createCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(getAllCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.categories =
//           action.payload?.data ||
//           action.payload?.categories ||
//           action.payload ||
//           [];
//       })
//       .addCase(getAllCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.category = action.payload?.data || action.payload;
//       })
//       .addCase(getCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(updateCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const updated = action.payload?.data || action.payload;
//         const index = state.categories.findIndex(
//           (c) =>
//             c._id === updated?._id ||
//             c.slug === updated?.slug
//         );

//         if (index !== -1) state.categories[index] = updated;
//         toast.success('Category updated successfully');
//       })
//       .addCase(updateCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       .addCase(deleteCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.categories = state.categories.filter(
//           (c) => c.slug !== action.payload && c._id !== action.payload
//         );
//         toast.success('Category deleted successfully');
//       })
//       .addCase(deleteCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   },
// });

// export const { clearCategoryState } = categorySlice.actions;
// export default categorySlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const getPayload = (res) => res?.data || res;

const initialState = {
  categories: [],
  category: null,
  stats: null,
  loading: false,
  error: null,
  success: false,
};

export const createCategory = createAsyncThunk(
  'category/create',
  async (data, thunkAPI) => {
    try {
      const res = await API.createCategory(data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create category'
      );
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.getAllCategories(params);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

export const getAdminCategories = createAsyncThunk(
  'category/getAdminAll',
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.getAdminCategories(params);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch admin categories'
      );
    }
  }
);

export const getCategory = createAsyncThunk(
  'category/get',
  async (slug, thunkAPI) => {
    try {
      const res = await API.getCategory(slug);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ slug, data }, thunkAPI) => {
    try {
      const res = await API.updateCategory(slug, data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update category'
      );
    }
  }
);

export const toggleCategoryStatus = createAsyncThunk(
  'category/toggleStatus',
  async ({ slug, payload }, thunkAPI) => {
    try {
      const res = await API.toggleCategoryStatus(slug, payload);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update category status'
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (slug, thunkAPI) => {
    try {
      const res = await API.deleteCategory(slug);
      return { slug, ...getPayload(res) };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete category'
      );
    }
  }
);

const replaceCategory = (state, updated) => {
  if (!updated) return;

  const index = state.categories.findIndex(
    (item) => item._id === updated._id || item.slug === updated.slug
  );

  if (index !== -1) {
    state.categories[index] = {
      ...state.categories[index],
      ...updated,
    };
  }
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const category = action.payload?.data || action.payload;
        if (category) state.categories.unshift(category);

        toast.success('Category created successfully');
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = action.payload?.data || action.payload || [];
        state.stats = action.payload?.stats || state.stats;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = action.payload?.data || action.payload || [];
        state.stats = action.payload?.stats || null;
      })
      .addCase(getAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload?.data || action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload?.data || action.payload;
        replaceCategory(state, updated);

        toast.success('Category updated successfully');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        replaceCategory(state, updated);
        toast.success('Category status updated');
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload?.softDeleted && action.payload?.data) {
          replaceCategory(state, action.payload.data);
        } else {
          state.categories = state.categories.filter(
            (item) => item.slug !== action.payload.slug
          );
        }

        toast.success(action.payload?.message || 'Category removed');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;