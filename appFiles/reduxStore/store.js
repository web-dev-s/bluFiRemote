

import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer, { reducerConfig } from './reducers';

const persistedReducer = persistReducer(reducerConfig, AppReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk));

export let persistor = persistStore(store);