import React, { useEffect, useState } from 'react';
import envelope from '../../assets/mail.svg';
import key from '../../assets/key.svg';
import userIcon from '../../assets/icon_user.svg';
import phoneGrey from '../../assets/icon_phone_grey.svg';
import styles from './RegisterLoginCard.module.sass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearRegisterError, fetchValidate, postRegister } from '../../store/reducers/registerSlice';
import {
  clearLoginError, fetchInfo, postLogin, setToken,
} from '../../store/reducers/loginSlice';

interface RegisterLoginCardProps {
  hasDefaultLogin: boolean;
}

export default function RegisterLoginCard({
  hasDefaultLogin,
}: RegisterLoginCardProps) {
  const [isLogin, setHasLogin] = useState(hasDefaultLogin);
  const [form, setForm] = useState({
    email: '',
    password: '',
    userName: '',
    phoneNumber: '',
  });
  const { error: registerError, isValidated, token: registerToken } = useAppSelector(
    (state) => state.register,
  );
  const { error: loginError, token: loginToken } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (registerToken) {
      dispatch(setToken(registerToken));
    }
  }, [dispatch, registerToken]);

  useEffect(() => {
    if (loginToken) {
      dispatch(fetchInfo());
    }
  }, [dispatch, loginToken]);

  return (
    <div className={styles['login-register-container']}>
      {!isValidated && (
        <form>
          <label className={styles.label} htmlFor="email">
            Enter address
            <div className={styles['input-container']}>
              <img alt="envelope" src={envelope} />
              <input
                className={styles.input}
                onChange={handlerChange}
                type="email"
                name="email"
                value={form.email}
                placeholder="johndoe@gmail.com"
              />
            </div>
          </label>
          <label className={styles.label} htmlFor="password">
            Password
            <div className={styles['input-container']}>
              <img alt="key" src={key} />
              <input
                minLength={8}
                className={styles.input}
                onChange={handlerChange}
                type="password"
                name="password"
                value={form.password}
                placeholder="Maximum 8 characters"
              />
            </div>
          </label>
        </form>
      )}
      {isValidated && (
        <form>
          <label className={styles.label} htmlFor="fullName">
            Enter full name
            <div className={styles['input-container']}>
              <img alt="envelope" src={userIcon} />
              <input
                className={styles.input}
                onChange={handlerChange}
                type="text"
                name="userName"
                value={form.userName}
                placeholder="John Doe"
              />
            </div>
          </label>
          <label className={styles.label} htmlFor="phoneNumber">
            Phone Number
            <div className={styles['input-container']}>
              <img alt="key" src={phoneGrey} />
              <input
                className={styles.input}
                onChange={handlerChange}
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                placeholder="Phone number"
              />
            </div>
          </label>
        </form>
      )}

      {isLogin ? (
        <>
          <div
            onKeyDown={() => {}}
            role="button"
            tabIndex={-1}
            onClick={() => {
              setHasLogin(false);
              dispatch(clearLoginError());
            }}
            className={styles['create-link']}
          >
            <div>Crete account</div>
            <div className={styles.promo}>(10% off for new members)</div>
          </div>
          <div className={styles['input-error']}>
            <div>{loginError}</div>
            <div>{registerError}</div>
          </div>
          <button
            className={styles['login-register-btn']}
            type="button"
            onClick={() => {
              dispatch(
                postLogin({ email: form.email, password: form.password }),
              );
              dispatch(clearLoginError());
            }}
          >
            Sign in
          </button>
        </>
      ) : (
        <>
          <div className={styles['input-error']}>
            <div>{loginError}</div>
            <div>{registerError}</div>
          </div>
          <button
            onClick={() => {
              if (isValidated) {
                dispatch(postRegister(form));
              } else dispatch(fetchValidate({ email: form.email, password: form.password }));
              dispatch(clearRegisterError());
            }}
            className={styles['login-register-btn']}
            type="button"
          >
            Register Now
          </button>
        </>
      )}
    </div>
  );
}
