/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from '../../../services/hooks';
import { ordersInit, ordersClose } from '../../../services/actions/orders';
import { WSS_ORDER_URL } from '../../../utils/api';
import Card from "../card/card";
import styles from './orders.module.css';

const Orders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken')!;
    const accessToken = token.replace('Bearer ', '');
    dispatch(ordersInit(`${WSS_ORDER_URL}?token=${accessToken}`));
    return () => {
      dispatch(ordersClose());
    };
  }, [dispatch]);
  
  const { orders } = useSelector((store) => store.orders);

  return(
    <section className={styles.orders}>
      <div className={styles.cards}>
        {orders.map((card) => {return (
          <Card
            card={card}
            key={card._id}
          />)
        }).reverse()}
      </div>
    </section>
  );
};

export default Orders;