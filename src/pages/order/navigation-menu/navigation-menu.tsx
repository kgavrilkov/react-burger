import React, { FC } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from '../../../services/hooks';
import { Button } from '../../../components/button/button';
import { logoutAction } from '../../../services/actions/auth';
import styles from './navigation-menu.module.css';

const NavigationMenu: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const tablet: boolean = useMediaQuery({ query: `(max-width: 900px)` });

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return(
    <>
      {tablet
      ?
        null
      :  
        <section className={styles.content}>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
            {location.pathname === ('/profile') 
              ?
                <p className="text text_type_main-medium">Профиль</p>
              :
                <p className="text text_type_main-medium text_color_inactive">Профиль</p>
            }
          </NavLink>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile/orders'>
            История заказов
          </NavLink>
          <Button type="profile" size='profile' onClick={logout}>
            Выход
          </Button>
          <div className={styles.wrapper}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </section>
      }
    </>
  );
};

export default NavigationMenu;