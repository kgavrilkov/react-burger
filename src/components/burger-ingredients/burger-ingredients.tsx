/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from '../../services/hooks';
import { Tab } from '../tab/tab';
import Card from '../card/card';
import { useScroll } from '../../utils/use-scroll';
import styles from './burger-ingredients.module.css';
import { TBurgerIngredients } from '../../utils/types';

const BurgerIngredients: FC<TBurgerIngredients> = ({ isBurgerIngredientsVisible }) => {
  const [current, setCurrent] = useState<string>('bun');

  const mobile: boolean = useMediaQuery({ query: `(max-width: 630px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 340px)` });
  
  const { ingredients } = useSelector((store) => store.burgerIngredients);

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
            {ingredients.filter(((card) => card.type === 'bun')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} text={''}/>
            })}
          </div>
        </li>
        <li ref={mainRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Начинки</p>
          <div className={styles.cards}>
            {ingredients.filter(((card) => card.type === 'main')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} text={''}/>
            })}
          </div>
        </li>
        <li ref={sauceRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Соусы</p>
          <div className={styles.cards}>
            {ingredients.filter(((card) => card.type === 'sauce')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} text={''}/>
            })}
          </div>
        </li>
      </ul>
    </section>
  );
}

export default  BurgerIngredients;