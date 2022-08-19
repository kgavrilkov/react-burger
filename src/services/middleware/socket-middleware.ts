import { Middleware } from 'redux';
import {  TRootState } from '../store';

export const socketMiddleware = (wsActions: {[key: string]: any}): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch }  = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onError,
        wsClose,
        wsSendMessage,
        onMessage,
        onClose
      } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload); 
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ 
            type: onMessage,
            payload: {
              data: parsedData,
              timestamp: new Date().getTime() / 100
            }
          });
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      if (wsClose && type === wsClose && socket) {
        socket.close();
      }
      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload));
      }
      next(action);
    };
  };
};