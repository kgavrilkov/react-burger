import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { ordersInit, ordersClose } from '../../services/actions/orders';
import { WSS_ORDER_URL } from '../../utils/api';
import { useParams } from 'react-router-dom';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import styles from './history-order.module.css';

const HistoryOrder: FC = () => {
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

  const { orderNumber } = useParams();

  return(
    <>
      <div className={styles.container}>
        {orders.filter((o) => (''+ o.number) === orderNumber).map((card) => {
          return <FeedOrderDetails key={card._id} />
        })}
      </div>
    </>
  );
}

export default HistoryOrder;