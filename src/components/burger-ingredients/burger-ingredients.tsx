/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../tab/tab';
import Card from '../card/card';
import { getItems } from '../../services/actions/index.js';
import { GET_ITEM_TO_VIEW } from '../../services/actions/item-to-view.js';
import { useScroll } from '../use-scroll/use-scroll';
import styles from './burger-ingredients.module.css';
import { TBurgerIngredients, TIngredient } from '../../utils/types';

const BurgerIngredients: FC<TBurgerIngredients> = ({ isBurgerIngredientsVisible, handleModalOpen }) => {
  const [current, setCurrent] = useState<string>('bun');

  const mobile: boolean = useMediaQuery({ query: `(max-width: 630px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 340px)` });
  
  const { ingredients } = useSelector((store: any) => store.burgerIngredients);
  const dispatch = useDispatch();

  const bunRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const parentRef = useRef<HTMLUListElement>(null);

  const clickTabBun = () => {
    setCurrent('bun');
    if (bunRef && bunRef.current) {
      bunRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };
  const clickTabMain = () => {
    setCurrent('main');
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };
  const clickTabSauce = () => {
    setCurrent('sauce');
    if (sauceRef && sauceRef.current) {
      sauceRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  useScroll(parentRef, bunRef, () => activeTab('bun'));
  useScroll(parentRef, mainRef, () => activeTab('main'));
  useScroll(parentRef, sauceRef, () => activeTab('sauce'));

  function activeTab(elem: React.SetStateAction<string>) {
    setCurrent(elem);
  }
  
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleCardOpen = (card: TIngredient) => {
    dispatch({
      type: GET_ITEM_TO_VIEW,
      payload: card
    });
    localStorage.setItem('card', JSON.stringify(card));
  };

  useEffect(() => {
    const value = localStorage.getItem('card');
    if (typeof value === 'string') {
      const card = JSON.parse(value)
      if (card) {
        handleModalOpen(handleCardOpen(card));
      }
    }
  }, []);

  return(
    <section className={styles.burger}>
      <h1 className={styles.heading}>
        <p className={mobileS ? "text text_type_main-medium mt-4 mb-2" : mobile ? "text text_type_main-large mt-4 mb-2" : "text text_type_main-large mt-10 mb-5"}>Соберите бургер</p>
      </h1>
      <div className={styles.tabs}>
        <Tab value='bun' active={current === 'bun'} onClick={clickTabBun}>
          <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Булки</p>
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={clickTabMain}>
          <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Начинки</p>
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={clickTabSauce}>
          <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Соусы</p>
        </Tab>
      </div>
      <ul className={styles.container} ref={parentRef}>
        <li ref={bunRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Булки</p>
          <div className={styles.cards}>
            {ingredients.filter(((card: TIngredient) => card.type === 'bun')).map((card: TIngredient) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} onClick={() => handleModalOpen(handleCardOpen(card))} text={''}/>
            })}
          </div>
        </li>
        <li ref={mainRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Начинки</p>
          <div className={styles.cards}>
            {ingredients.filter(((card: TIngredient) => card.type === 'main')).map((card: TIngredient) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} onClick={() => handleModalOpen(handleCardOpen(card))} text={''}/>
            })}
          </div>
        </li>
        <li ref={sauceRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Соусы</p>
          <div className={styles.cards}>
            {ingredients.filter(((card: TIngredient) => card.type === 'sauce')).map((card: TIngredient) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} onClick={() => handleModalOpen(handleCardOpen(card))} text={''}/>
            })}
          </div>
        </li>
      </ul>
    </section>
  );
}

export default  BurgerIngredients;