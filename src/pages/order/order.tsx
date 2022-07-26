import React, { FC } from "react";
import NavigationMenu from "./navigation-menu/navigation-menu";
import Heading from "./heading/heading";
import Orders from "./orders/orders";
import styles from './order.module.css';
import { THistoryOrders } from '../../utils/types';

const Order: FC<THistoryOrders> = ({ handleModalOpen }) => {
  return(
    <div className={styles.container}>
      <NavigationMenu />
      <Heading />
      <Orders handleModalOpen={handleModalOpen} />
    </div>
  );
};

export default Order;