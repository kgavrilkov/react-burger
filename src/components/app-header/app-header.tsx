import React, { useState, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo, MenuIcon, CloseIcon, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationMenu from '../navigation-menu/navigation-menu';
import logoPath from '../../images/logo.svg';
import styles from './app-header.module.css';
import { THeader, TLocationParams }  from '../../utils/types';

const AppHeader: FC<THeader> = ({ isAppHeaderVisible, handleToggle }) => {
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState<boolean>(false);

  const desktop: boolean = useMediaQuery({ query: `(min-width: 1150px)` });
  const tablet: boolean = useMediaQuery({ query: `(max-width: 900px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 340px)` });

  const location = useLocation() as unknown as TLocationParams;

  const handleOpen = () => {
    setIsNavigationMenuOpen(true);
  }

  const onClick = () => {
    handleToggle();
    localStorage.removeItem('BurgerConstructor');
  };

  return(
    <header className={styles.header}>
      <div className={styles.logo}>
        {desktop
        ?
          <Link to='/'><Logo /></Link>
        :
          <img src={logoPath} alt="Логотип" />
        }
      </div>
      {tablet
      ?
        <>
          {mobile && isAppHeaderVisible
          ?
            <div className={styles.layer}>
              <div className={styles.title}>
                <p className={mobileS ? "text text_type_main-medium" : "text text_type_main-large"}>Заказ</p>
                <button className={styles.button} onClick={onClick}>
                  <CloseIcon type="primary" />
                </button>
              </div>
            </div>
          :
            <nav className={styles.container}>
              <Link to='/'><img src={logoPath} alt="Логотип" /></Link>
              <button className={styles.features} onClick={handleOpen}>
                <MenuIcon type="primary" />
              </button>
                {isNavigationMenuOpen && <NavigationMenu setIsNavigationMenuOpen={setIsNavigationMenuOpen} />}
            </nav>
          }
        </>    
      : 
        <nav className={styles.container}>
          <ul className={styles.navigation}>
            <li className={styles.item}>
              <NavLink className={styles.link} activeClassName={styles.active} exact to='/'>
                {location.pathname === ('/') ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />}
                <div className={styles.wrapper}>  
                  <p className="text text_type_main-default">Конструктор</p>
                </div>
              </NavLink>  
            </li>
            <li className={styles.item}>
              <NavLink className={styles.link} activeClassName={styles.active} to='/feed'>
                {location.pathname === ('/feed') ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
                {location.pathname === ('/feed') 
                  ? 
                    <div className={styles.wrapper}>
                      <p className="text text_type_main-default">Лента заказов</p>
                    </div>
                  :
                    <div className={styles.wrapper}>
                      <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                    </div>  
                }
              </NavLink>  
            </li>
          </ul>
          <ul className={styles.navigation}>
            <li className={styles.item}>
              <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
                {location.pathname === ('/profile') ? <ProfileIcon type="primary" /> 
                :location.pathname === ('/profile/orders') ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />
                }
                <div className={styles.wrapper}>
                  {location.pathname === ('/profile') ? <p className="text text_type_main-default">Личный кабинет</p>
                  :location.pathname === ('/profile/orders') ? <p className="text text_type_main-default">Личный кабинет</p>
                  :<p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                  }
                </div>
              </NavLink>
            </li> 
          </ul>
        </nav>
      }  
    </header>
  );
}

export default AppHeader;