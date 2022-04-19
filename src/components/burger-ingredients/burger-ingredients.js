import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../tab/tab';
import Card from '../card/card.js';
import { getItems } from '../../services/actions/index.js';
import { GET_ITEM_TO_VIEW } from '../../services/actions/item-to-view.js';
import { useScroll } from '../use-scroll/use-scroll.js';
import styles from './burger-ingredients.module.css';
import { ingredientsProperties } from '../../utils/types.js';

function BurgerIngredients({ isBurgerIngredientsVisible, handleModalOpen }) {
  const [current, setCurrent] = React.useState('bun');

  const mobile = useMediaQuery({ query: `(max-width: 630px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });
  
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const dispatch = useDispatch();

  const bunRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const parentRef = React.useRef();

  const clickTabBun = () => {
    setCurrent('bun');
    bunRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  const clickTabMain = () => {
    setCurrent('main');
    mainRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  const clickTabSauce = () => {
    setCurrent('sauce');
    sauceRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  useScroll(parentRef, bunRef, () => activeTab('bun'));
  useScroll(parentRef, mainRef, () => activeTab('main'));
  useScroll(parentRef, sauceRef, () => activeTab('sauce'));

  function activeTab(elem) {
    setCurrent(elem);
  }
  
  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleCardOpen = (card) => {
    dispatch({
      type: GET_ITEM_TO_VIEW,
      payload: card
    });
  };

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
            {ingredients.filter((card => card.type === 'bun')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible}  onClick={() => handleModalOpen(handleCardOpen(card))}/>
            })}
          </div>
        </li>
        <li ref={mainRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Начинки</p>
          <div className={styles.cards}>
            {ingredients.filter((card => card.type === 'main')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} onClick={() => handleModalOpen(handleCardOpen(card))}/>
            })}
          </div>
        </li>
        <li ref={sauceRef}>
          <p className={mobileS ? "text text_type_main-default ml-2" : mobile ? "text text_type_main-medium ml-2" : "text text_type_main-medium"}>Соусы</p>
          <div className={styles.cards}>
            {ingredients.filter((card => card.type === 'sauce')).map((card) => {
              return <Card card={card} key={card._id} isBurgerIngredientsVisible={isBurgerIngredientsVisible} onClick={() => handleModalOpen(handleCardOpen(card))}/>
            })}
          </div>
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = ingredientsProperties.isRequired;

export default  BurgerIngredients;