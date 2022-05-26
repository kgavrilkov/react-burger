/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getItems } from '../../services/actions/index.js';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';
import { TIngredient } from '../../utils/types';

const Ingredient: FC = () => {
  const dispatch = useDispatch();

  const mobile: boolean = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS: boolean = useMediaQuery({ query: `(max-width: 480px)` });
  
  const { ingredients } = useSelector((store: any) => store.burgerIngredients);
  const { ingredientId } = useParams();
 
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return(
    <div className={styles.container}>
      <p className={mobile ? mobileS ? "text text_type_main-default" : "text text_type_main-medium" : "text text_type_main-large"}>Детали ингредиента</p>
      {ingredients.filter(({ _id }: TIngredient) => _id === ingredientId).map((card: TIngredient) => {
        return <IngredientDetails card={card} key={card._id} />
      })}
    </div>
  );
}

export default Ingredient;