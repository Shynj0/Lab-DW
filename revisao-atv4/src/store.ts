import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import habitReducer from './features/habitSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    habits: habitReducer,
  },
});

// Exportando os tipos para uso nos componentes e hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;