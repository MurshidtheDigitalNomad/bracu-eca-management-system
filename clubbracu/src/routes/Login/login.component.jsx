import React from 'react';
import LoginPage from '../../Components/LoginPage/LoginPage';

const Login = () => {
    return(
        <div>
            <div 
            className='flex justify-center items-center'
            style={{
                backgroundColor: '#e0e0e0',
                width: '100%',
                height: '20vh'
            }}>
                <h1 style={{textAlign: 'center'}}>Login</h1>
            </div>
            <LoginPage/>
        </div>
    )
}

export default Login;