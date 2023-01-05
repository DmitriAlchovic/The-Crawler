// eslint-disable-next-line import/no-cycle
import { RegisterInfo } from '../store/reducers/registerSlice';

const API_URL = 'http://localhost:5000/api/' || process.env.API_URL;

export const postLoginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}user/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const postProfile = async (token: string | null) => {
  const response = await fetch(`${API_URL}user/info`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const postValidateRegister = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}user/validate`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const postRegisterUser = async ({
  email,
  password,
  userName,
  phoneNumber,
}: RegisterInfo) => {
  const response = await fetch(`${API_URL}user/register`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      userName,
      phoneNumber,
    }),
  });
  return response;
};

export default {
  postLoginUser,
  postProfile,
  postValidateRegister,
  postRegisterUser,
};
