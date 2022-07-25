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
        socket.onOpen = (event: any) => {
          dispatch(onOpen(event));
        };
        socket.onError = (event: any) => {
          dispatch(onError(event));
        };
        socket.onMessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage({ data: parsedData, timestamp: new Date().getTime() / 100 }));
        };
        socket.onClose = (event: any) => {
          dispatch(onClose(event));
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