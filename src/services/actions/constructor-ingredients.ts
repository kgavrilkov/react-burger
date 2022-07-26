import { TIngredient, TIngredientToDelete } from '../../utils/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const REORDER_INGREDIENTS: 'REORDER_INGREDIENTS' = 'REORDER_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredientToDelete;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredientToDelete;
}

export interface IReorderIngredientsAction {
  readonly type: typeof REORDER_INGREDIENTS;
  readonly payload: ReadonlyArray<TIngredient>;
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorAction = IAddIngredientAction | 
IDeleteIngredientAction | IReorderIngredientsAction | IClearConstructorAction;

export const addIngredientAction = (
  payload: TIngredientToDelete
): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload
});

export const deleteIngredientAction = (
  payload: TIngredientToDelete
): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload
});

export const reorderIngredientsAction = (
  payload: ReadonlyArray<TIngredient>
): IReorderIngredientsAction => ({
  type: REORDER_INGREDIENTS,
  payload
});

export const clearConstructorAction = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR
});

