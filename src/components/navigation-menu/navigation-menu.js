import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { CloseIcon, ProfileIcon, ArrowDownIcon, ArrowUpIcon, 
BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DropdownMenu from '../dropdown-menu/dropdown-menu.js';
import styles from './navigation-menu.module.css';
import { menuProperties } from '../../utils/types.js';

function NavigationMenu({ setIsNavigationMenuOpen }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen]=React.useState(false);

  const location = useLocation();

  const handleClose = () => {
    setIsNavigationMenuOpen(false);
  }

  const handleClick = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }
  
  return(
    <nav className={styles.menu}>
      <ul className={styles.content}>
        <li className={styles.section} style={{ height: 64 }}>
          < p className="text text_type_main-large">Меню</p>
          <button className={styles.features} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
        </li>
        <li className={styles.section}>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile' style={{ alignItems: 'center' }}>
            {location.pathname === ('/profile') ? <ProfileIcon type="primary" /> 
            :location.pathname === ('/profile/orders') ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />
            }
            <p className="text text_type_main-small" style={{ marginLeft: 10 }}>Личный кабинет</p>
          </NavLink>
          <button className={styles.features} onClick={handleClick}>
            {isDropdownMenuOpen 
            ? location.pathname === ('/profile') ? <ArrowUpIcon type="primary" /> 
            : location.pathname === ('/profile/orders') ?  <ArrowUpIcon type="primary" /> : <ArrowUpIcon type="secondary" /> 
            : location.pathname === ('/profile') ? <ArrowDownIcon type="primary" /> : <ArrowDownIcon type="secondary" />
            }
          </button>
        </li>  
          {isDropdownMenuOpen && <DropdownMenu />}
        <li className={styles.section}>
          <NavLink className={styles.link} activeClassName={styles.active} exact to='/' style={{ alignItems: 'center' }}>
            {location.pathname === ('/') ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />}  
            <p className="text text_type_main-small" style={{ marginLeft: 10 }}>Конструктор бургеров</p>
          </NavLink>  
        </li>
        <li className={styles.section}>
          <NavLink className={styles.link} activeClassName={styles.active} to='/register' style={{ alignItems: 'center' }}>
            {location.pathname === ('/register') ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
            <p className="text text_type_main-small" style={{ marginLeft: 10 }}>Лента заказов</p>
          </NavLink>  
        </li>
      </ul>
    </nav>
  );
}

NavigationMenu.propTypes = menuProperties.isRequired

export default NavigationMenu;