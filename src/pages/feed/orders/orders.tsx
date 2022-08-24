/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from '../../../services/hooks';
import { feedInit, feedClose } from '../../../services/actions/feed';
import { WSS_FEED_URL } from '../../../utils/api';
import Card from '../card/card';
import styles from './orders.module.css';

const Orders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedInit(WSS_FEED_URL));
    return () => {
      dispatch(feedClose());
    };
  }, [dispatch]);

  const { orders } = useSelector((store) => store.feed);

  return(
    <section className={styles.orders}>
      <div className={styles.cards}>
        {orders.map((card) => {return (
          <Card
            card={card}
            key={card._id}
          />)
        })}
      </div>
    </section>
  );
}

export default Orders;