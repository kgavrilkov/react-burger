/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from '../../../services/hooks';
import { ordersInit, ordersClose } from '../../../services/actions/orders';
import { WSS_ORDER_URL } from '../../../utils/api';
import { getItems } from '../../../services/actions/burger-ingredients';
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

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  
  const { orders } = useSelector((store: TRootState) => store.orders);
  
  const handleOrderOpen = (card: TOrderFeed) => {
    dispatch(getOrderToViewAction(card));
    localStorage.setItem('card', JSON.stringify(card));
  };

  return(
    <section className={styles.orders}>
      <div className={styles.cards}>
        {orders.map((card) => {return (
          <Card
            card={card}
            key={card._id}
            onClick={() => handleModalOpen(handleOrderOpen(card))}
          />)
        }).reverse()}
      </div>
    </section>
  );
};

export default Orders;