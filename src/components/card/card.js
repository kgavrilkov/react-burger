import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Counter, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';

function Card({ card, isBurgerIngredientsVisible }) {
  const mobileS = useMediaQuery({ query: `(max-width: 430px)` });

  const cssRules1 = {
    flexDirection: 'row',
    width: 290,
  };

  const cssRules2 = {
    width: 52,
    height: 40,
  };

  const cssRules3 = {
    width: 165,
    marginTop: 16,
    marginRight: 8,
    marginBottom: 16,
    marginLeft: 8,
    textAlign: 'left',
  };

  const cssRules4 = {
    marginRight: 8,
  };

  return(
    <>
      {isBurgerIngredientsVisible
      ?
        <ul className={styles.card}>
          <li>
            <img className={styles.image} src={card.image} alt={card.name} />
          </li>
          <li className={styles.counter}>
            {mobileS
            ?
              <Counter count={1} size="small" />
            :
              <Counter count={1} size="default" />
            }
          </li>
          <li className={styles.price}>
            <p className={mobileS ? "text text_type_main-default mr-2" : "text text_type_digits-default mr-2"}>{card.price}</p>
            <CurrencyIcon type="primary" />
          </li>
          <li className={styles.name}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>{card.name}</p>
          </li>
          <li className={styles.button}>
            <Button type="secondary" size="small">Добавить</Button>
          </li>
        </ul>
      :
        <div>
          <ul className={styles.card} style={cssRules1}>
            <li>
              <img className={styles.image} style={cssRules2}  src={card.image} alt={card.name} />
            </li>
            <li className={styles.name} style={cssRules3}>
              <p className="text text_type_main-small">{card.name}</p>
            </li>
            <li className={styles.price} style={cssRules4}>
              <p className="text text_type_main-default mr-2">{card.price}</p>
              <CurrencyIcon type="primary" />
            </li>
          </ul>
          <hr className={styles.line}></hr>
        </div>
      }
    </>
  );
}

export default Card;