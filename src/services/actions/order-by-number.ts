import { TOrderByNumber } from '../../utils/types';
import { getOrderByNumber } from '../../utils/api';
import { AppThunk } from '../store';

export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: ReadonlyArray<TOrderByNumber>;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderByNumberAction = IGetOrderAction | IGetOrderSuccessAction | IGetOrderFailedAction;

export const getOrderAction = (): IGetOrderAction => ({
  type: GET_ORDER
});

export const getOrderSuccessAction = (
  payload: ReadonlyArray<TOrderByNumber>
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload
});

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
});

export const getOrder: AppThunk = (orderNumber: any) => (dispatch) => {
  dispatch(getOrderAction());
  getOrderByNumber(orderNumber)
    .then((res) => {
      if (res && res.success) {
        dispatch(getOrderSuccessAction(res.orders));
      } else {
        dispatch(getOrderFailedAction());
      }
    })
    .catch((err) => {
      dispatch(getOrderFailedAction());
    });
};
