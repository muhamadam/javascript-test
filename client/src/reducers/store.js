import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import cards from './cards';

const reducers = combineReducers({
 cards
});

export default configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
  devTools: true
});
