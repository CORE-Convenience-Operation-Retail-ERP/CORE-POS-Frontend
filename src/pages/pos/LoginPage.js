import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {

    const [loginId, setLoginId] = useState('');
    const [loginPwd, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                
                loginId,
                loginPwd,
            });
            
            console.log("로그인 응답:", response.data);

            const token = response.data.token;
            const user = response.data;
            const branchName = response.data.branchName || response.data.storeName || "";
            const storeId = user.storeId || user.store_id || user.store?.storeId;

        if (token) {
            localStorage.setItem('posToken', token);
            localStorage.setItem('posUser', JSON.stringify(response.data));
            localStorage.setItem("branchName", branchName);
            localStorage.setItem('storeId', storeId || '');

            if (!storeId) {
                alert("⛔ storeId 정보가 없습니다. 관리자에게 문의하세요.");
                return;
              }
            
            
            navigate('/pos/order');
        } else {
            setError('로그인 실패 : 토큰이 없습니다.');
        }
    } catch (e) {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }

};

return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h2>POS 로그인</h2>

        <input
            type="text"
            placeholder="점주 ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '12px' }}
        />

        <input
            type="password"
            placeholder="비밀번호"
            value={loginPwd}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '12px' }}
        />

        <button
            onClick={handleLogin}
            style={{
                padding : '10px 20px',
                background : '#2563eb',
                color : '#fff',
                border : 'none',
                borderRadius : '6px',
                width : '100%'
        }}
        >
            로그인
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
export default LoginPage;