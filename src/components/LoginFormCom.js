const LoginFormCom = ({loginInput, onChange, onSubmit}) => {
    return(
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <img src="/core_logo.png" alt="CORE 로고" style={{ height: 60 }} />
          </div>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '24px',
            color: '#1f2937',
            fontSize: '24px'
          }}>POS </h2>
          <input
            type="text"
            name="loginId"
            value={loginInput.loginId}
            onChange={onChange}
            placeholder="아이디"
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              ':focus': {
                borderColor: '#3b82f6'
              }
            }}
          />
          <input
            type="password"
            name="loginPwd"
            value={loginInput.loginPwd}
            onChange={onChange}
            placeholder="비밀번호"
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              ':focus': {
                borderColor: '#3b82f6'
              }
            }}
          />
          <button
            onClick={onSubmit}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: '12px',
              boxSizing: 'border-box',
              ':hover': {
                backgroundColor: '#2563eb'
              }
            }}
          >
            로그인
          </button>
        </div>
      </div>
    );
};

export default LoginFormCom;
