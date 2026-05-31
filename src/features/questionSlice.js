import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from './API';
import { toast } from '@/components/Ui/GlobalToast';

const initialState = {
  questions: [],
  selectedQuestion: null,
  stats: null,
  loading: false,
  success: false,
  error: null,
};

export const getAdminQuestions = createAsyncThunk(
  'question/getAdminQuestions',
  async (params = {}, thunkAPI) => {
    try {
      return await API.getAdminQuestions(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch questions'
      );
    }
  }
);

export const updateQuestionStatus = createAsyncThunk(
  'question/updateStatus',
  async ({ questionId, payload }, thunkAPI) => {
    try {
      return await API.updateQuestionStatus(questionId, payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update question'
      );
    }
  }
);

export const answerQuestionAdmin = createAsyncThunk(
  'question/answer',
  async ({ questionId, answer }, thunkAPI) => {
    try {
      return await API.answerQuestionAdmin(questionId, { answer });
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to answer question'
      );
    }
  }
);

export const deleteAdminQuestion = createAsyncThunk(
  'question/delete',
  async (questionId, thunkAPI) => {
    try {
      return await API.deleteAdminQuestion(questionId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete question'
      );
    }
  }
);

const replaceQuestion = (state, updated) => {
  if (!updated) return;

  state.questions = state.questions.map((question) =>
    question._id === updated._id ? updated : question
  );
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    clearQuestionState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload?.questions || [];
        state.stats = action.payload?.stats || null;
      })
      .addCase(getAdminQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateQuestionStatus.fulfilled, (state, action) => {
        replaceQuestion(state, action.payload?.question);
        toast.success(action.payload?.message || 'Question updated');
      })
      .addCase(updateQuestionStatus.rejected, (state, action) => {
        toast.error(action.payload);
      })

      .addCase(answerQuestionAdmin.fulfilled, (state, action) => {
        replaceQuestion(state, action.payload?.question);
        toast.success(action.payload?.message || 'Answer saved');
      })
      .addCase(answerQuestionAdmin.rejected, (state, action) => {
        toast.error(action.payload);
      })

      .addCase(deleteAdminQuestion.fulfilled, (state, action) => {
        const id = action.payload?.id;
        state.questions = state.questions.filter((item) => item._id !== id);
        toast.success(action.payload?.message || 'Question deleted');
      })
      .addCase(deleteAdminQuestion.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export const { clearQuestionState } = questionSlice.actions;
export default questionSlice.reducer;