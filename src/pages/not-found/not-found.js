import React from "react";
import { useHistory } from 'react-router-dom';
import styles from './not-found.module.css';

function NotFound() {
  const history = useHistory();

  return(
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span>404</span>Страница не найдена
      </h2>
      <button className={styles.button} onClick={() => history.goBack()}>Назад</button>
    </div>
  );
}

export default NotFound;