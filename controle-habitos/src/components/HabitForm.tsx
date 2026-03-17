import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit, editHabit, type Habit } from '../store/habitSlice';
import { v4 as uuidv4 } from 'uuid';
import { Box, TextField, Button, Stack } from '@mui/material';

interface HabitFormProps {
  habitToEdit?: Habit | null;
  clearEdit: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ habitToEdit, clearEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (habitToEdit) {
      setName(habitToEdit.name);
      setCategory(habitToEdit.category);
    }
  }, [habitToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (habitToEdit) {
      dispatch(editHabit({ ...habitToEdit, name, category }));
      clearEdit();
    } else {
      dispatch(
        addHabit({
          id: uuidv4(),
          name,
          category: category || 'Geral',
          completed: false,
        })
      );
    }
    setName('');
    setCategory('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label="Nome do Hábito (Obrigatório)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Categoria (Ex: Saúde, Estudo)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button 
          variant="contained" 
          type="submit" 
          sx={{ minWidth: '150px', height: '56px' }}
        >
          {habitToEdit ? 'Salvar' : 'Adicionar'}
        </Button>
      </Stack>
    </Box>
  );
};

export default HabitForm;