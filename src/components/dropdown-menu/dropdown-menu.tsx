import React, { FC } from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Button } from '../button/button';
import { logoutAction } from '../../services/actions/auth'; 
import styles from './dropdown-menu.module.css';

const DropdownMenu: FC = () => {
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
          <div className={styles.wrapper}>
            <p className="text text_type_main-small">Профиль</p>
          </div>
        </NavLink>
      </li>
      <li className={styles.option}>
        <NavLink className={styles.link} activeClassName={styles.active} to='/profile/orders'>
          <div className={styles.wrapper}>
            <p className="text text_type_main-small">История заказов</p>
          </div>
        </NavLink>
      </li>
      <li className={styles.option}>
        <Button type='profile' size='profile' onClick={logout}>
          <div className={styles.wrapper}>
            <p className="text text_type_main-small">Выход</p>
          </div>
        </Button>
      </li>
    </ul>
  );
}

export default  DropdownMenu;