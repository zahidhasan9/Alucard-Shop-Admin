// // src/features/review/reviewSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as API from './API';
// // import toast from 'react-hot-toast';
// import { toast } from '@/components/Ui/GlobalToast';

// // Thunks
// export const createReview = createAsyncThunk('review/create', async (reviewData, thunkAPI) => {
//   try {
//     const res = await API.createReview(reviewData);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create review');
//   }
// });

// export const getProductReviews = createAsyncThunk('review/getAll', async (productId, thunkAPI) => {
//   try {
//     const res = await API.getProductReviews(productId);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
//   }
// });

// export const getUserAllReviews = createAsyncThunk('review/user', async () => {
//   try {
//     const res = await API.getUserAllReviews();
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
//   }
// });

// export const deleteMyReview = createAsyncThunk('review/deleteMine', async (productId, thunkAPI) => {
//   try {
//     const res = await API.deleteMyReview(productId);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete your review');
//   }
// });

// export const deleteReview = createAsyncThunk('review/delete', async (reviewId, thunkAPI) => {
//   try {
//     const res = await API.deleteReview(reviewId);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete review');
//   }
// });

// // Slice
// const reviewSlice = createSlice({
//   name: 'review',
//   initialState: {
//     reviews: [],
//     userallreviews: [],
//     loading: true,
//     success: false,
//     error: null
//   },
//   reducers: {
//     clearReviewState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Review
//       .addCase(createReview.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createReview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         // state.reviews.push(action.payload);
//         toast.success('Review created successfully');
//       })
//       .addCase(createReview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Get All Reviews
//       .addCase(getProductReviews.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getProductReviews.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reviews = action.payload.reviews;
//       })
//       .addCase(getProductReviews.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Get All Reviews
//       .addCase(getUserAllReviews.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserAllReviews.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userallreviews = action.payload.reviews;
//       })
//       .addCase(getUserAllReviews.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       })

//       // Delete My Review
//       .addCase(deleteMyReview.fulfilled, (state, action) => {
//         state.reviews = state.reviews.filter((rev) => rev._id !== action.payload.reviewId);
//         toast.success('Your review has been deleted');
//       })
//       .addCase(deleteMyReview.rejected, (state, action) => {
//         toast.error(action.payload);
//       })

//       // Admin Delete Review
//       .addCase(deleteReview.fulfilled, (state, action) => {
//         state.reviews = state.reviews.filter((rev) => rev._id !== action.payload.reviewId);
//         toast.success('Review deleted');
//       })
//       .addCase(deleteReview.rejected, (state, action) => {
//         toast.error(action.payload);
//       });
//   }
// });

// export const { clearReviewState } = reviewSlice.actions;
// export default reviewSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const initialState = {
  reviews: [],
  userallreviews: [],
  selectedReview: null,
  stats: null,
  loading: false,
  success: false,
  error: null,
};

export const createReview = createAsyncThunk(
  'review/create',
  async (reviewData, thunkAPI) => {
    try {
      return await API.createReview(reviewData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create review'
      );
    }
  }
);

export const getProductReviews = createAsyncThunk(
  'review/getProductReviews',
  async (productId, thunkAPI) => {
    try {
      return await API.getProductReviews(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch reviews'
      );
    }
  }
);

export const getUserAllReviews = createAsyncThunk(
  'review/userReviews',
  async (_, thunkAPI) => {
    try {
      return await API.getUserAllReviews();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch reviews'
      );
    }
  }
);

export const deleteMyReview = createAsyncThunk(
  'review/deleteMine',
  async (reviewId, thunkAPI) => {
    try {
      return await API.deleteMyReview(reviewId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete your review'
      );
    }
  }
);

export const getAdminReviews = createAsyncThunk(
  'review/getAdminReviews',
  async (params = {}, thunkAPI) => {
    try {
      return await API.getAdminReviews(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch admin reviews'
      );
    }
  }
);

export const updateReviewStatus = createAsyncThunk(
  'review/updateStatus',
  async ({ reviewId, payload }, thunkAPI) => {
    try {
      return await API.updateReviewStatus(reviewId, payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update review status'
      );
    }
  }
);

export const replyToReview = createAsyncThunk(
  'review/reply',
  async ({ reviewId, message }, thunkAPI) => {
    try {
      return await API.replyToReview(reviewId, { message });
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to reply to review'
      );
    }
  }
);

export const deleteReviewReply = createAsyncThunk(
  'review/deleteReply',
  async (reviewId, thunkAPI) => {
    try {
      return await API.deleteReviewReply(reviewId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete review reply'
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteAdmin',
  async (reviewId, thunkAPI) => {
    try {
      return await API.deleteAdminReview(reviewId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete review'
      );
    }
  }
);

const replaceReview = (state, updated) => {
  if (!updated) return;

  state.reviews = state.reviews.map((review) =>
    review._id === updated._id ? updated : review
  );
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success('Review submitted for approval');
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.reviews || [];
      })

      .addCase(getUserAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.userallreviews = action.payload?.reviews || [];
      })

      .addCase(deleteMyReview.fulfilled, (state, action) => {
        const id = action.payload?.reviewId;
        state.reviews = state.reviews.filter((review) => review._id !== id);
        state.userallreviews = state.userallreviews.filter(
          (review) => review._id !== id
        );
        toast.success('Review deleted');
      })

      .addCase(getAdminReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.reviews || [];
        state.stats = action.payload?.stats || null;
      })
      .addCase(getAdminReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        replaceReview(state, action.payload?.review);
        toast.success(action.payload?.message || 'Review updated');
      })
      .addCase(updateReviewStatus.rejected, (state, action) => {
        toast.error(action.payload);
      })

      .addCase(replyToReview.fulfilled, (state, action) => {
        replaceReview(state, action.payload?.review);
        toast.success(action.payload?.message || 'Reply saved');
      })
      .addCase(replyToReview.rejected, (state, action) => {
        toast.error(action.payload);
      })

      .addCase(deleteReviewReply.fulfilled, (state, action) => {
        replaceReview(state, action.payload?.review);
        toast.success(action.payload?.message || 'Reply removed');
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        const id = action.payload?.reviewId;
        state.reviews = state.reviews.filter((review) => review._id !== id);
        toast.success(action.payload?.message || 'Review deleted');
      })
      .addCase(deleteReview.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;