import React, { useEffect } from 'react';
import Dropdown from '../Dropdown';
import noAvatar from '../../assets/no_avatar.svg';
import styles from './ProfileMenu.module.sass';
import RegisterLoginCard from '../RegisterLoginCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchInfo, logout } from '../../store/reducers/loginSlice';

export default function ProfileMenu() {
  const { token, profile } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchInfo());
    }
  }, [dispatch, token]);

  return (
    <div className={styles['profile-container']}>
      <Dropdown hasChildrenClose={false}>
        <div className={styles['profile-card']}>
          {!profile && <RegisterLoginCard hasDefaultLogin />}
          {profile && (
            <div className={styles['card-info']}>
              {profile.avatar ? (
                <img
                  className={styles['drop-avatar']}
                  alt="avatar"
                  src={profile.avatar}
                />
              ) : (
                <img
                  alt="no avatar"
                  className={styles['drop-avatar']}
                  src={noAvatar}
                />
              )}
              <div className={styles['user-name']}>{profile.fullName}</div>
              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className={styles['logout-btn']}
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </Dropdown>
      <div className={styles['btn-container']}>
        {profile ? (
          <div className={styles['drop-btn']}>
            {profile.avatar ? (
              <img alt="avatar" src={profile.avatar} />
            ) : (
              <img alt="no avatar" src={noAvatar} />
            )}
            {profile.fullName}
          </div>
        ) : (
          <img alt="no avatar" src={noAvatar} />
        )}
      </div>
    </div>
  );
}
