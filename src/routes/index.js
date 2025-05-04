import { Routes, Route, Navigate } from 'react-router-dom';
import PosLayout from '../layouts/PosLayout';
import LoginPage from '../pages/LoginPage';
import OrderPage from '../pages/OrderPage';


const PosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pos" replace />} />
      <Route path="/pos/*" element={<PosLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="order" element={<OrderPage />} />
      </Route>
    </Routes>

  );
};

export default PosRoutes;
