// src/hooks/useUsers.ts
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { addUser, removeUser } from '../features/userSlice';

export const useUsers = () => {
  const dispatch = useDispatch();
  
  // Obtém a lista de usuários do estado global
  const users = useSelector((state: RootState) => state.users.users);

  // Retorna as funções e os dados de forma limpa
  return {
    getUsers: users,
    addUser: (name: string) => dispatch(addUser(name)),
    removeUser: (name: string) => dispatch(removeUser(name)),
  };
};