import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Button, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_INGREDIENT } from '../../services/actions/constructor-ingredients.js';
import styles from './card.module.css';
import { TCard, TLocationParams, TIngredient } from '../../utils/types';

const Card: FC<TCard> = ({ card, isBurgerIngredientsVisible, text, onClick }) => {
  const { constructorIngredients } = useSelector((store: any) => store.constructorIngredients);

  const dispatch = useDispatch();
  const location = useLocation() as unknown as TLocationParams;

  const ingredientId = card['_id'];

  const mobileS: boolean = useMediaQuery({ query: `(max-width: 430px)` });

  const cssRules1: object = {
    flexDirection: 'row',
    width: 290,
  };

  const cssRules2: object = {
    width: 52,
    height: 40,
  };

  const cssRules3: object = {
    width: 165,
    marginTop: 16,
    marginRight: 8,
    marginBottom: 16,
    marginLeft: 8,
    textAlign: 'left',
  };

  const cssRules4: object = {
    marginRight: 8,
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: card,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  const getTotalCount = () => {
    let total = 0
    constructorIngredients.forEach((item: TIngredient) => 
      item.name === card.name && (card.type === 'bun' ? total += 2 : total += 1)
    );
    return total;
  };

  const totalCount = getTotalCount();

  const handleAddClick = (item: TIngredient) => {
    dispatch({
      type: ADD_INGREDIENT,
      payload: {...item, key: uuidv4()}
    });  
  };

  return(
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location }
      }}
      className={styles.link} 
    >
      {isBurgerIngredientsVisible
      ?
        <ul className={styles.card} style={{opacity}} ref={dragRef}>
          <li onClick={onClick}>
            <img className={styles.image} src={card.image} alt={card.name} />
          </li>
          <li className={styles.counter}>
            {totalCount ? <Counter count={totalCount} size={mobileS ? "small" : "default"} /> : null}
          </li>
          <li className={styles.price}>
            <p className={mobileS ? "text text_type_main-default mr-2" : "text text_type_digits-default mr-2"}>{card.price}</p>
            <CurrencyIcon type="primary" />
          </li>
          <li className={styles.name}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>{card.name}</p>
          </li>
          <li className={styles.button}>
            <Button type="secondary" size="small" onClick={(e) => handleAddClick(card)}>????????????????</Button>
          </li>
        </ul>
      :
        <div>
          <ul className={styles.card} style={cssRules1}>
            <li>
              <img className={styles.image} style={cssRules2}  src={card.image} alt={card.name} />
            </li>
            <li className={styles.name} style={cssRules3}>
              <p className="text text_type_main-small">{text}</p> 
            </li>
            <li className={styles.price} style={cssRules4}>
              <p className="text text_type_main-default mr-2">{card.price}</p>
              <CurrencyIcon type="primary" />
            </li>
          </ul>
          <hr className={styles.line}></hr>
        </div>
      }
    </Link>
  );
}

export default Card;