/* eslint-disable no-self-compare */
import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { feedInit, feedClose } from '../../services/actions/feed';
import { WSS_FEED_URL } from '../../utils/api';
import { useParams } from 'react-router-dom';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import styles from './order-feed.module.css';

const OrderFeed: FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(feedInit(WSS_FEED_URL));
    return () => {
      dispatch(feedClose());
    };
  }, [dispatch]);

  const { orders } = useSelector((store) => store.feed);

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

export default OrderFeed;