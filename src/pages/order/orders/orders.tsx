/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useDispatch } from '../../../services/hooks';
import Card from "../card/card";
import { data } from '../../../utils/data';
import { getOrderToViewAction } from '../../../services/actions/order-to-view';
import styles from './orders.module.css';
import { THistoryOrders, TItem } from '../../../utils/types';

const Orders: FC<THistoryOrders> = ({ handleModalOpen }) => {
  const dispatch = useDispatch();
  
  const handleOrderOpen = (card: TItem) => {
    dispatch(getOrderToViewAction(card));
    localStorage.setItem('card', JSON.stringify(card));
  };

  useEffect(() => {
    const value = localStorage.getItem('card');
    if (typeof value === 'string') {
      const card = JSON.parse(value)
      if (card) {
        handleModalOpen(handleOrderOpen(card));
      }
    }
  }, []);

  return(
    <section className={styles.orders}>
      <div className={styles.cards}>
        {data.map((card) => {return (
          <Card
            card={card}
            key={card._id}
            onClick={() => handleModalOpen(handleOrderOpen(card))}
          />)
        })}
      </div>
    </section>
  );
};

export default Orders;