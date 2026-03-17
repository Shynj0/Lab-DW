import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredHabits,
  selectFilter,
  deleteHabit,
  toggleCompleted,
  clearCompleted,
  setFilterCategory,
  // Correção do Erro 1484: Usando import type
  type Habit
} from '../store/habitSlice';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HabitForm from './HabitForm';

const HabitList: React.FC = () => {
  const habits = useSelector(selectFilteredHabits);
  const currentFilter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  // Pega categorias únicas para o filtro [cite: 14]
  const allHabits = useSelector((state: any) => state.habits.habits as Habit[]);
  const categories = ['Todas', ...Array.from(new Set(allHabits.map(h => h.category)))];

  return (
    <Box>
      <HabitForm habitToEdit={editingHabit} clearEdit={() => setEditingHabit(null)} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar Categoria</InputLabel>
          <Select
            value={currentFilter}
            label="Filtrar Categoria"
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => dispatch(clearCompleted())}
        >
          Limpar Concluídos
        </Button>
      </Box>

      <List>
        {habits.map((habit) => (
          <Paper key={habit.id} sx={{ mb: 1, p: 1 }}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton onClick={() => setEditingHabit(habit)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => dispatch(deleteHabit(habit.id))}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                checked={habit.completed}
                onChange={() => dispatch(toggleCompleted(habit.id))}
              />
              <ListItemText
                primary={habit.name}
                secondary={habit.category}
                sx={{ textDecoration: habit.completed ? 'line-through' : 'none' }}
              />
            </ListItem>
          </Paper>
        ))}
        {habits.length === 0 && (
  <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
    Nenhum hábito cadastrado para esta categoria.
  </Typography>
)}
      </List>
    </Box>
  );
};

export default HabitList;