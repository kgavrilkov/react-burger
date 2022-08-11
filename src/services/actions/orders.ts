import { TOrdersFeed } from '../../utils/types';

export const ORDERS_CONNECTION_INIT: 'ORDERS_CONNECTION_INIT' = 'ORDERS_CONNECTION_INIT';
export const ORDERS_CONNECTION_SUCCESS: 'ORDERS_CONNECTION_SUCCESS' = 'ORDERS_CONNECTION_SUCCESS';
export const ORDERS_CONNECTION_ERROR: 'ORDERS_CONNECTION_ERROR' = 'ORDERS_CONNECTION_ERROR';
export const ORDERS_CONNECTION_CLOSE: 'ORDERS_CONNECTION_CLOSE' = 'ORDERS_CONNECTION_CLOSE';
export const ORDERS_CONNECTION_CLOSED: 'ORDERS_CONNECTION_CLOSED' = 'ORDERS_CONNECTION_CLOSED';
export const ORDERS_GET_MESSAGE: 'ORDERS_GET_MESSAGE' = 'ORDERS_GET_MESSAGE';
export const ORDERS_SEND_MESSAGE: 'ORDERS_SEND_MESSAGE' = 'ORDERS_SEND_MESSAGE';

export interface IOrdersConnectionInitAction {
  readonly type: typeof ORDERS_CONNECTION_INIT;
  readonly payload: string;
}

export interface IOrdersConnectionSuccessAction {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionErrorAction {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IOrdersConnectionCloseAction {
  readonly type: typeof ORDERS_CONNECTION_CLOSE;
}

export interface IOrdersConnectionClosedAction {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersGetMessageAction {
  readonly type: typeof ORDERS_GET_MESSAGE;
  readonly payload: TOrdersFeed;
}

export interface IOrdersSendMessageAction {
  readonly type: typeof ORDERS_SEND_MESSAGE;
  readonly payload: any;
}

export type TOrdersAction = IOrdersConnectionInitAction | IOrdersConnectionSuccessAction | IOrdersConnectionErrorAction | 
IOrdersConnectionCloseAction | IOrdersConnectionClosedAction | IOrdersGetMessageAction | IOrdersSendMessageAction;

export const ordersInit = (
  payload: string
): IOrdersConnectionInitAction => ({
  type: ORDERS_CONNECTION_INIT,
  payload
});

export const ordersClose = (): IOrdersConnectionCloseAction => ({
  type: ORDERS_CONNECTION_CLOSE
});