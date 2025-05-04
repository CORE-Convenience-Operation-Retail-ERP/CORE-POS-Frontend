const LoginFormCom = ({loginInput, onChange, onSubmit}) => {
    return(
      <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>POS 로그인</h2>
      <input
        type="text"
        name="loginId"
        value={loginInput.loginId}
        onChange={onChange}
        placeholder="아이디"
        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '12px' }}
      />
      <input
        type="password"
        name="loginPwd"
        value={loginInput.loginPwd}
        onChange={onChange}
        placeholder="비밀번호"
        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '20px' }}
      />
      <button
        onClick={onSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginFormCom;
