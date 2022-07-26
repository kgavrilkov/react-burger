/* eslint-disable no-self-compare */
import React, { FC } from "react";
import { useParams } from 'react-router-dom';
import { data } from '../../utils/data';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import styles from './order-feed.module.css';

const OrderFeed: FC = () => {
  const { feedId } = useParams();

  return(
    <>
      <div className={styles.container}>
        {data.filter(({ _id }) => _id === feedId).map((card) => {
          return <FeedOrderDetails card={card} key={card._id} />
        })}
      </div>
    </>
  );
}

export default OrderFeed;