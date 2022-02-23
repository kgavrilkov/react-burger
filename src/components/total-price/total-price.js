import React from "react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyPath from '../../images/currency.svg';
import { getNumber } from '../../services/actions/order.js';
import styles from './total-price.module.css';
import { priceProperties } from '../../utils/types.js';

function TotalPrice({ isBurgerConstructorVisible, handleToggle, handleModalOpen, setTitle, setContent }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  
  const { constructorIngredients } = useSelector(store => store.constructorIngredients);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    let total = 0;
    constructorIngredients.map(item => 
      item.type === 'bun' ? (total += item.price * 2) : (total += item.price)
    );
    return total;
  };

  const totalPrice = getTotalPrice(constructorIngredients);

  const buns = React.useMemo(() => 
    constructorIngredients.find((card => card.type === 'bun')) 
  , [constructorIngredients]);
  const notBuns = React.useMemo(() => 
    constructorIngredients.find((card => card.type !== 'bun')) 
  , [constructorIngredients]);

  const getRequestNumber = () => {
    const ingredientsId = [];
    constructorIngredients.map((item) => ingredientsId.push(item._id));
    dispatch(getNumber(ingredientsId));
  };

  return(
    <div className={isBurgerConstructorVisible ? styles.total : styles.sum}>
      <div className={styles.box}>
        <div className={styles.price}>
          <p className={mobile ? "text text_type_digits-default mr-2" : "text text_type_digits-medium"}>{totalPrice}</p>
          {mobile ? <CurrencyIcon type="primary" /> : <img className={styles.image} src={currencyPath} alt="currency"/>}
        </div>
        {isBurgerConstructorVisible 
        ? 
        buns && notBuns && <Button type="primary" size={mobile ? "small" : "large"} onClick={() => handleModalOpen(setTitle(false), setContent(false), getRequestNumber())}>{mobile ? "Заказать" : "Оформить заказ"}</Button>
        :
        <Button type="primary" size={mobile ? "small" : "medium"} onClick={handleToggle}>Смотреть заказ</Button>
        }
      </div>
    </div>
  );
}

TotalPrice.propTypes = priceProperties.isRequired;

export default TotalPrice;