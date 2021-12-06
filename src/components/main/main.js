import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './main.module.css';

function Main({ isBurgerIngredientsVisible, isBurgerConstructorVisible, handleToggle, cards }) {
  return(
    <main className={styles.main}>
      {isBurgerIngredientsVisible && <BurgerIngredients isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleToggle={handleToggle} cards={cards} />}
      {isBurgerConstructorVisible && <BurgerConstructor isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleToggle={handleToggle} cards={cards} />}
    </main>
  );
}

export default Main;
