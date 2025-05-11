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
                        <Link className='dim black f3 pa2 hover-bg-black-10 br2' to='/'>Clubs</Link>
                        <Link className='dim black f3 pa2 hover-bg-black-10 br2' to='/events'>Events</Link>

                        {user ? (
                            <div className="auth-section">
                                <span
                                    onClick={() => {
                                        if (user.role === 'student') navigate('/student-view');
                                        else if (user.role === 'faculty') navigate('/faculty-view');
                                        else if (user.role === 'club_admin') navigate('/club-admin-view');
                                        else navigate('/');
                                    }}
                                    className="f4 black pa2 hover-bg-black-10 br2"
                                    style={{ cursor: 'pointer' }}
                                    >
                                    Hi, {user?.name}
                                    </span>
                                <button className='f4 pa2 br2 bg-black white hover-bg-dark-gray'onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link className='dim black f3 pa2 hover-bg-black-10 br2' to='/login'>Login</Link>
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