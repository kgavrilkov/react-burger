/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useMemo } from "react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyPath from '../../images/currency.svg';
import { getNumber } from '../../services/actions/order';
import styles from './total-price.module.css';
import { TTotalPrice, TLocationParams, TIngredient } from '../../utils/types';
import { TRootState } from '../../services/store';

const TotalPrice: FC<TTotalPrice> = ({ isBurgerConstructorVisible, handleToggle, handleModalOpen, setNumber }) => {
  const [name, setName] = useState<string>('Бургер конструктор');

  const mobile: boolean = useMediaQuery({ query: `(max-width: 600px)` });
  
  const { constructorIngredients } = useSelector((store: TRootState) => store.constructorIngredients);
  const isLoggedIn = useSelector((store: TRootState) => store.auth.isLoggedIn);

  const dispatch = useDispatch();
  const location = useLocation() as unknown as TLocationParams;

  useEffect(() => {
    if (localStorage.getItem('BurgerConstructor')) {
      handleToggle();
    }
  }, [handleToggle]);

  const getTotalPrice = (arg: object) => {
    let total = 0;
    constructorIngredients.map((item: TIngredient) => 
      item.type === 'bun' ? (total += item.price * 2) : (total += item.price)
    );
    return total;
  };

  const totalPrice = getTotalPrice(constructorIngredients);

  const buns = useMemo(() => 
    constructorIngredients.find(((card: TIngredient) => card.type === 'bun')) 
  , [constructorIngredients]);
  const notBuns = useMemo(() => 
    constructorIngredients.find(((card: TIngredient) => card.type !== 'bun')) 
  , [constructorIngredients]);

  const getRequestNumber = () => {
    const ingredientsId: string[] = [];
    constructorIngredients.map((item: TIngredient) => ingredientsId.push(item._id));
    dispatch(getNumber(ingredientsId));
  };

  useEffect(() => {
    const getRequestNumber = () => {
      if (localStorage.getItem('number')) {
        setNumber(localStorage.getItem('number'));
      }
    };
    handleModalOpen(getRequestNumber());
  }, []);

  const onClick = () => {
    handleToggle();
    setName('Бургер конструктор');
    localStorage.setItem('BurgerConstructor', name);
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
              pathname: '/profile/orders', 
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
          <Button type="primary" size={mobile ? "small" : "medium"} onClick={onClick}>Смотреть заказ</Button>
        }
      </div>
    </div>
  );
}

export default TotalPrice;