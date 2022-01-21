import React from "react";
import { useMediaQuery } from 'react-responsive';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyPath from '../../images/currency.svg';
import styles from './total-price.module.css';
import { priceProperties } from '../../utils/types.js';

function TotalPrice({ isBurgerConstructorVisible, handleToggle, handleModalOpen, setTitle, setContent, storeOrder, totalPrice }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });

  return(
    <div className={isBurgerConstructorVisible ? styles.total : styles.sum}>
      <div className={styles.box}>
        <div className={styles.price}>
          <p className={mobile ? "text text_type_digits-default mr-2" : "text text_type_digits-medium"}>{totalPrice}</p>
          {mobile ? <CurrencyIcon type="primary" /> : <img className={styles.image} src={currencyPath} alt="currency"/>}
        </div>
        {isBurgerConstructorVisible 
        ? 
        <Button type="primary" size={mobile ? "small" : "large"} onClick={() => handleModalOpen(setTitle(false), setContent(false), storeOrder())}>{mobile ? "Заказать" : "Оформить заказ"}</Button> 
        :
        <Button type="primary" size={mobile ? "small" : "medium"} onClick={handleToggle}>Смотреть заказ</Button>
        }
      </div>
    </div>
  );
}

TotalPrice.propTypes = priceProperties.isRequired;

export default TotalPrice;