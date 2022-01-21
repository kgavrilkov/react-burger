import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ListElement from '../list-element/list-element.js';
import Card from '../card/card.js';
import styles from './burger-constructor.module.css';
import { constructorProperties } from '../../utils/types.js';
import { InitialDataContext } from '../../context/initialdata-context.js';

function BurgerConstructor({ isBurgerIngredientsVisible, handleToggle }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  const cards = React.useContext(InitialDataContext);
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
            {cards.filter((card) => {return card.type.includes('bun')}).map((card, index) => {return(
              <ListElement key={index}>
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
            {cards.slice(2).map((card, index) => {return(
              <ListElement key={index}>
                <div className={styles.wrapper}>
                  <DragIcon type="primary" />
                </div>
                <Card
                  card={card}
                  isBurgerIngredientsVisible={isBurgerIngredientsVisible} 
                />
              </ListElement>)})
            }
            {cards.filter((card) => {return card.type.includes('bun')}).map((card, index) => {return(
              <ListElement key={index}>
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
        </>
      :
        <> 
          <h1 className={styles.heading}>
            <p className="text text_type_main-large">Заказ</p>
            <Button type="primary" size="medium" onClick={handleToggle}>Назад</Button>
          </h1>
          <div className={styles.container}>
            <div className={styles.content}>
              {cards.slice(0, 1).map((card, index) => {return(
                <div className={styles.shell} key={index}>  
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
                {cards.slice(2).map((card, index) => {return(
                  <li className={styles.item} key={index}>
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
              {cards.slice(0, 1).map((card, index) => {return(
                <div className={styles.shell} key={index}>
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
          </div>
        </>
      }
    </section>
  );
}

BurgerConstructor.propTypes = constructorProperties.isRequired;

export default  BurgerConstructor;