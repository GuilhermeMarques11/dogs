import React from 'react';
import styles from './Footer.module.css';
import Dogs from '../Assets/dogs-footer.svg?react';

const Footer = () => {
  return <section className={styles.footer}>
    <Dogs />
    <p>Powered by Guilherme Marques</p>
  </section>;
};

export default Footer;
