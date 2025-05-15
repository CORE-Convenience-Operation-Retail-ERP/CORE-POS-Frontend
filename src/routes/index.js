import { Routes, Route, Navigate } from 'react-router-dom';
import PosLayout from '../layouts/PosLayout';
import LoginPage from '../pages/LoginPage';
import OrderPage from '../pages/OrderPage';
import PaymentResultPage from '../pages/PaymentResultPage';
import TransactionPage from '../pages/TransactionListPage';
import ReceiptPage from '../pages/ReceiptPage';


const PosRoutes = () => {

  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pos" replace />} />
      <Route path="/pos/*" element={<PosLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="order" element={token ? <OrderPage /> : <Navigate to="/pos" replace />} />
        <Route path="result" element={token ? <PaymentResultPage /> : <Navigate to="/pos" replace />} />
        <Route path="transactions" element={token ? <TransactionPage /> : <Navigate to="/pos" replace />} />
        <Route path="receipt/:transactionId" element={<ReceiptPage />} />
      </Route>
    </Routes>

  );
};

export default PosRoutes;
