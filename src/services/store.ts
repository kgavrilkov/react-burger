import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { 
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED
 } from './actions/feed';
import { 
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_GET_MESSAGE,
  ORDERS_CONNECTION_CLOSE,
  ORDERS_CONNECTION_CLOSED
 } from './actions/orders';
import { rootReducer } from './reducers/index';
import { TActions } from './actions/index';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  onOpen: FEED_CONNECTION_SUCCESS,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE,
  wsClose: FEED_CONNECTION_CLOSE,
  onClose: FEED_CONNECTION_CLOSED
};

const ordersWsActions = {
  wsInit: ORDERS_CONNECTION_INIT,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onError: ORDERS_CONNECTION_ERROR,
  onMessage: ORDERS_GET_MESSAGE,
  wsClose: ORDERS_CONNECTION_CLOSE,
  onClose: ORDERS_CONNECTION_CLOSED
};
    
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedWsActions), socketMiddleware(ordersWsActions)));

export const store = (createStore(rootReducer, enhancer));

export type TRootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TActions;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;