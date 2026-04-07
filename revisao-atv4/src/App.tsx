import { UserDashboard } from './components/UserDashboard';
import { HabitDashboard } from './components/HabitDashboard';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF', padding: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#FF4500', fontSize: '2.5rem' }}>Mini Dashboard - FATEC</h1> 
        <p style={{ color: '#FF8C00' }}>Lab de Desenvolvimento Web - Prof. Neymar</p> 
      </header>
      
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        <UserDashboard />
        <HabitDashboard />
      </main>
    </div>
  );
}

export default App;