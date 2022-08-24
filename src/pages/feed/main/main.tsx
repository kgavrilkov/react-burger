import React, { FC } from "react";
import Orders from "../orders/orders";
import Stats from "../stats/stats";
import styles from './main.module.css';
import { TMainFeed } from '../../../utils/types';

const Main: FC<TMainFeed> = ({ isOrdersVisible, isStatsVisible }) => {
  return(
    <main className={styles.main}>
      {isOrdersVisible && <Orders />}
      {isStatsVisible && <Stats />}
    </main>
  );
}

export default Main;