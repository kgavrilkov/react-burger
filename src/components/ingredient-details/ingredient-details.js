import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './ingredient-details.module.css';
import { ingredientProperties } from '../../utils/types.js';

function IngredientDetails({ card }) {
  const mobile = useMediaQuery({ query: `(max-width: 580px)` });
  const mobileS = useMediaQuery({ query: `(max-width: 480px)` });

  return(
    <>
      <img className={styles.image} src={card && card.image} alt={card && card.name} />
      <p className={mobile ? mobileS ? "text text_type_main-small mt-1 mb-1" : "text text_type_main-default mt-4 mb-8" : "text text_type_main-medium mt-4 mb-8"} style={{textAlign: 'center'}}>{card && card.name}</p>
      <ul className={styles.list}>
        <div style={{display: 'flex', marginLeft: 20}}>
          <li className={styles.item}>
            <p className={mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} style={{textAlign: 'center'}}>Калории,кк</p>
            <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} style={{textAlign: 'center'}}>{card && card.calories}</p>
          </li>
          <li className={styles.item}>
            <p className={mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} style={{textAlign: 'center'}}>Белки, г</p>
            <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} style={{textAlign: 'center'}}>{card && card.proteins}</p>
          </li>
        </div>
        <div style={mobile ? {display: 'flex'} : {display: 'flex', marginRight: 20}}>
          <li className={styles.item}>
            <p className={mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} style={{textAlign: 'center'}}>Жиры, г</p>
            <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} style={{textAlign: 'center'}}>{card && card.fat}</p>
          </li>  
          <li className={styles.item}>
            <p className={mobile ? "text text_type_main-small text_color_inactive mb-2" : "text text_type_main-default text_color_inactive mb-2"} style={{textAlign: 'center'}}>Углеводы, г</p>
            <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_digits-default text_color_inactive"} style={{textAlign: 'center'}}>{card && card.carbohydrates}</p>
          </li>
        </div>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = ingredientProperties.isRequired

export default IngredientDetails;