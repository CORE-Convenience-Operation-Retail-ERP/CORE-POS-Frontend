import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import PosRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <PosRoutes />
    </BrowserRouter>
  );
}

export default App;
