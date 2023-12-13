import {configureStore, combineReducers} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import TodoSlice from './slices/TodoSlice';

const combinedReducer = combineReducers({
  todo: TodoSlice,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
