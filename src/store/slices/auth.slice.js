import { STORAGE_KEYS } from '../../constants/storage.constant';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  activateAccountService,
  refreshTokenService,
  requestActivateAccountService,
  requestResetPasswordService,
  resetPasswordService,
  signInService,
  signOutService,
  signInWithGoogleService,
  signUpService,
} from '../../services/apis/auth.service';
import { load, remove, save } from '../../utils/local-storage';
import { AUTH_ACTIONS } from '../constants/action-name.constant';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

const createInitialState = () => {
  const initialState = {
    access_token: '',
    refresh_token: '',
    id_token: '',
    access_token_expires_at: '',
    refresh_token_expires_at: '',
    loading: false,
    isRefreshing: false,
    errorTranslationKey: undefined,
  };
  return initialState;
};
export const initialState = createInitialState();

export const signIn = createAsyncThunk('auth/signIn', async (input, { rejectWithValue }) => {
  try {
    const response = await signInService(input);
    const { id_token } = response;
    const { role } = jwtDecode(id_token);
    if (role !== 'RENTER') {
      return rejectWithValue('api.error.unauthorized');
    }
    await save(STORAGE_KEYS.AUTH, response);
    return { ...response, actionSucceeded: AUTH_ACTIONS.SIGN_IN };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.ts:11 ~ error:', error);
    return rejectWithValue(error);
  }
});

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async ({ idToken }, { rejectWithValue }) => {
  try {
    console.log('🚀 ~ idToken:', idToken);
    const response = await signInWithGoogleService({ id_token: idToken ?? '' });
    const { id_token } = response;
    const { role } = jwtDecode(id_token);
    if (role !== 'RENTER') {
      return rejectWithValue('api.error.unauthorized');
    }
    await save(STORAGE_KEYS.AUTH, response);
    return { ...response, actionSucceeded: AUTH_ACTIONS.SIGN_IN_WITH_GOOGLE };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.ts:11 ~ error:', error);
    return rejectWithValue(error);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (input, { rejectWithValue }) => {
  try {
    const response = await signUpService(input);
    return { ...response, actionSucceeded: AUTH_ACTIONS.SIGN_UP };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue, getState }) => {
  try {
    console.log('🚀 refreshToken');
    const state = getState();
    const { auth } = state;
    const { refresh_token } = auth;
    const response = await refreshTokenService(refresh_token);
    save(STORAGE_KEYS.AUTH, response);
    return { ...response, actionSucceeded: AUTH_ACTIONS.REFRESH_TOKEN };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { auth } = state;
    const { refresh_token } = auth;
    remove(STORAGE_KEYS.AUTH);
    try {
      googleLogout();
      await signOutService(refresh_token);
    } catch (error) {
      console.warn('🚀 ~ remove refreshToken error: :', error);
    }
    return { actionSucceeded: AUTH_ACTIONS.SIGN_OUT };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});
export const resetPassword = createAsyncThunk('auth/resetPassword', async (input, { rejectWithValue }) => {
  try {
    await resetPasswordService(input);
    return { actionSucceeded: AUTH_ACTIONS.RESET_PASSWORD };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});
export const requestResetPassword = createAsyncThunk(
  'auth/requestResetPassword',
  async (input, { rejectWithValue }) => {
    try {
      await requestResetPasswordService(input);
      return { actionSucceeded: AUTH_ACTIONS.REQUEST_RESET_PASSWORD };
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
      return rejectWithValue(error);
    }
  },
);
export const activateAccount = createAsyncThunk('auth/activateAccount', async (input, { rejectWithValue }) => {
  try {
    await activateAccountService(input);
    return { actionSucceeded: AUTH_ACTIONS.ACTIVATE_ACCOUNT };
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});
export const requestActivateAccount = createAsyncThunk(
  'auth/requestActivateAccount',
  async (input, { rejectWithValue }) => {
    try {
      await requestActivateAccountService(input);
      return { actionSucceeded: AUTH_ACTIONS.REQUEST_ACTIVATE_ACCOUNT };
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
      return rejectWithValue(error);
    }
  },
);
export const initState = createAsyncThunk('auth/initState', async (_, { rejectWithValue }) => {
  try {
    const localAuth = load(STORAGE_KEYS.AUTH);
    const states = {
      ...initialState,
      ...localAuth,
      actionSucceeded: AUTH_ACTIONS.INIT_STATE,
    };
    return states;
  } catch (error) {
    console.warn('🚀 ~ file: auth.slice.tsx:42 ~ error:', error);
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.errorTranslationKey = undefined;
    },
    openAuthModal(state) {
      state.isOpenAuthModal = true;
    },
    clearActionSucceeded(state) {
      state.actionSucceeded = undefined;
    },
    // TODO: ...add more sync reducer here
  },
  extraReducers(builder) {
    builder.addCase(initState.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      isRefreshing: true,
      loading: true,
    }));
    builder.addCase(initState.fulfilled, (state, { payload }) => ({
      ...state,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      id_token: payload.id_token,
      access_token_expires_at: payload.access_token_expires_at,
      refresh_token_expires_at: payload.refresh_token_expires_at,
      actionSucceeded: payload.actionSucceeded,
      isRefreshing: false,
      loading: false,
    }));
    builder.addCase(initState.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      isRefreshing: false,
      errorTranslationKey: payload,
    }));
    builder.addCase(signIn.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, { payload }) => ({
      ...state,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      id_token: payload.id_token,
      access_token_expires_at: payload.access_token_expires_at,
      refresh_token_expires_at: payload.refresh_token_expires_at,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
      errorTranslationKey: '',
    }));
    builder.addCase(signInWithGoogle.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(signInWithGoogle.fulfilled, (state, { payload }) => ({
      ...state,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      id_token: payload.id_token,
      access_token_expires_at: payload.access_token_expires_at,
      refresh_token_expires_at: payload.refresh_token_expires_at,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
      errorTranslationKey: '',
    }));
    builder.addCase(signInWithGoogle.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(signUp.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(signUp.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));

    builder.addCase(signUp.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
      errorTranslationKey: '',
    }));
    builder.addCase(signIn.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(refreshToken.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      isRefreshing: true,
      loading: true,
      errorTranslationKey: '',
    }));
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => ({
      ...state,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      id_token: payload.id_token,
      access_token_expires_at: payload.access_token_expires_at,
      refresh_token_expires_at: payload.refresh_token_expires_at,
      actionSucceeded: payload.actionSucceeded,
      isRefreshing: false,
      loading: false,
    }));
    builder.addCase(refreshToken.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      isRefreshing: false,
      errorTranslationKey: payload,
    }));
    builder.addCase(signOut.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(signOut.fulfilled, (state, { payload }) => ({
      ...state,
      ...initialState,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(signOut.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(resetPassword.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(resetPassword.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(requestResetPassword.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(requestResetPassword.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(requestResetPassword.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(activateAccount.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(activateAccount.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(activateAccount.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
    builder.addCase(requestActivateAccount.pending, state => ({
      ...state,
      actionSucceeded: undefined,
      loading: true,
    }));
    builder.addCase(requestActivateAccount.fulfilled, (state, { payload }) => ({
      ...state,
      actionSucceeded: payload.actionSucceeded,
      loading: false,
    }));
    builder.addCase(requestActivateAccount.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      actionSucceeded: undefined,
      errorTranslationKey: payload,
    }));
  },
});

const { actions, reducer } = authSlice;
export const authReducer = reducer;
export const authActions = actions;

export const useAuthSlice = () => {
  const actions = {
    ...authSlice.actions,
    signIn,
    signUp,
    refreshToken,
    initState,
    signOut,
    resetPassword,
    activateAccount,
    requestActivateAccount,
    requestResetPassword,
    signInWithGoogle,
  };
  return { actions };
};
