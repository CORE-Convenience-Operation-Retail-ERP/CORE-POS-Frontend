import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import OrderPage from '../pages/OrderPage';
import TransactionPage from '../pages/TransactionListPage';
import ReceiptPage from '../pages/ReceiptPage';
import UnifiedSettlementPage from '../pages/UnifiedSettlementPage';
import MainLayout from '../layouts/MainLayout';
import PaymentPage from '../pages/PaymentPage';
import TempStoragePage from '../pages/TempStoragePage';

const PosRoutes = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pos" replace />} />
      <Route path="/pos/*" element={<MainLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="order" element={token ? <OrderPage /> : <Navigate to="/pos" replace />} />
        <Route path="payment" element={token ? <PaymentPage /> : <Navigate to="/pos" replace />} />
        <Route path="transactions" element={token ? <TransactionPage /> : <Navigate to="/pos" replace />} />
        <Route path="receipt/:transactionId" element={<ReceiptPage />} />
        <Route path="settlement" element={<UnifiedSettlementPage />} />
        <Route path="storage" element={<TempStoragePage />} />
      </Route>
    </Routes>
  );
};

export default PosRoutes;
