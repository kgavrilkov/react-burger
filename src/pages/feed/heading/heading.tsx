import React, { FC } from "react";
import { useMediaQuery } from 'react-responsive';
import styles from './heading.module.css';

const Heading: FC = () => {
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  return(
    <h2 className={styles.heading}>
      <p className={mobileS ? styles.name : "text text_type_main-large"}>Лента заказов</p>
    </h2>
  );
};

export default Heading;