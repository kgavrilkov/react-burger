import React, { FC, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../services/hooks';
import { useMediaQuery } from 'react-responsive';
import { getOrder } from '../../../services/actions/order-by-number';
import { formattedDate } from '../../../utils/formatted-date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-order-details.module.css';
import { TLocationParams, TIngredient } from '../../../utils/types';

const FeedOrderDetails: FC = () => {
  const { orderNumber } = useParams();
  const dispatch = useDispatch();
  const location = useLocation() as unknown as TLocationParams;

  const background = location.state && location.state.background;
  
  const tabletL: boolean = useMediaQuery({ query: `(max-width: 1100px)` });
  const tablet: boolean = useMediaQuery({ query: `(max-width: 800px)` });
  const mobileL: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });

  const card = useSelector((store) => {
    const cardFeed = store.feed.orders.find((o) => (''+ o.number) === orderNumber);
    if (cardFeed) return cardFeed
    const cardOrder = store.orders.orders.find((o) => (''+ o.number) === orderNumber);
    if (cardOrder) return cardOrder
    return null;
  })!;

  useEffect(() => {
    if (!card) {
      dispatch(getOrder(orderNumber));
    }
  }, [card, dispatch, orderNumber]);

  const { ingredients } = useSelector((store) => store.burgerIngredients);
  if (!card || !ingredients.length) return null

  const createdAt = card.createdAt;

  const date = formattedDate(createdAt);

  const ingredientsData: Array<TIngredient> = card.ingredients.reduce((acc: Array<TIngredient>, item) => {
    const ingredient = ingredients.find(element => element._id === item);
    if (ingredient) {
      acc.push(ingredient);
    }
    return acc
  }, []);

  ingredientsData.sort((a, b) => {
    a.type.toLowerCase();
    b.type.toLowerCase();
    if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
    if (b.type.toLowerCase() < a.type.toLowerCase()) return 1;
    return 0;
  });

  const ingredientsInfo = ingredientsData.filter((item, index) => {
    if (item.type === 'bun') {
      return ingredientsData.indexOf(item) === index;
    } else {
      return ingredientsData;
    }
  });

  const duplicatedBuns = ingredientsInfo.filter(item => item.type === 'bun');

  const notBuns = ingredientsInfo.filter(item => item.type !== 'bun');

  const removeDuplicates = (originalArray: any, prop: any) => {
    const newArray = [];
    const lookupObject: any = {};

    for(let i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

  const buns = removeDuplicates(duplicatedBuns, 'type');

  const bun1 = ingredients.find(item => item.name === 'Краторная булка N-200i');
  const bun2 = ingredients.find(item => item.name === 'Флюоресцентная булка R2-D3');

  if (buns.indexOf(bun1) === -1 && buns.indexOf(bun2) === -1) {
    if (bun2) {
      buns.push(bun2);
    }
  }

  const ingredientsInfoWithoutDuplicatedBuns = buns.concat(notBuns);

  const total: any = [];

  ingredientsInfoWithoutDuplicatedBuns.map((obj) => {
    const index = total.findIndex((item: { _id: any; }) => item._id === obj._id);
    if (index === -1) {
      return total.push(obj);
    } else {
      return total[index].value += obj.value;
    }  
  });

  const quantity: any = Object.values(ingredientsInfoWithoutDuplicatedBuns.reduce((acc, ingredient) => {
    if (ingredient.type === 'bun') {
      acc[ingredient.name] = (acc[ingredient.name] || 0) + 2;
      return acc;
    }
    acc[ingredient.name] = (acc[ingredient.name] || 0) + 1;
    return acc;
  }, {}));

  const sum = ingredientsInfoWithoutDuplicatedBuns.reduce((previousValue, ingredient) => {
    if (ingredient.type === 'bun') {
      return previousValue + ingredient.price * 2;
    } else {
      return previousValue + ingredient.price;
    }
  }, 0);

  return(
    <>
      <div className={background ? styles.number : styles.index}>
        <p className="text text_type_digits-default">#{card && card.number}</p>
      </div>
      <div className={background ? styles.container : styles.box}>
        {mobile && background ? <p className={styles.figure}>#{card && card.number}</p> : null}
        <p className={mobileS ? "text text_type_main-default" : mobile ? total.length > 6 ? "text text_type_main-default" : styles.name : tablet ? "text text_type_main-medium" : tabletL ? total.length > 6 ? styles.name : "text text_type_main-medium" : "text text_type_main-medium"}>{card && card.name}</p>
        <div className={card.status === 'done' ? styles.wrapper : styles.frame}>
          <p className={mobile ? "text text_type_main-small" : "text text_type_main-default"}>{card && card.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
        </div>
        <p className={mobile ? styles.content : "text text_type_main-medium"}>Состав:</p>
        <ul className={mobileS ? total.length > 3 ? styles.list : styles.enum : mobile ? total.length > 6 ? styles.list : styles.enum : total.length > 4 ? styles.list : styles.enum}>
          {total.map((ingredient: TIngredient, index: number) => {
            return (
              <li className={styles.item} key={index}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
                <div className={styles.shell}>
                  <p className={mobileL ? "text text_type_main-small" : "text text_type_main-default"}>{ingredient.name}</p>
                </div>
                <div className={styles.price}>
                  <p className={mobileL ? styles.digit : "text text_type_digits-default mr-2"}>{quantity[index]} x {ingredient.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={background ? styles.total : styles.sum}>
          <div className={styles.wrap}>
            <p className={mobileL ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>{date}</p>
          </div>
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