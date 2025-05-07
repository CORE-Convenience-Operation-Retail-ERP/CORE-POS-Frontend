import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PosRoutes from './routes';
import BarcodeSearch from './pages/BarcodeSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PosRoutes />} />
        <Route path="/test/barcode" element={<BarcodeSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
