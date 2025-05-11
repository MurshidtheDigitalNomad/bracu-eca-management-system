import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignUpUser.css';

const SignUpUser =()=>{
    const[selectedRole, setSelectedRole]= useState('');
    const navigate = useNavigate();

    const handleSelection = () => {
        if (selectedRole === 'student') {
          navigate('/signup-student');
        } else if (selectedRole === 'faculty') {
          navigate('/signup-faculty');
        } else {
          alert('Please select a role.');
        }
    };

    return(
        <div className="role-selector-container">
            <h2>Select Your Role</h2>
            <div className="role-table">
            <label className="role-option">
                <input
                type="radio"
                name="role"
                value="student"
                checked={selectedRole === 'student'}
                onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>Student</span>
            </label>
    
            <label className="role-option">
                <input
                type="radio"
                name="role"
                value="faculty"
                checked={selectedRole === 'faculty'}
                onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>Faculty</span>
            </label>
            </div>
    
            <button   onClick={handleSelection} className="select-button">
            Continue
            </button>
        </div>
    )
}

export default SignUpUser;