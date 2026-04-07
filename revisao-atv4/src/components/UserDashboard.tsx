// src/components/UserDashboard.tsx
import { useUsers } from '../hooks/useUsers';

export const UserDashboard = () => {
  const { getUsers, addUser, removeUser } = useUsers();

  const handleAddDummy = () => {
    // Gerando um nome fictício aleatório conforme pede a questão 4
    const idAleatorio = Math.floor(Math.random() * 1000);
    addUser(`Usuário ${idAleatorio}`);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #FF8C00', 
      borderRadius: '12px', 
      marginBottom: '20px', 
      backgroundColor: '#FFF5EE' 
    }}>
      <h2 style={{ color: '#FF4500' }}>1. Gerenciar Usuários</h2>
      
      <button 
        onClick={handleAddDummy}
        style={{ 
          backgroundColor: '#FF8C00', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        Adicionar Usuário Fictício
      </button>
      
      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {getUsers.map((user, index) => (
          <li key={index} style={{ 
            padding: '10px', 
            borderBottom: '1px solid #FFD580', 
            display: 'flex', 
            justifyContent: 'space-between', 
            maxWidth: '400px',
            alignItems: 'center'
          }}>
            <span style={{ color: '#333' }}>{user}</span>
            <button 
              onClick={() => removeUser(user)} 
              style={{ 
                color: '#FF4500', 
                border: '1px solid #FF4500', 
                background: 'transparent', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};