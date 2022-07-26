import { getIngredients } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { AppThunk, AppDispatch } from '../store';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction = IGetIngredientsAction | 
IGetIngredientsSuccessAction | IGetIngredientsFailedAction;

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS
});

export const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<TIngredient>
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsAction());
  getIngredients()
    .then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccessAction(res.data));
      } else {
        dispatch(getIngredientsFailedAction());
      }
    })
    .catch((err) => {
      dispatch(getIngredientsFailedAction());
    });
}