export const socketMiddleware = (wsActions: any) => {
  return (store: any) => {
    let socket: any = null;
    return (next: any) => (action: any) => {
      const { dispatch }  = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onError,
        wsSendMessage,
        onMessage,
        wsClose,
        onClose
      } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload); 
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ 
            type: onMessage,
            payload: {
              data: parsedData,
              timestamp: new Date().getTime() / 100
            }
          });
          console.log(parsedData);
        };
        socket.onclose = (event: any) => {
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