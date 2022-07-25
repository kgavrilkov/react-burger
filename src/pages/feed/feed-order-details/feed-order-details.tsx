import React, { FC } from "react";
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-order-details.module.css';
import { TFeedOrder, TLocationParams, TItemIngredient } from '../../../utils/types';

const FeedOrderDetails: FC<TFeedOrder> = ({ card }) => {
  const location = useLocation() as unknown as TLocationParams;

  const background = location.state && location.state.background;

  const mobileL: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });

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
    <>
      <div className={background ? styles.number : styles.index}>
        <p className="text text_type_digits-default">#{card && card.number}</p>
      </div>
      <div className={background ? styles.container : styles.box}>
        {mobile && background ? <p className={styles.figure}>#{card && card.number}</p> : null}
        <p className={mobile ? styles.name : "text text_type_main-medium"}>{card && card.name}</p>
        <div className={card.status === 'done' ? styles.wrapper : styles.frame}>
          <p className={mobile ? "text text_type_main-small" : "text text_type_main-default"}>{card && card.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
        </div>
        <p className={mobile ? styles.content : "text text_type_main-medium"}>Состав:</p>
        <ul className={mobileS ? ingredients.length === 5 ? styles.listing : ingredients.length > 3 ? styles.list : styles.enum : mobile ? ingredients.length > 7 ? styles.list : styles.enum : ingredients.length > 4 ? styles.list : styles.enum}>
          {ingredients.map((ingredient, index) => {return (
            <li className={styles.item} key={ingredient._id}>
              <img className={styles.image} src={ingredient.link} alt={ingredient.name}/>
              <div className={styles.shell}>
                <p className={mobileL ? "text text_type_main-small" : "text text_type_main-default"}>{ingredient.name}</p>
              </div>
              <div className={styles.price}>
                <p className={mobileL ? styles.digit : "text text_type_digits-default mr-2"}>{quantity[index]} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )})}
        </ul>
        <div className={background ? styles.total : styles.sum}>
          <p className={mobileL ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>{card && card.date}</p>
          <div className={styles.cost}>
            <p className={mobileL ? styles.digit : "text text_type_digits-default mr-2"}>{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  )
};

export default FeedOrderDetails;