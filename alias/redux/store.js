import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './teamReducers';
import gameReducer from './gameReducers';
import userReducer from './userReducers';

const store = configureStore({
  reducer: {
    teamReducer,
    gameReducer,
    userReducer
  }
});

export default store;
