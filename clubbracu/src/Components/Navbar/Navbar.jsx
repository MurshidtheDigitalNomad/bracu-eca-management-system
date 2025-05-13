import React from 'react';
import {Outlet, Link} from 'react-router-dom';
import BracuLogo from './Braculogo.png';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Navbar(){
    const{user, logout}= useAuth();
    const navigate = useNavigate();
   

    return(
        
        <div>
            <div className="navbar">
                <div  className='logo'>
                    <a href='https://www.bracu.ac.bd/'>
                    <img 
                    src= {BracuLogo}
                    alt='BracuLogo'
                    className="w3.5 h3"
                    />
                    </a>
                </div>
                <div className= "links-container">
                        <Link className='nav-button active' to='/'>Clubs</Link>
                        <Link className='nav-button' to='/events'>Events</Link>

                        {user ? (
                            <div className="auth-section">
                                <span
                                    onClick={() => {
                                        if (user.role === 'student') navigate('/student-view');
                                        else if (user.role === 'faculty') navigate('/faculty-view');
                                        else if (user.role === 'club_admin') navigate('/club-admin-view');
                                        else navigate('/');
                                    }}
                                    className="nav-button"
                                    style={{ cursor: 'pointer' }}
                                    >
                                    Hello {user?.name}
                                    </span>
                                <button className='nav-button'onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link className='nav-button' to='/login'>Login</Link>
                        )}
                </div>
            </div>
            <div className='outlet'>
                <Outlet/>
            </div>

        </div>
    )
}

export default Navbar;