// redux/store.ts
import type { Store } from 'redux';
import type { PersistConfig } from 'redux-persist';

import { legacy_createStore as createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { RootState } from './reducer'; // Assuming this is the root state defined earlier
import reducer from './reducer';

// Define the persist config type with the RootState type
const persistConfig: PersistConfig<RootState> = {
  key: 'asl-ecommerce',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store with type inference
const store: Store<RootState> = createStore(persistedReducer);

export default store;
