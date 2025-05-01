import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/pos/HomePage';
import PosLayout from '../layouts/PosLayout';
import LoginPage from '../pages/pos/LoginPage';

const PosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pos" replace />} />
      <Route path="/pos/*" element={<PosLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>

  );
};

export default PosRoutes;
