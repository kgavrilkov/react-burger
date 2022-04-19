import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Button } from '../button/button';
import { logoutAction } from '../../services/actions/auth'; 
import styles from './dropdown-menu.module.css';

function DropdownMenu() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

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
        <Button type='profile' size='profile' onClick={logout}>
          <p className="text text_type_main-small" style={{ paddingTop: 10, paddingBottom: 10 }}>Выход</p>
        </Button>
      </li>
    </ul>
  );
}

export default  DropdownMenu;