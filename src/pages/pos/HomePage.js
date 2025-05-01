import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const products = [
    { id : 1, name : '초코바', price : 1000},
    { id : 2, name : '콜라', price : 1500},
    { id : 3, name : '삼각김밥', price : 1800},
];

const HomePage = () => {
    const [cart, setCart] = useState({});
    const navigate = useNavigate();


    const handleIncrease = (id) => {
        setCart(prev => ({
            ...prev,
            [id] : (prev[id] || 0) + 1
        }));
    };

    const handleDecrease = (id) => {
        setCart(prev => {
            if (!prev[id]) return prev;
            const update = {...prev};
            if(update[id] === 1) delete update[id];
            else update[id] -= 1;
            return update;
        });
    };

    const handleGoToPayment = () => {
        const selectedItems = Object.entries(cart).map(([id, quantity]) => {
            const product = products.find(p => p.id === parseInt(id));
            return{...product, quantity};
        });
    
        navigate('/payment', { state : {items : selectedItems}});
    };

return (
    <div style={{ padding : '20px'}}>
        <h2>상품 선택</h2>

        {products.map(product => (
            <div key={product.id} style={{
                display : 'flex',
                justifyContent : 'spae-between',
                alignItems : 'center',
                padding : '12px 16px',
                marginBottom : '12px',
                backgroundColor : '#f9fafb',
                borderRadius : '8px',
                boxShadow : '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {product.name}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <button onClick={() => handleDecrease(product.id)}>-</button>
                    <span>{cart[product.id] || 0 }</span>
                    <button onClick={() => handleIncrease(product.id)}>+</button>
                    <span style={{minWidth: '60px', textAlign: 'right'}}>
                        {(product.price * (cart[product.id] || 0)).toLocaleString()}원
                    </span>
                </div>
            </div>
        ))}

        <button onClick={handleGoToPayment} style={{
        marginTop: '20px',
        backgroundColor: '#3b82f6',
        color: '#fff',
        padding: '14px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        width: '100%'
        }}>
        💳 결제하기
        </button>
    </div>
    );
};
export default HomePage;
