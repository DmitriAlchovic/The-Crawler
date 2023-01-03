import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Searchbar from '../Dropdown/Searchbar';
import hot from '../../assets/icon_hotjar.svg';
import hotActive from '../../assets/icon_hotjar_green.svg';
import home from '../../assets/icon_home.svg';
import homeGreen from '../../assets/icon_home_green.svg';
import percent from '../../assets/percent.svg';
import percentActive from '../../assets/percent_green.svg';
import megaphone from '../../assets/icon_megaphone.svg';
import megaphoneActive from '../../assets/icon_megaphone_green.svg';
import phone from '../../assets/icon_phone.svg';
import logo from '../../assets/logo.svg';
import styles from './Navbar.module.sass';
import Cart from '../Cart';
import ProfileMenu from '../ProfileMenu';
import paths from '../../utils/paths';

export default function Navbar() {
  const { pathname } = useLocation();
  const hotPath = `${paths.categoryPage}hot/1`;
  const promotionsPath = `${paths.categoryPage}promotions/1`;
  const newPath = `${paths.categoryPage}new/1`;
  return (
    <div className={styles['navbar-container']}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <img alt="logo" src={logo} />
          </div>
          <div>Grocery</div>
        </div>
        <Searchbar />
        <div>
          <Cart />
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.links}>
          <div
            className={
              pathname === '/'
                ? styles['active-links-text']
                : styles['links-text']
            }
          >
            <Link to="/">
              <img
                className={styles.icon}
                alt="home"
                src={pathname === '/' ? homeGreen : home}
              />
              Home
            </Link>
          </div>
          <div
            className={
              pathname === hotPath
                ? styles['active-links-text']
                : styles['links-text']
            }
          >
            <Link to={hotPath}>
              <img className={styles.icon} alt="hot" src={pathname === hotPath ? hotActive : hot} />
              Hot deals
            </Link>
          </div>
          <div
            className={
              pathname === promotionsPath
                ? styles['active-links-text']
                : styles['links-text']
            }
          >
            <Link to={promotionsPath}>
              <img className={styles.icon} alt="percent" src={pathname === promotionsPath ? percentActive : percent} />
              Promotions
            </Link>
          </div>
          <div className={
              pathname === newPath
                ? styles['active-links-text']
                : styles['links-text']
            }
          >
            <Link to={newPath}>
              <img className={styles.icon} alt="megaphone" src={pathname === newPath ? megaphoneActive : megaphone} />
              New products
            </Link>
          </div>
        </div>
        <div className={styles.contacts}>
          <img alt="phone" src={phone} />
          <div className={styles['phone-number']}>1234-5678</div>
          <div>24/7 support center</div>
        </div>
      </div>
    </div>
  );
}
