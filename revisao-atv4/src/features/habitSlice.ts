// src/features/habitSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Habit {
  id: string;
  nome: string;
  categoria: string;
}

interface HabitState {
  habits: Habit[];
  activeFilter: string;
}

const initialState: HabitState = {
  habits: [],
  activeFilter: 'Todos',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
    },
    filterHabits: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { addHabit, removeHabit, filterHabits } = habitSlice.actions;
export default habitSlice.reducer;