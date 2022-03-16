import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './dropdown-menu.module.css';

function DropdownMenu() {
  return(
    <ul className={styles.dropdown}>
      <li className={styles.option}>
        <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
          <p className="text text_type_main-small" style={{ paddingTop: 10, paddingBottom: 10 }}>Профиль</p>
        </NavLink>
      </li>
      <li className={styles.option}>
        <NavLink className={styles.link} activeClassName={styles.active} to='/profile/orders'>
          <p className="text text_type_main-small" style={{ paddingTop: 10, paddingBottom: 10 }}>История заказов</p>
        </NavLink>
      </li>
      <li className={styles.option}>
        <NavLink className={styles.link} activeClassName={styles.active} exact to='/'>
          <p className="text text_type_main-small" style={{ paddingTop: 10, paddingBottom: 10 }}>Выход</p>
        </NavLink>
      </li>
    </ul>
  );
}

export default  DropdownMenu;