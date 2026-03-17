import { Container, Typography, Paper } from '@mui/material';
import HabitList from './components/HabitList';
function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Controle de Hábitos Diários
        </Typography>
        <HabitList />
      </Paper>
    </Container>
  );
}

export default App;