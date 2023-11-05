import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { authTokensLocalStorageUtils } from '../../utils';
import { authServices } from '../../services';

export const signIn = createAsyncThunk('auth/sign-in', async (input, { rejectWithValue }) => {
  try {
    const { dto } = input;
    const res = await authServices.signIn(dto);
    authTokensLocalStorageUtils.save(res);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const signOut = createAction('auth/sign-out', () => {
  authTokensLocalStorageUtils.delete();
  return {
    payload: {
      accessToken: '',
      idToken: '',
    },
  };
});

const createInitialState = () => {
  let initialState = {
    accessToken: '',
    idToken: '',
    loading: false,
    error: null,
  };

  const authTokens = authTokensLocalStorageUtils.get();
  if (authTokens) {
    initialState = {
      ...initialState,
      accessToken: authTokens.accessToken,
      idToken: authTokens.idToken,
    };
  }
  return initialState;
};
export const initialState = createInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state, action) {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, { payload }) => ({
      ...state,
      accessToken: payload.accessToken,
      idToken: payload.idToken,
      loading: false,
    }));
    builder.addCase(signIn.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }));
  },
});

const { actions, reducer } = authSlice;
export const authReducer = reducer;
export const authActions = actions;

export const useAuthSlice = () => {
  const exportActions = {
    ...authSlice.actions,
    signIn,
    signOut,
  };
  return { actions: exportActions };
};
