import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element.js';
import Card from '../card/card.js';
import currencyPath from '../../images/currency.svg';
import styles from './burger-constructor.module.css';
import { constructorProperties } from '../../utils/types.js';
import { InitialDataContext } from '../../context/initialdata-context.js';
import { TotalPriceContext } from '../../context/totalprice-context.js';

function BurgerConstructor({ isBurgerIngredientsVisible, handleToggle, handleModalOpen, setTitle, setContent, storeOrder }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });
  const cards = React.useContext(InitialDataContext);
  const bun = React.useMemo(() => 
    cards.filter((card) => {return card.type.includes('bun')}) 
  , [cards]);
  const bunTop = React.useMemo(() => 
    cards.filter((card) => {return card.type.includes('bun')})
  , [cards]);
  const totalPrice = React.useContext(TotalPriceContext);
  
  return(
    <section className={styles.burger}>
      {mobile 
      ?
        <>
          <ul className={styles.list}>
            {cards.filter((card) => {return card.type.includes('bun')}).map((card) => {return(
              <ListElement key={card._id}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={card}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible}
                  bun={bun}
                  bunTop={bunTop}
                />
              </ListElement>)})
            }
            {cards.slice(2).map((card) => {return(
              <ListElement key={card._id}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={card}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
                />
              </ListElement>)})
            }
            {cards.filter((card) => {return card.type.includes('bun')}).map((card) => {return(
              <ListElement key={card._id}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={card}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible}
                  bun={bun} 
                />
              </ListElement>)})
            }
          </ul>
          <div className={styles.total}>
            <div className={styles.box}>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size={mobileS ? "small" : "medium"} onClick={() => handleModalOpen(setTitle(false), setContent(false), storeOrder())}>Заказать</Button>
            </div>
          </div>
        </>
      :
        <> 
          <h1 className={styles.heading}>
            <p className="text text_type_main-large">Заказ</p>
            <Button type="primary" size="medium" onClick={handleToggle}>Назад</Button>
          </h1>
          <div className={styles.container}>
            <div className={styles.content}>
              {cards.slice(0, 1).map((card) => {return(
                <div className={styles.shell} key={card._id}>  
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={card.name + ' (верх)'}
                    price={card.price}
                    thumbnail={card.image}
                  />
                </div>)})
              }
              <ul className={styles.list}>
                {cards.slice(2).map((card) => {return(
                  <li className={styles.item} key={card._id}>
                    <div className={styles.wrapper}>
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                      text={card.name}
                      price={card.price}
                      thumbnail={card.image}
                    />
                  </li>)})
                }
              </ul>
              {cards.slice(0, 1).map((card) => {return(
                <div className={styles.shell} key={card._id}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={card.name + ' (низ)'}
                    price={card.price}
                    thumbnail={card.image}
                  />
                </div>)})
              }
            </div>
            <div className={styles.sum}>
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <img className={styles.image} src={currencyPath} alt="currency"/>
              <Button type="primary" size="large" onClick={() => handleModalOpen(setTitle(false), setContent(false), storeOrder())}>Оформить заказ</Button>
            </div>
          </div>
        </>
      }
    </section>
  );
}

BurgerConstructor.propTypes = constructorProperties.isRequired;

export default  BurgerConstructor;