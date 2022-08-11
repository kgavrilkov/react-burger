import React, { FC } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import styles from './history-order.module.css';
import { TRootState } from '../../services/store';

const HistoryOrder: FC = () => {
  const { orderId } = useParams();

  const { orders } = useSelector((store: TRootState) => store.feed);

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