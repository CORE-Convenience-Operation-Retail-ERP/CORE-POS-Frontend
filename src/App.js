import logo from './logo.svg';
import './App.css';
import PosRoutes from './routes/PosRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <PosRoutes />
    </BrowserRouter>
  );
}

export default App;
