import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import ticketsReducer from './slices/ticketsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
