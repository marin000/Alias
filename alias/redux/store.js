import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './reducers';

const store = configureStore({
  reducer: {
    teamReducer
  }
});

export default store;
