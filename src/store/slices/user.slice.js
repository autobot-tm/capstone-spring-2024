import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { getUserByIdService, updateUserCurrentService } from '../../services/apis/users.service';

const createInitialState = () => {
  const initialState = {
    loading: false,
  };
  return initialState;
};
export const initialState = createInitialState();

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState();
    const { id_token } = auth;
    const decodedToken = jwtDecode(id_token);
    const { id, sub } = decodedToken;
    const response = await getUserByIdService(id ?? sub);
    return {
      ...response,
      actionSucceeded: 'getUserProfile',
    };
  } catch (error) {
    console.warn('🚀 ~ file: user.slice. getUserProfile ~ error:', error);
    return rejectWithValue(error);
  }
});
export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (input, { rejectWithValue }) => {
  try {
    const response = await updateUserCurrentService(input);
    return {
      ...response,
      actionSucceeded: 'updateUserProfile',
    };
  } catch (error) {
    console.warn('🚀 ~ file: user.slice. updateUserProfile ~ error:', error);
    return rejectWithValue(error);
  }
});
export const changePassword = createAsyncThunk('user/changePassword', async (input, { rejectWithValue }) => {
  try {
    const response = await updateUserCurrentService(input);
    return {
      ...response,
      actionSucceeded: 'changePassword',
    };
  } catch (error) {
    console.warn('🚀 ~ file: user.slice. changePassword ~ error:', error);
    return rejectWithValue(error);
  }
});
export const changeAvatar = createAsyncThunk('user/changeAvatar', async (input, { rejectWithValue }) => {
  try {
    const response = await updateUserCurrentService(input);
    return {
      ...response,
      actionSucceeded: 'changeAvatar',
    };
  } catch (error) {
    console.warn('🚀 ~ file: user.slice. changeAvatar ~ error:', error);
    return rejectWithValue(error);
  }
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.errorTranslationKey = undefined;
    },
    clearActionSucceeded(state) {
      state.actionSucceeded = undefined;
    },
    // clearUserSlice(state) {
    //   state = initialState;
    // },
    // TODO: ...add more sync reducer here
  },
  extraReducers(builder) {
    builder.addCase(getUserProfile.pending, state => ({
      ...state,
      user: undefined,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => ({
      ...state,
      user: {
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        avatar_url: payload.avatar_url,
        phone_number: payload.phone_number,
        role: payload.role,
        country: payload.country,
        status: payload.status,
        auth_method: payload.auth_method,
      },
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(getUserProfile.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(updateUserProfile.pending, state => ({
      ...state,
      user: undefined,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => ({
      ...state,
      user: {
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        avatar_url: payload.avatar_url,
        phone_number: payload.phone_number,
        role: payload.role,
        country: payload.country,
        status: payload.status,
        auth_method: payload.auth_method,
      },
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(updateUserProfile.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(changeAvatar.pending, state => ({
      ...state,
      user: undefined,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(changeAvatar.fulfilled, (state, { payload }) => ({
      ...state,
      user: {
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        avatar_url: payload.avatar_url,
        phone_number: payload.phone_number,
        role: payload.role,
        country: payload.country,
        status: payload.status,
        auth_method: payload.auth_method,
      },
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(changeAvatar.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(changePassword.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(changePassword.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(changePassword.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
  },
});

const { actions, reducer } = userSlice;
export const userReducer = reducer;
export const userActions = actions;

export const useUserSlice = () => {
  const actions = {
    ...userSlice.actions,
    changeAvatar,
    changePassword,
    updateUserProfile,
    getUserProfile,
  };
  return { actions };
};
