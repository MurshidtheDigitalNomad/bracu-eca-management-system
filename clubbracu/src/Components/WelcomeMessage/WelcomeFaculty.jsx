import React, {useState, useEffect} from 'react';
import { useAuth } from '../../context/AuthContext';
import './WelcomeFaculty.css' 
  
const WelcomeFaculty = () =>{
    const{user} = useAuth();

    return(
        <div className="faculty-welcome-message"
            
        >
            {user? (<h1 className='faculty-welcome-text'> Welcome {user.name}!</h1>
            ):(<h1 className='welcome-text'> Welcome!</h1>)}
            
        </div>
    )
}

export default WelcomeFaculty;