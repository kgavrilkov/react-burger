/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getItems } from '../../services/actions/index.js';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';

function Ingredient() {
  const dispatch = useDispatch();

  const mobile = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 480px)` });
  
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const { ingredientId } = useParams();
 
  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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