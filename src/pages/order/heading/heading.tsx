import React, { FC } from "react";
import { useMediaQuery } from 'react-responsive';
import styles from './heading.module.css';

const Heading: FC = () => {
  const tablet: boolean = useMediaQuery({ query: `(max-width: 900px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 350px)` });

  return(
    <>
      {tablet &&
        <h2 className={styles.heading}>
          <p className={mobileS ? styles.name : "text text_type_main-large"}>История заказов</p>
        </h2>
      } 
    </>
  );
};

export default Heading;