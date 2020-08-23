import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';

export default (reducers: Reducer): Reducer => {
  const persistedReducer = persistReducer(
    {
      key: 'admin-react',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  );

  return persistedReducer;
};
