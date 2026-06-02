import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const getPayload = (res) => res?.data || res;

const initialState = {
  banners: [],
  banner: null,
  stats: null,
  loading: false,
  error: null,
  success: false,
};

export const getAdminBanners = createAsyncThunk(
  'banner/getAdminAll',
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.getAdminBanners(params);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch banners'
      );
    }
  }
);

export const createBanner = createAsyncThunk(
  'banner/create',
  async (data, thunkAPI) => {
    try {
      const res = await API.createBanner(data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create banner'
      );
    }
  }
);

export const updateBanner = createAsyncThunk(
  'banner/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.updateBanner(id, data);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update banner'
      );
    }
  }
);

export const toggleBannerStatus = createAsyncThunk(
  'banner/toggleStatus',
  async ({ id, payload }, thunkAPI) => {
    try {
      const res = await API.toggleBannerStatus(id, payload);
      return getPayload(res);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update banner status'
      );
    }
  }
);

export const deleteBanner = createAsyncThunk(
  'banner/delete',
  async (id, thunkAPI) => {
    try {
      const res = await API.deleteBanner(id);
      return { id, ...getPayload(res) };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete banner'
      );
    }
  }
);

const replaceBanner = (state, updated) => {
  if (!updated) return;

  state.banners = state.banners.map((item) =>
    item._id === updated._id ? { ...item, ...updated } : item
  );
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearBannerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.banners = action.payload?.data || [];
        state.stats = action.payload?.stats || null;
      })
      .addCase(getAdminBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const banner = action.payload?.data || action.payload;

        if (banner) {
          state.banners = [banner, ...state.banners];
        }

        toast.success('Banner created successfully');
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload?.data || action.payload;
        replaceBanner(state, updated);

        toast.success('Banner updated successfully');
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(toggleBannerStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        replaceBanner(state, updated);
        toast.success('Banner status updated');
      })
      .addCase(toggleBannerStatus.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.banners = state.banners.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success(action.payload?.message || 'Banner deleted successfully');
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;