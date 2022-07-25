import React, { FC } from "react";
import { useLocation, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import { TCardFeed, TItemIngredient, TLocationParams } from '../../../utils/types';

const Card: FC<TCardFeed> = ({ card, onClick }) => {
  const location = useLocation() as unknown as TLocationParams;

  const mobileL: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 450px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  const feedId = card['_id'];

  const items = card.ingredients;

  const ingredients: Array<TItemIngredient> = Object.values(items.reduce((acc, cur) => Object.assign(acc, {[cur.name]: cur}), {}));

  const quantity: Array<number> = Object.values(items.reduce((acc: any, ingredient) => {
    if (ingredient.type === 'bun') {
      acc[ingredient.name] = (acc[ingredient.name] || 0) + 2;
      return acc;
    }
    acc[ingredient.name] = (acc[ingredient.name] || 0) + 1;
    return acc;
  }, {}));

  const sum = ingredients.reduce((previousValue, ingredient, index) => {
    return previousValue + quantity[index] * ingredient.price;
  }, 0);
  
  return(
    <Link
      key={feedId}
      to={{
        pathname: `/feed/${feedId}`,
        state: { background: location }
      }}
      className={styles.link}
    >
      <ul className={styles.card} onClick={onClick}>
        <li className={styles.order}>
          <p className={mobileS ? styles.number : "text text_type_digits-default"}>#{card.number}</p>
          <div className={styles.wrap}>
            <p className={mobileS ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>{card.date}</p>
          </div>
        </li>
        <li className={styles.info}>
          <p className={mobileS ? styles.digit : "text text_type_main-medium"}>{card.name}</p>
        </li>
        <li className={styles.components}>
          <div className={styles.ingredients}>
            {ingredients.slice(0, 5).map((ingredient, index) => {
              const zetIndex = [5,4,3,2,1];
              return <img className={styles.image} style={{ zIndex: zetIndex[index] }} src={ingredient.link} key={ingredient._id} alt={card.name}/>
            })}
            {ingredients.slice(5, 6).map((ingredient) => {
              return (
                <div className={styles.wrapper} key={ingredient._id}>
                  <img className={styles.dim} style={{ zIndex: 0 }} src={ingredient.link} alt={card.name}/>
                  <div className={styles.shell}>
                    <p className={mobile ? "text text_type_main-small" : "text text_type_main-default"}>+{card.ingredients.length - 5}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.price}>
            <p className={mobileL ? styles.sum : "text text_type_digits-default"}>{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
    </Link>
  );
};

export default Card;