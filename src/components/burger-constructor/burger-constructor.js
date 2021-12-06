import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element.js';
import Card from '../card/card.js';
import currencyPath from '../../images/currency.svg';
import styles from './burger-constructor.module.css';
import ingredientType from '../../utils/types.js';

function BurgerConstructor({ isBurgerIngredientsVisible, handleToggle, cards }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 340px)` });

  return(
    <section className={styles.burger}>
      {mobile 
      ?
        <>
          <ul className={styles.list}>
            {cards.map((card, id) => {return(
              <ListElement key={id}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={card}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
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
              {mobileS
              ?
                <Button type="primary" size="small">Заказать</Button>
              :  
                <Button type="primary" size="medium">Заказать</Button>
              }
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
                {cards.slice(1).map((card, id) => {return(
                  <li className={styles.item} key={id}>
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
              <Button type="primary" size="large">Оформить заказ</Button>
            </div>
          </div>
        </>
      }
    </section>
  );
}

BurgerConstructor.propTypes = ingredientType.isRequired;

export default  BurgerConstructor;