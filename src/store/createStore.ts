import {
  createStore,
  applyMiddleware,
  Store,
  Reducer,
  Middleware,
} from 'redux';

export default function (
  reducers: Reducer,
  middlewares: Array<Middleware>,
): Store {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
}
