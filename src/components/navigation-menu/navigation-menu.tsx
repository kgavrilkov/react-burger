import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { CloseIcon, ProfileIcon, ArrowDownIcon, ArrowUpIcon, 
BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import styles from './navigation-menu.module.css';
import { TNavigationMenu, TLocationParams } from '../../utils/types';

const NavigationMenu: FC<TNavigationMenu> = ({ setIsNavigationMenuOpen }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);

  const location = useLocation() as unknown as TLocationParams;

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
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
            {location.pathname === ('/profile') ? <ProfileIcon type="primary" /> 
            :location.pathname === ('/profile/orders') ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />
            }
            <div className={styles.wrapper}>
              <p className="text text_type_main-small">Личный кабинет</p>
            </div>
          </NavLink>
          <button className={styles.features} onClick={handleClick}>
            {isDropdownMenuOpen 
            ? location.pathname === ('/profile') ? <ArrowUpIcon type="primary" />
            : location.pathname === ('/profile/orders') ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />  
            : location.pathname === ('/profile') ? <ArrowDownIcon type="primary" /> : <ArrowDownIcon type="secondary" />
            }
          </button>
        </li>  
          {isDropdownMenuOpen && <DropdownMenu />}
        <li className={styles.section}>
          <NavLink className={styles.link} activeClassName={styles.active} exact to='/'>
            {location.pathname === ('/') ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />}
            <div className={styles.wrapper}>
              <p className="text text_type_main-small">Конструктор бургеров</p>
            </div>
          </NavLink>  
        </li>
        <li className={styles.section}>
          <Link className={styles.link} /*activeClassName={styles.active}*/ to='#'>
            {location.pathname === ('/register') ? <ListIcon type="secondary" /> : <ListIcon type="secondary" />}
            <div className={styles.wrapper}>
              <p className="text text_type_main-small">Лента заказов</p>
            </div>
          </Link>  
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;