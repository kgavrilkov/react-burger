import { combineReducers } from 'redux';
import { burgerIngredients } from './burger-ingredients.js';
import { constructorIngredients } from './constructor-ingredients.js';
import { itemToView } from './item-to-view.js';
import { order } from './order.js';
import { auth } from './auth.js';
import { currentUser } from './user.js';
import { password } from './password.js';

export const rootReducer = combineReducers({
  burgerIngredients,
  constructorIngredients,
  itemToView,
  order,
  auth,
  currentUser,
  password
});