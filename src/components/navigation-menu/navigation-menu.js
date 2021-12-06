import React from 'react';
import { NavLink } from 'react-router-dom';
import { CloseIcon, ProfileIcon, ArrowDownIcon, ArrowUpIcon, 
BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DropdownMenu from '../dropdown-menu/dropdown-menu.js';
import styles from './navigation-menu.module.css';

function NavigationMenu({ setIsNavigationMenuOpen }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen]=React.useState(false);

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
          <NavLink className={styles.link} to="#description" style={{ alignItems: 'center' }}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-small" style={{ marginLeft: 10 }}>Личный кабинет</p>
          </NavLink>
          <button className={styles.features} onClick={handleClick}>
            {isDropdownMenuOpen 
            ? 
              <ArrowUpIcon type="primary" /> 
            :
              <ArrowDownIcon type="primary" />
            }
          </button>
        </li>  
          {isDropdownMenuOpen && <DropdownMenu />}
        <li className={styles.section}>
          <NavLink className={styles.link} to="#description" style={{ alignItems: 'center' }}>
            <BurgerIcon type="secondary" />  
            <p className="text text_type_main-small text_color_inactive" style={{ marginLeft: 10 }}>Конструктор бургеров</p>
          </NavLink>  
        </li>
        <li className={styles.section}>
          <NavLink className={styles.link} to="#description" style={{ alignItems: 'center' }}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-small text_color_inactive" style={{ marginLeft: 10 }}>Лента заказов</p>
          </NavLink>  
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;