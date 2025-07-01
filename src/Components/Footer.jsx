import React from 'react';
import styles from './Footer.module.css';
import Dogs from '../Assets/dogs-footer.svg?react';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <Dogs />
      <p>
        Powered by{' '}
        <a href="https://github.com/GuilhermeMarques11" target="_blank">
          Guilherme Marques
        </a>
      </p>
    </section>
  );
};

export default Footer;
