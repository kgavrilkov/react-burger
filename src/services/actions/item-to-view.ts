import { TIngredient } from '../../utils/types';

export const GET_ITEM_TO_VIEW: 'GET_ITEM_TO_VIEW' = 'GET_ITEM_TO_VIEW';
export const RESET_ITEM_TO_VIEW: 'RESET_ITEM_TO_VIEW' = 'RESET_ITEM_TO_VIEW';

export interface IGetItemToViewAction {
  readonly type: typeof GET_ITEM_TO_VIEW;
  readonly payload: TIngredient; 
}

export interface IResetItemToViewAction {
  readonly type: typeof RESET_ITEM_TO_VIEW;
}

export type TItemToViewAction = IGetItemToViewAction | IResetItemToViewAction;

export const getItemToViewAction = (
  payload: TIngredient
): IGetItemToViewAction => ({
  type: GET_ITEM_TO_VIEW,
  payload
});

export const resetItemToViewAction = (): IResetItemToViewAction => ({
  type: RESET_ITEM_TO_VIEW
});