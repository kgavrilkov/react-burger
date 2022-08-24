import React, { FC, useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { Tab } from '../tab/tab';
import styles from './tab-feed.module.css';
import { TTabFeed } from '../../../utils/types';  

const TabFeed: FC<TTabFeed> = ({ handleOrdersToggle, handleStatsToggle }) => {
  const [current, setCurrent] = useState<string>('Заказы');

  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  useEffect(() => {
    setCurrent(localStorage.getItem('current')!);
  }, []);

  useEffect(() => {
    localStorage.setItem('current', current);
    if (current === 'Заказы') {
      handleOrdersToggle();
    }
    if (current === 'Статистика') {
      handleStatsToggle();
    }
  }, [current, handleOrdersToggle, handleStatsToggle]);

  const handleOrdersClick = () => {
    setCurrent('Заказы');
    handleOrdersToggle();
  };

  const handleStatsClick = () => {
    setCurrent('Статистика');
    handleStatsToggle();
  };

  return(
    <>
      {tablet && 
        <div className={styles.tab}>
          <Tab value='Заказы' active={current === 'Заказы'} onClick={handleOrdersClick}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Заказы</p>
          </Tab>
          <Tab value='Статистика' active={current === 'Статистика'} onClick={handleStatsClick}>
            <p className={mobileS ? "text text_type_main-small" : "text text_type_main-default"}>Статистика</p>
          </Tab>
        </div>
      }
    </>
  );
}

export default TabFeed;