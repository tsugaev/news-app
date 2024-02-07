import React from 'react';

import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>HackerNews</div>
    </header>
  );
};

export default Header;
