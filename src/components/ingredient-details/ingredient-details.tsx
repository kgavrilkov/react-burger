import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getItemToViewAction } from '../../services/actions/item-to-view'
import styles from './ingredient-details.module.css';

const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();

  const mobile: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileM: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });

  const card = useSelector((store) => store.burgerIngredients.ingredients.find((ingredient) => ingredient._id === ingredientId));

  useEffect(() => {
    if (card) {
      dispatch(getItemToViewAction);
    }
  }, [card, dispatch]);

  return(
    <>
      <img className={styles.image} src={card && card.image} alt={card && card.name} data-cy="image" />
      <div className={styles.wrapper}>
        <p className={mobile ? mobileM ? mobileS ? "text text_type_main-default mt-8 mb-8" : "text text_type_main-medium mt-20 mb-10" : "text text_type_main-default mt-4 mb-8" : "text text_type_main-medium mt-4 mb-8"} data-cy="name">{card && card.name}</p>
      </div>
      <ul className={styles.list}>
        <div className={styles.container}>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} data-cy="calories">Калории,кк</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} data-cy="calorie">{card && card.calories}</p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} data-cy="proteins">Белки, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} data-cy="protein">{card && card.proteins}</p>
            </div>
          </li>
        </div>
        <div className={styles.box}>
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} data-cy="fats">Жиры, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} data-cy="fat">{card && card.fat}</p>
            </div>
          </li>  
          <li className={styles.item}>
            <div className={styles.wrapper}>
              <p className={mobileS ? "text text_type_main-small text_color_inactive mb-2" : mobileM ? "text text_type_main-default text_color_inactive mb-2" : mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} data-cy="carbohydrates">Углеводы, г</p>
              <p className={mobileS ? "text text_type_main-small text_color_inactive" : mobileM ? "text text_type_main-default text_color_inactive" : mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} data-cy="carbohydrate">{card && card.carbohydrates}</p>
            </div>
          </li>
        </div>
      </ul>
    </>
  );
}

export default IngredientDetails;