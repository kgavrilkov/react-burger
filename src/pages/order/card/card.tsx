import React, { FC } from "react";
import { useLocation, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from '../../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formattedDate } from '../../../utils/formatted-date';
import styles from './card.module.css';
import { TCardFeed, TIngredient, TLocationParams } from '../../../utils/types';
import { TRootState } from '../../../services/store';

const Card: FC<TCardFeed> = ({ card, onClick }) => {
  const location = useLocation() as unknown as TLocationParams;

  const mobileL: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 450px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  const orderId = card['_id'];

  const createdAt = card.createdAt;

  const date = formattedDate(createdAt);

  const { ingredients } = useSelector((store: TRootState) => store.burgerIngredients);

  const ingredientsData: Array<TIngredient> = card.ingredients.reduce((acc: any, item) => {
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

  const sum = ingredientsInfoWithoutDuplicatedBuns.reduce((previousValue, ingredient) => {
    if (ingredient.type === 'bun') {
      return previousValue + ingredient.price * 2;
    } else {
      return previousValue + ingredient.price;
    }
  }, 0);
  
  return(
    <Link
      key={orderId}
      to={{
        pathname: `/profile/orders/${orderId}`,
        state: { background: location }
      }}
      className={styles.link}
    >
      <div className={styles.container}>
        <ul className={styles.card} onClick={onClick}>
          <li className={styles.order}>
            <p className={mobileS ? styles.number : "text text_type_digits-default"}>#{card.number}</p>
            <div className={styles.wrap}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>{date}</p>
            </div>
          </li>
          <li className={styles.info}>
            <p className={mobileS ? styles.digit : "text text_type_main-medium"}>{card.name}</p>
          </li>
          <li className={card.status === 'done' ? styles.box : styles.frame}>
            <p className={mobile ? "text text_type_main-small" : "text text_type_main-default"}>{card.status === 'done' ? 'Выполнен' : 'pending' ? 'Готовится' : 'Создан'}</p>
          </li>
          <li className={styles.components}>
            <div className={styles.ingredients}>
              {ingredientsInfoWithoutDuplicatedBuns.slice(0, 5).map((ingredient, index) => {
                const zetIndex = [5,4,3,2,1];
                return <img className={styles.image} style={{ zIndex: zetIndex[index] }} src={ingredient.image} key={index} alt={card.name}/>
              })}
              {ingredientsInfoWithoutDuplicatedBuns.slice(5, 6).map((ingredient, index) => {
                return (
                  <div className={styles.wrapper} key={index}>
                    <img className={styles.dim} style={{ zIndex: 0 }} src={ingredient.image} alt={card.name}/>
                    <div className={styles.shell}>
                      <p className={mobile ? "text text_type_main-small" : "text text_type_main-default"}>+{card.ingredients.length - 5}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.price}>
              <div className={styles.wrapping}>
                <p className={mobileL ? styles.sum : "text text_type_digits-default mr-2"}>{sum}</p>
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default Card;