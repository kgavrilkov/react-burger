/* eslint-disable no-self-compare */
import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { feedInit, feedClose } from '../../services/actions/feed';
import { WSS_FEED_URL } from '../../utils/api';
import { useParams } from 'react-router-dom';
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import { getItems } from '../../services/actions/burger-ingredients';
import styles from './order-feed.module.css';
import { TRootState } from '../../services/store';

const OrderFeed: FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(feedInit(WSS_FEED_URL));
    return () => {
      dispatch(feedClose());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { orders } = useSelector((store: TRootState) => store.feed);

  const { feedId } = useParams();

  return(
    <>
      <div className={styles.container}>
        {orders.filter(({ _id }) => _id === feedId).map((card) => {
          return <FeedOrderDetails card={card} key={card._id} />
        })}
      </div>
    </>
  );
}

export default OrderFeed;