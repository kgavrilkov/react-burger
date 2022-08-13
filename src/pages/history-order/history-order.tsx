import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { ordersInit, ordersClose } from '../../services/actions/orders';
import { WSS_ORDER_URL } from '../../utils/api';
import { useParams } from 'react-router-dom';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import { getItems } from '../../services/actions/burger-ingredients';
import styles from './history-order.module.css';
import { TRootState } from '../../services/store';

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

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { orders } = useSelector((store: TRootState) => store.orders);

  const { orderId } = useParams();

  return(
    <>
      <div className={styles.container}>
        {orders.filter(({ _id }) => _id === orderId).map((card) => {
          return <FeedOrderDetails card={card} key={card._id} />
        })}
      </div>
    </>
  );
}

export default HistoryOrder;