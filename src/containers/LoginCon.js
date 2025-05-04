import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginFormCom from "../components/LoginFormCom";
import { loginRequest } from "../services/AuthService";
import { saveAuthToStorage } from "../services/authUtils";

const LoginCon = () => {
    const [loginInput, setLoginInput] = useState({
        loginId: '', 
        loginPwd: ''
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        const {name, value} = e.target;
        setLoginInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async () => {
        try {
            const data = await loginRequest(loginInput);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('branchName', data.branchName);
            localStorage.setItem('storeId', data.storeId);
            localStorage.setItem('empName', data.empName);

            saveAuthToStorage(data);

            navigate('/pos/order');
        } catch(error) {
            alert(error.message);
        }
    };

    return(
        <LoginFormCom loginInput={loginInput} onChange={onChange} onSubmit={onSubmit}/>
    );

};
export default LoginCon;
