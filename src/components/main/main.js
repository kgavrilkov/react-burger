import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from './main.module.css';
import { mainProperties } from '../../utils/types.js';

function Main({ isBurgerIngredientsVisible, isBurgerConstructorVisible, handleToggle, handleModalOpen, setTitle, setContent, handleCardClick }) {
  return(
    <main className={styles.main}>
      {isBurgerIngredientsVisible && <BurgerIngredients isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleToggle={handleToggle} handleModalOpen={handleModalOpen} setTitle={setTitle} setContent={setContent} handleCardClick={handleCardClick} />}
      {isBurgerConstructorVisible && <BurgerConstructor isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleToggle={handleToggle} />}
    </main>
  );
}

Main.propTypes = mainProperties.isRequired

export default Main;
