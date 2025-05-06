import { Routes, Route, Navigate } from 'react-router-dom';
import PosLayout from '../layouts/PosLayout';
import LoginPage from '../pages/LoginPage';
import OrderPage from '../pages/OrderPage';
import PaymentResultPage from '../pages/PaymentResultPage';
import TransactionPage from '../pages/TransactionListPage';


const PosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pos" replace />} />
      <Route path="/pos/*" element={<PosLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="result" element={<PaymentResultPage />} />
        <Route path="transactions" element={<TransactionPage />} />
      </Route>
    </Routes>

  );
};

export default PosRoutes;
