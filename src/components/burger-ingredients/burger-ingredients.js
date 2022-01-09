import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Tab } from '../tab/tab';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../card/card.js';
import styles from './burger-ingredients.module.css';
import { ingredientsProperties } from '../../utils/types.js';
import { InitialDataContext } from '../../context/initialdata-context.js';
import { TotalPriceContext } from '../../context/totalprice-context.js';

function BurgerIngredients({ isBurgerIngredientsVisible, handleToggle, handleModalOpen, setTitle, setContent, handleCardClick }) {
  const [current, setCurrent] = React.useState('булки');
  const mobile = useMediaQuery({ query: `(max-width: 630px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });
  const cards = React.useContext(InitialDataContext);
  const totalPrice = React.useContext(TotalPriceContext);

  return(
    <section className={styles.burger}>
      <h1 className={styles.heading}>
        <p className={mobileS ? "text text_type_main-medium mt-4 mb-2" : mobile ? "text text_type_main-large mt-4 mb-2" : "text text_type_main-large mt-10 mb-5"}>Соберите бургер</p>
        <div className={styles.wrapper}>
          <Button type="primary" size="medium" onClick={handleToggle}>Смотреть заказ</Button>
        </div>
      </h1>
      <div className={styles.tabs}>
        <a style={{ textDecoration: 'none' }} href="#bun">
          <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Булки</p>
          </Tab>
        </a>  
        <a style={{ textDecoration: 'none' }} href="#sauce">
          <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Соусы</p>
          </Tab>
        </a>
        <a style={{ textDecoration: 'none' }} href="#main">
          <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Начинки</p>
          </Tab>
        </a>
      </div>
      <ul className={styles.container}>
        <li id="bun">
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Булки</p>
          <div className={styles.cards} onClick={() => handleModalOpen(setTitle('Детали ингредиента'), setContent(true))}>
            {cards.filter((card) => {return card.type.includes('bun')}).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleCardClick={handleCardClick} />
            })}
          </div>
        </li>
        <li id="sauce">
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Соусы</p>
          <div className={styles.cards} onClick={() => handleModalOpen(setTitle('Детали ингредиента'), setContent(true))}>
            {cards.filter((card) => {return card.type.includes('sauce')}).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleCardClick={handleCardClick} />
            })}
          </div>
        </li>
        <li id="main">
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Начинки</p>
          <div className={styles.cards} onClick={() => handleModalOpen(setTitle('Детали ингредиента'), setContent(true))}>
            {cards.filter((card) => {return card.type.includes('main')}).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} handleCardClick={handleCardClick} />
            })}
          </div>
        </li>
      </ul>
      <div className={styles.sum}>
        <div className={styles.box}>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size={mobileS ? "small" : "medium"} onClick={handleToggle}>Смотреть заказ</Button>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = ingredientsProperties.isRequired;

export default  BurgerIngredients;