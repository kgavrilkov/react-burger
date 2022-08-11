/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from '../../../services/hooks';
import { ordersInit, ordersClose } from '../../../services/actions/orders';
import { WSS_ORDER_URL } from '../../../utils/api';
import Card from "../card/card";
import { getOrderToViewAction } from '../../../services/actions/order-to-view';
import styles from './orders.module.css';
import { THistoryOrders, TOrderFeed } from '../../../utils/types';
import { TRootState } from '../../../services/store';

const Orders: FC<THistoryOrders> = ({ handleModalOpen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken')!;
    const accessToken = token.replace('Bearer ', '');
    dispatch(ordersInit(`${WSS_ORDER_URL}?token=${accessToken}`));
    return () => {
      dispatch(ordersClose());
    };
  }, [dispatch]);
  
  const { orders } = useSelector((store: TRootState) => store.orders);
  console.log(orders);
  
  const handleOrderOpen = (card: TOrderFeed) => {
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
        {orders.map((card) => {return (
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