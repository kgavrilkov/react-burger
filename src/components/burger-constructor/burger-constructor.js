import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element.js';
import Card from '../card/card.js';
import currencyPath from '../../images/currency.svg';
import styles from './burger-constructor.module.css';
import { constructorProperties } from '../../utils/types.js';
function BurgerConstructor({ isBurgerIngredientsVisible, handleToggle, cards, handleModalOpen, setTitle, setContent }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });
  const bun = React.useMemo(() => 
    cards.filter((card) => {return card.type.includes('bun')}) 
  , [cards]);
  const bunTop = React.useMemo(() => 
    cards.filter((card) => {return card.type.includes('bun')})
  , [cards]);  
  
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
                <p className="text text_type_digits-default mr-2">1255</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size={mobileS ? "small" : "medium"} onClick={() => handleModalOpen(setTitle(false), setContent(false))}>Заказать</Button>
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
              <div className={styles.shell}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={1255}
                  thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
              </div>
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
              <div className={styles.shell}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price={1255}
                  thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
              </div>
            </div>
            <div className={styles.sum}>
              <p className="text text_type_digits-medium">1255</p>
              <img className={styles.image} src={currencyPath} alt="currency"/>
              <Button type="primary" size="large" onClick={() => handleModalOpen(setTitle(false), setContent(false))}>Оформить заказ</Button>
            </div>
          </div>
        </>
      }
    </section>
  );
}

BurgerConstructor.propTypes = constructorProperties.isRequired;

export default  BurgerConstructor;