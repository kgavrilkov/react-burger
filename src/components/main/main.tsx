import React, { FC } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './main.module.css';
import { TMain } from '../../utils/types';

const Main: FC<TMain> = ({ isBurgerIngredientsVisible, isBurgerConstructorVisible, handleToggle, handleModalOpen }) => {
  return(
    <main className={styles.main}>
      {isBurgerIngredientsVisible && <BurgerIngredients isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleModalOpen={handleModalOpen} />}
      {isBurgerConstructorVisible && <BurgerConstructor isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleToggle={handleToggle} />}
    </main>
  );
}

export default Main;