import { TIngredient } from '../../utils/types';
import { getOrderNumber } from '../../utils/api';
import { clearConstructorAction } from './constructor-ingredients';
import { AppThunk } from '../store';

export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';
export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

export interface ICreateOrderAction {
  readonly type: typeof CREATE_ORDER;
  readonly payload: ReadonlyArray<TIngredient>;
}

export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly payload: number;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IResetOrderAction {
  readonly type: typeof RESET_ORDER;
}

export type TOrderAction = ICreateOrderAction | IGetOrderNumberAction |
IGetOrderNumberSuccessAction | IGetOrderNumberFailedAction | IResetOrderAction;

export const createOrderAction = (
  payload: ReadonlyArray<TIngredient>
): ICreateOrderAction => ({
  type: CREATE_ORDER,
  payload
});

export const getOrderNumberAction = (): IGetOrderNumberAction => ({
  type: GET_ORDER_NUMBER
});

export const getOrderNumberSuccessAction = (
  payload: number
): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  payload
});

export const getOrderNumberFailedAction = (): IGetOrderNumberFailedAction => ({
  type: GET_ORDER_NUMBER_FAILED
});

export const resetOrderAction = (): IResetOrderAction => ({
  type: RESET_ORDER
});

export const getNumber: AppThunk = (orderData: string) => (dispatch) => {
  dispatch(getOrderNumberAction());
  getOrderNumber(orderData)
    .then((res) => {
      if (res && res.success) {
        dispatch(getOrderNumberSuccessAction(res.order.number));
        dispatch(clearConstructorAction());
      } else {
        dispatch(getOrderNumberFailedAction());
      }
    })
    .catch((err) => {
      dispatch(getOrderNumberFailedAction());
    });
};
