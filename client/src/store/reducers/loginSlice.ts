/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type LoginInfo = {
  email: string;
  password: string;
};

type Profile = {
  fullName: string;
  avatar: string;
};

type LoginState = {
  loginInput: LoginInfo;
  profile: Profile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

export const postLogin = createAsyncThunk<
string,
LoginInfo,
{ rejectValue:Error }
>('login/fetchToken', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(response, data);
    if (!response.ok) { throw new Error(data.message); }
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const fetchInfo = createAsyncThunk<Profile, void, { state: RootState }>(
  'login/userInfo',
  async (_, { getState }) => {
    const { token } = getState().login;
    const response = await fetch('http://localhost:5000/api/user/info', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  },
);

const initialState: LoginState = {
  loginInput: {
    email: '',
    password: '',
  },
  profile: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
    },
    clearLoginError(state) {
      state.error = null;
    },
    setToken(state, action: PayloadAction<string>) {
      console.log(state.token);
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        state.loading = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(fetchInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, clearLoginError, setToken } = loginSlice.actions;

export default loginSlice.reducer;
