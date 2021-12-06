import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { Logo, MenuIcon, CloseIcon, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationMenu from '../navigation-menu/navigation-menu.js';
import logoPath from '../../images/logo.svg';
import styles from './app-header.module.css';

function AppHeader({ isAppHeaderVisible, handleToggle }) {
  const [isNavigationMenuOpen, setIsNavigationMenuOpen]=React.useState(false);
  const desktop = useMediaQuery({ query: `(min-width: 1150px)` });
  const tablet = useMediaQuery({ query: `(max-width: 900px)` });
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });

  const handleOpen = () => {
    setIsNavigationMenuOpen(true);
  }

  return(
    <header className={styles.header}>
      <div className={styles.logo}>
        {desktop
        ?
          <Logo />
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
                <button className={styles.button} onClick={handleToggle}>
                  <CloseIcon type="primary" />
                </button>
              </div>
            </div>
          :
            <nav className={styles.container}>
              <img src={logoPath} alt="Логотип" />
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
              <NavLink className={styles.link} to="#description">
                <BurgerIcon type="primary" />  
                <p className="text text_type_main-default" style={{ marginLeft: 10 }}>Конструктор</p>
              </NavLink>  
            </li>
            <li className={styles.item}>
              <NavLink className={styles.link} to="#description">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive" style={{ marginLeft: 10 }}>Лента заказов</p>
              </NavLink>  
            </li>
          </ul>
          <ul className={styles.navigation}>
            <li className={styles.item}>
              <NavLink className={styles.link} to="#description">
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive" style={{ marginLeft: 10 }}>Личный кабинет</p>
              </NavLink>
            </li> 
          </ul>
        </nav>
      }  
    </header>
  );
}

export default AppHeader;