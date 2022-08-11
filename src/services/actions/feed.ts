import { TOrdersFeed } from '../../utils/types';

export const FEED_CONNECTION_INIT: 'FEED_CONNECTION_INIT' = 'FEED_CONNECTION_INIT';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' = 'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';
export const FEED_SEND_MESSAGE: 'FEED_SEND_MESSAGE' = 'FEED_SEND_MESSAGE';

export interface IFeedConnectionInitAction {
  readonly type: typeof FEED_CONNECTION_INIT;
  readonly payload: string;
}

export interface IFeedConnectionSuccessAction {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
  readonly type: typeof FEED_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IFeedConnectionCloseAction {
  readonly type: typeof FEED_CONNECTION_CLOSE;
}

export interface IFeedConnectionClosedAction {
  readonly type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedGetMessageAction {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: TOrdersFeed;
}

export interface IFeedSendMessageAction {
  readonly type: typeof FEED_SEND_MESSAGE;
  readonly payload: any;
}

export type TFeedAction = IFeedConnectionInitAction | IFeedConnectionSuccessAction | IFeedConnectionErrorAction | 
IFeedConnectionCloseAction | IFeedConnectionClosedAction | IFeedGetMessageAction | IFeedSendMessageAction;

export const feedInit = (
  payload: string
): IFeedConnectionInitAction => ({
  type: FEED_CONNECTION_INIT,
  payload
});

export const feedClose = (): IFeedConnectionCloseAction => ({
  type: FEED_CONNECTION_CLOSE
});