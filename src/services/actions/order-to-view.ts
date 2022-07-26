import { TItem } from '../../utils/types';

export const GET_ORDER_TO_VIEW: 'GET_ORDER_TO_VIEW' = 'GET_ORDER_TO_VIEW';
export const RESET_ORDER_TO_VIEW: 'RESET_ORDER_TO_VIEW' = 'RESET_ORDER_TO_VIEW';

export interface IGetOrderToViewAction {
  readonly type: typeof GET_ORDER_TO_VIEW;
  readonly payload: TItem; 
}

export interface IResetOrderToViewAction {
  readonly type: typeof RESET_ORDER_TO_VIEW;
}

export type TOrderToViewAction = IGetOrderToViewAction | IResetOrderToViewAction;

export const getOrderToViewAction = (
  payload: TItem
): IGetOrderToViewAction => ({
  type: GET_ORDER_TO_VIEW,
  payload
});

export const resetOrderToViewAction = (): IResetOrderToViewAction => ({
  type: RESET_ORDER_TO_VIEW
});