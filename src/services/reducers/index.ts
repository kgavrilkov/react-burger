import { combineReducers } from 'redux';
import { auth } from './auth';
import { burgerIngredients } from './burger-ingredients';
import { constructorIngredients } from './constructor-ingredients';
import { feed } from './feed';
import { itemToView } from './item-to-view';
import { orderByNumber } from './order-by-number';
import { orderToView } from './order-to-view';
import { order } from './order';
import { orders } from './orders';
import { password } from './password';
import { currentUser } from './user';

export const rootReducer = combineReducers({
  auth,
  burgerIngredients,
  constructorIngredients,
  feed,
  itemToView,
  orderByNumber,
  orderToView,
  order,
  orders,
  password,
  currentUser
});