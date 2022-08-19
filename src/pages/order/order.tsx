import React, { FC } from "react";
import NavigationMenu from "./navigation-menu/navigation-menu";
import Heading from "./heading/heading";
import Orders from "./orders/orders";
import styles from './order.module.css';

const Order: FC = () => {
  return(
    <div className={styles.container}>
      <NavigationMenu />
      <Heading />
      <Orders />
    </div>
  );
};

export default Order;