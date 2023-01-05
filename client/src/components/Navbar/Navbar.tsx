import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Searchbar from '../Dropdown/Searchbar';
import hot from '../../assets/icon_hotjar.svg';
import home from '../../assets/icon_home.svg';
import homeGreen from '../../assets/icon_home_green.svg';
import percent from '../../assets/percent.svg';
import megaphone from '../../assets/icon_megaphone.svg';
import phone from '../../assets/icon_phone.svg';
import logo from '../../assets/logo.svg';
import styles from './Navbar.module.sass';

export default function Navbar() {
  const { pathname } = useLocation();
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
          <Dropdown hasChildrenClose={false}>
            <div>Cart</div>
          </Dropdown>
          <p>Cart</p>
        </div>
        <div>
          <Dropdown hasChildrenClose={false}>
            <div>Profile</div>
          </Dropdown>
          profile
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
          <div className={styles['links-text']}>
            <img className={styles.icon} alt="hot" src={hot} />
            Hot deals
          </div>
          <div className={styles['links-text']}>
            <img className={styles.icon} alt="percent" src={percent} />
            Promotions
          </div>
          <div className={styles['links-text']}>
            <img className={styles.icon} alt="megaphone" src={megaphone} />
            New products
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
