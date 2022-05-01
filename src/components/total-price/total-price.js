import React from "react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyPath from '../../images/currency.svg';
import { getNumber } from '../../services/actions/order.js';
import styles from './total-price.module.css';
import { priceProperties } from '../../utils/types.js';

function TotalPrice({ isBurgerConstructorVisible, handleToggle, handleModalOpen }) {
  const mobile = useMediaQuery({ query: `(max-width: 600px)` });
  
  const { constructorIngredients } = useSelector(store => store.constructorIngredients);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  const dispatch = useDispatch();
  const location = useLocation();

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
          buns && notBuns && isLoggedIn 
        ? 
          <Link 
            to={{
              pathname: '/profile/orders/:orderNumber', 
              state: { background: location }
            }}
          >
            <Button type="primary" size={mobile ? "small" : "large"} onClick={() => handleModalOpen(getRequestNumber())}>{mobile ? "Заказать" : "Оформить заказ"}</Button>
          </Link> 
        : 
          buns && notBuns && 
          <Link to='/login'>
            <Button type="primary" size={mobile ? "small" : "large"}>{mobile ? "Заказать" : "Оформить заказ"}</Button>
          </Link>
        :
          <Button type="primary" size={mobile ? "small" : "medium"} onClick={handleToggle}>Смотреть заказ</Button>
        }
      </div>
    </div>
  );
}

TotalPrice.propTypes = priceProperties.isRequired;

export default TotalPrice;