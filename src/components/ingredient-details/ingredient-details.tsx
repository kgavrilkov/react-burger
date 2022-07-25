import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './ingredient-details.module.css';
import { TIngredientDetails } from '../../utils/types';

const IngredientDetails: FC<TIngredientDetails> = ({ card }) => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileM: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });

  return(
    <>
      <img className={styles.image} src={card && card.image} alt={card && card.name} />
      <div className={styles.wrapper}>
        <p className={mobile ? mobileM ? mobileS ? "text text_type_main-default mt-8 mb-8" : "text text_type_main-medium mt-20 mb-10" : "text text_type_main-default mt-4 mb-8" : "text text_type_main-medium mt-4 mb-8"}>{card && card.name}</p>
      </div>
      <ul className={styles.list}>
        <div className={styles.container}>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"}>Калории,кк</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"}>{card && card.calories}</p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"}>Белки, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"}>{card && card.proteins}</p>
            </div>
          </li>
        </div>
        <div className={styles.box}>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"}>Жиры, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"}>{card && card.fat}</p>
            </div>
          </li>  
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"}>Углеводы, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"}>{card && card.carbohydrates}</p>
            </div>
          </li>
        </div>
      </ul>
    </>
  );
}

export default IngredientDetails;