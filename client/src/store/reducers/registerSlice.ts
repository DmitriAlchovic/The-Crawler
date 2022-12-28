/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type RegisterInfo = {
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
};

type RegisterState = {
  registerInput: RegisterInfo;
  isValidated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
};

export const fetchValidate = createAsyncThunk<
string,
{ email: string; password: string },
{ state: RootState; rejectValue: Error }
>(
  'register/validateRegister',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/validate', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data, response);
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const postRegister = createAsyncThunk<
string,
RegisterInfo,
{ state: RootState; rejectValue: Error }
>(
  'register/registerUser',
  async ({
    email, password, userName, phoneNumber,
  }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          userName,
          phoneNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

const initialState: RegisterState = {
  registerInput: {
    email: '',
    password: '',
    userName: '',
    phoneNumber: '',
  },
  loading: false,
  isValidated: false,
  token: null,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    submitEmailPassHandler(state, action: PayloadAction<string>) {
      state.registerInput.email = action.payload;
    },
    clearRegisterError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchValidate.fulfilled, (state) => {
        state.isValidated = true;
        state.loading = false;
      })
      .addCase(fetchValidate.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload);
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(postRegister.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      });
  },
});

export const { submitEmailPassHandler, clearRegisterError } = registerSlice.actions;

export default registerSlice.reducer;
