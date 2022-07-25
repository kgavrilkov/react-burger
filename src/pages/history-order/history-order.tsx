import React, { FC } from "react";
import { useParams } from 'react-router-dom';
import { data } from '../../utils/data';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import styles from './history-order.module.css';

const HistoryOrder: FC = () => {
  const { orderId } = useParams();

  return(
    <>
      <div className={styles.container}>
        {data.filter(({ _id }) => _id === orderId).map((card) => {
          return <FeedOrderDetails card={card} key={card._id} />
        })}
      </div>
    </>
  );
}

export default HistoryOrder;