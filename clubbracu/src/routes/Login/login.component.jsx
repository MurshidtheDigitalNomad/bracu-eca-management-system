import React from 'react';
import './login.css'
import LoginPage from '../../Components/LoginPage/LoginPage';

const Login = () => {
    return(
        <div>
            <div 
            className='login-header'>
                <h1 className='login-title'>Log into your Account</h1>
            </div>
            <LoginPage/>
        </div>
    )
}

export default Login;