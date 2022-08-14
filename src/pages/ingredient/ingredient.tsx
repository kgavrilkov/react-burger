/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';

const Ingredient: FC = () => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 330px)` });
  
  const { ingredients } = useSelector((store) => store.burgerIngredients);
  const { ingredientId } = useParams();

  return(
    <div className={styles.container}>
      <p className={mobile ? mobileS ? "text text_type_main-default" : "text text_type_main-medium" : "text text_type_main-large"}>Детали ингредиента</p>
      {ingredients.filter(({ _id }) => _id === ingredientId).map((card) => {
        return <IngredientDetails card={card} key={card._id} />
      })}
    </div>
  );
}

export default Ingredient;