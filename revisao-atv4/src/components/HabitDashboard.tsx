import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { addHabit, removeHabit, filterHabits } from '../features/habitSlice';

export const HabitDashboard = () => {
  const dispatch = useDispatch();
  const { habits, activeFilter } = useSelector((state: RootState) => state.habits);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Saúde');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome) {
      // Removido qualquer termo 'cite' que pudesse estar aqui
      dispatch(addHabit({ id: Date.now().toString(), nome, categoria }));
      setNome('');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Removido qualquer termo 'cite' que pudesse estar aqui
    dispatch(filterHabits(e.target.value));
  };

  const displayedHabits = activeFilter === 'Todos' 
    ? habits 
    : habits.filter(h => h.categoria === activeFilter);

  return (
    <div style={{ padding: '20px', border: '2px solid #FF8C00', borderRadius: '12px', backgroundColor: '#FFF5EE' }}>
      <h2 style={{ color: '#FF4500' }}>2. Gerenciar Hábitos</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Novo hábito..." 
          style={{ padding: '8px', border: '1px solid #FF8C00', borderRadius: '5px' }}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ padding: '8px', border: '1px solid #FF8C00', borderRadius: '5px' }}>
          <option value="Saúde">Saúde</option>
          <option value="Estudo">Estudo</option>
          <option value="Lazer">Lazer</option>
        </select>
        <button type="submit" style={{ backgroundColor: '#FF8C00', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add</button>
      </form>

      <div style={{ marginBottom: '15px' }}>
        <strong style={{ color: '#FF8C00' }}>Filtro: </strong>
        <select onChange={handleFilterChange} style={{ padding: '5px', borderRadius: '4px', border: '1px solid #FF8C00' }}>
          <option value="Todos">Todos</option>
          <option value="Saúde">Saúde</option>
          <option value="Estudo">Estudo</option>
          <option value="Lazer">Lazer</option>
        </select>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {displayedHabits.map(h => (
          <li key={h.id} style={{ padding: '10px', borderBottom: '1px solid #FFD580', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><strong>{h.nome}</strong> <small style={{ color: '#666' }}>({h.categoria})</small></span>
            <button 
              onClick={() => dispatch(removeHabit(h.id))} 
              style={{ color: 'white', backgroundColor: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};