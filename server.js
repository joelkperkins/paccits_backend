import Server from 'socket.io';
import { store } from '.';

export default function startServer() {

  // user sends action to the server
  // server delivers the actions to the store
  // store updates state after reducer fires
  // store executes a listener function via subscription
  // server broadcasts a state event
  // all connected users recieve the updated state

  const io = new Server().attach(3000);

  store.subscribe(
    ()=> io.emit('state', store.getState().toJS())
  );

    io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());
      socket.on('action', store.dispatch.bind(store));
    });
}
