import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Habit {
  id: string;
  name: string;
  category: string;
  completed: boolean;
}

interface HabitState {
  habits: Habit[];
  filterCategory: string;
}

const initialState: HabitState = {
  habits: [],
  filterCategory: 'Todas',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    editHabit: (state, action: PayloadAction<Habit>) => {
      const index = state.habits.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    clearCompleted: (state) => {
      state.habits = state.habits.filter((h) => !h.completed);
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
  },
});

export const {
  addHabit,
  editHabit,
  deleteHabit,
  toggleCompleted,
  clearCompleted,
  setFilterCategory,
} = habitSlice.actions;

export const selectFilter = (state: RootState) => state.habits.filterCategory;
export const selectFilteredHabits = (state: RootState) => {
  const { habits, filterCategory } = state.habits;
  if (filterCategory === 'Todas') return habits;
  return habits.filter((h) => h.category === filterCategory);
};

export default habitSlice.reducer;