import { TOrdersFeed } from '../../utils/types';

export const WS_CONNECTION_INIT: 'WS_CONNECTION_INIT' = 'WS_CONNECTION_INIT';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IWsConnectionInitAction {
  readonly type: typeof WS_CONNECTION_INIT;
  readonly payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrdersFeed;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: TOrdersFeed;
}

export type TWebSocketAction = IWsConnectionInitAction | IWsConnectionSuccessAction | IWsConnectionErrorAction | 
IWsConnectionCloseAction | IWsConnectionClosedAction | IWsGetMessageAction | IWsSendMessageAction;

export const wsInit = (
  payload: string
): IWsConnectionInitAction => ({
  type: WS_CONNECTION_INIT,
  payload
});

export const onOpen = (): IWsConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS
});

export const onError = (
  payload: string
): IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload
});

export const wsClose = (): IWsConnectionCloseAction => ({
  type: WS_CONNECTION_CLOSE
});

export const onClose = (): IWsConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED
});

export const onMessage = (
  payload: TOrdersFeed
): IWsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload
});

export const wsSendMessage = (
  payload: TOrdersFeed
): IWsSendMessageAction => ({
  type: WS_SEND_MESSAGE,
  payload
});