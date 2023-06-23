import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './teamReducers';
import gameReducer from './gameReducers';

const store = configureStore({
  reducer: {
    teamReducer,
    gameReducer
  }
});

export default store;
