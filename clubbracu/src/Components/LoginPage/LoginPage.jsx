import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const LoginPage=()=>{

    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })
    
    const {login}= useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setloginData({
            ...loginData, 
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try {
            
            const emailCheck = loginData.email;

            let response;
            if (emailCheck.endsWith('@g.bracu.ac.bd')) {
                response = await axios.post('http://localhost:8000/api/users/student-view', loginData);
            } else if (emailCheck.endsWith('@bracu.ac.bd')) {
                response = await axios.post('http://localhost:8000/api/users/faculty-view', loginData);
            } else {
                toast.error('Invalid email domain');
                return;
            }

            if (response.status === 200) {
                const user = response.data.user;

                let role='';
                if (emailCheck.endsWith('@g.bracu.ac.bd')) {
                    role = user.is_admin ? 'club_admin' : 'student';
                } else if (emailCheck.endsWith('@bracu.ac.bd')) {
                    role = 'faculty';
                }

                const userWithRole = {...user, role}

                localStorage.setItem('user', JSON.stringify(user))
                login(userWithRole);
                toast.success('Login Successful')
              
                if (role === 'club_admin') {
                    navigate('/club-admin-view');
                } else if (role === 'student') {
                    navigate('/student-view');
                } else if (role === 'faculty') {
                    navigate('/faculty-view');
                }
            }

        } catch (err) {
            toast.error('Login failed!');
            console.error(err);
        }
    }

    
    return(
        <div className="login-container">

            <div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Enter your g-suite email:</label>
                        <input 
                            id="email"
                            type="email" 
                            name ='email'
                            value={loginData.email}
                            onChange={handleChange}
                            placeholder="Enter your email" 
                            className="form-input"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            name ='password'
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Enter your password" 
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="login-button">Log In</button>
                </form>
            </div>
            <div className="signup-link">
                    <p>
                        Don't have an account? <Link to="/sign-up-user" className="link-text">Sign Up</Link>
                    </p>
            </div>
            
        
        </div>
    )
}

export default LoginPage;