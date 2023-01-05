/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { postRegisterUser, postValidateRegister } from '../../services/userService';
import type { RootState } from '../store';

export type RegisterInfo = {
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
      const response = await postValidateRegister(email, password);
      const data = await response.json();
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
      const response = await postRegisterUser({
        email, password, userName, phoneNumber,
      });
      const data = await response.json();
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
        state.loading = false;
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
        state.loading = false;
      });
  },
});

export const { submitEmailPassHandler, clearRegisterError } = registerSlice.actions;

export default registerSlice.reducer;
