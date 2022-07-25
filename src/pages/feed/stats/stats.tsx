import React, { FC } from "react";
import { useMediaQuery } from 'react-responsive';
import { data, total, totalToday } from '../../../utils/data';
import styles from './stats.module.css';

const Stats: FC = () => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 450px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  return(
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.orders}>
          <div className={styles.done}>
            <p className={mobileS ? styles.heading : "text text_type_main-medium mb-6"}>Готовы:</p>
            <ul className={styles.list}>
              {data.filter(card => card.status === 'done').map(({ number }, index) => {return (
                <li className={styles.number} key={index}>
                  <p className={mobile ? styles.figure : "text text_type_digits-default"}>{number}</p>
                </li>)
              })}
            </ul>
          </div>
          <div className={styles.inwork}>
            <p className={mobileS ? styles.heading : "text text_type_main-medium mb-6"}>В работе:</p>
            <ul className={styles.list}>
              {data.filter(card => card.status === 'inwork').map(({ number }, index) => {return (
                <li key={index}>
                  <p className={mobile ? styles.figure : "text text_type_digits-default"}>{number}</p>
                </li>)
              })}
            </ul>
          </div>
        </div>
        <div className={styles.total}>
          <p className={mobileS ? styles.header : "text text_type_main-medium"}>Выполнено за все время:</p>
          <p className={mobile ? styles.digit : "text text_type_digits-large"}>{total}</p>
        </div>
        <div className={styles.sum}>
          <p className={mobileS ? styles.header : "text text_type_main-medium"}>Выполнено за сегодня:</p>
          <p className={mobile ? styles.digit : "text text_type_digits-large"}>{totalToday}</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;