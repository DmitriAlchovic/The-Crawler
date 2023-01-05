import React from 'react';
import payment from '../../assets/payment.svg';
import facebook from '../../assets/icon _facebook_.svg';
import linkedin from '../../assets/icon _linkedin_.svg';
import telegram from '../../assets/icon _telegram plane_.svg';
import insta from '../../assets/icon _instagram_.svg';
import twitter from '../../assets/icon _twitter_.svg';
import location from '../../assets/icon_location.svg';
import phone from '../../assets/icon_phone.svg';
import envelope from '../../assets/icon_envelope.svg';
import clock from '../../assets/icon_clock.svg';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.sass';

export default function Footer() {
  return (
    <div>
      <div className={styles['footer-body']}>
        <div>
          <div className={styles.logo}>
            <img className={styles.icon} alt="logo" src={logo} />
            Grocery
          </div>
          <div className={styles.contacts}>
            <img className={styles.icon} alt="location" src={location} />
            Address: 4242 Road House
          </div>
          <div className={styles.contacts}>
            <img className={styles.icon} alt="phone" src={phone} />
            Call Us: 1234-5678
          </div>
          <div className={styles.contacts}>
            <img className={styles.icon} alt="mail" src={envelope} />
            Email: grocery@contact.com
          </div>
          <div>
            <img className={styles.icon} alt="clock" src={clock} />
            Work hours: 8:00 - 20:00, Sunday - Thursday
          </div>
        </div>
        <div>
          <div className={styles['info-header']}>Account</div>
          <div className={styles.info}>Cart</div>
          <div className={styles.info}>Account info</div>
        </div>
        <div>
          <div className={styles['info-header']}>Useful links</div>
          <div className={styles.info}>Hot deals</div>
        </div>
      </div>
      <div className={styles['footer-body']}>
        <div>© 2022, All rights reserved</div>
        <div>
          <img alt="payment systems" src={payment} />
        </div>
        <div>
          <img alt="facebook" src={facebook} />
          <img alt="linkedin" src={linkedin} />
          <img alt="telegram" src={telegram} />
          <img alt="instagram" src={insta} />
          <img alt="twitter" src={twitter} />
        </div>
      </div>
    </div>
  );
}
