import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import './SignUpPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const SignUp=()=>{
    const [formData, setFormData] = useState({
        fullName: '',
        studentID: '',
        email: '',
        department: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();
    const {login}= useAuth();

    const handleChange =(e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();

      if (
        formData.password !== formData.confirmPassword){
          toast.error('Passwords do not match!')
          return;
        }
      
      try{
        const response = await axios.post('http://localhost:8000/api/users/signup', formData);
        const user = response.data.user;
        
        localStorage.setItem('user', JSON.stringify(user))
        console.log(user)
        login(user)
        toast.success('Sign up successful!')
        navigate('/signup/student-view')
        
      }catch(err){
        toast.error('Sign up failed!')
        console.error(err);
      }
      
    }

    return(
    <div>
      <form onSubmit={handleSubmit} className='vh-100 flex justify-center items-center bg-light-white'>
        <div className="w-100 w-50-m w-30-l pa4">

          <label className="db mb1 inter-font">Full Name</label>
          <input 
          type="text" 
          required
          name="fullName"
          value ={formData.fullName}
          onChange={handleChange}
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font" placeholder="The Legend Bracuian" />

          <label className="db mb1S inter-font">Please enter your 8-digit student ID</label>
          <input 
          type="text" 
          name= 'studentID'
          value ={formData.studentID}
          onChange={handleChange}
          required 
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font" placeholder="22299432" />

          <label className="db mb1 inter-font">Email</label>
          <input 
          type="email" 
          name= 'email'
          value ={formData.email}
          onChange={handleChange}
          required 
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font" placeholder="you@g.bracu.ac.bd" />

          <label className="db mb1 inter-font">Department</label>
          <select 
          required 
          name= 'department'
          value ={formData.department}
          onChange={handleChange}
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font">
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="BBA">BBA</option>
            <option value="MNS">MNS</option>
            <option value="PMC">PMC</option>
            <option value="LAW">LAW</option>
          </select>

          <label className="db mb1 inter-font">Phone Number</label>
          <input 
          required 
          name= 'phoneNumber'
          value ={formData.phoneNumber}
          onChange={handleChange}
          type="text" 
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font" placeholder="+8801XXXXXXXXX" />

          <label className="db mb1 inter-font">Create Password</label>
          <input 
          required 
          name= 'password'
          value ={formData.password}
          onChange={handleChange}
          placeholder="Must be at least 8 characters"
          type="password" 
          className="pa2 mb3 w-100 br2 bg-light-gray inter-font" />

          <label className="db mb1 inter-font">Confirm Password</label>
          <input 
          required 
          name='confirmPassword'
          value ={formData.confirmPassword}
          onChange={handleChange}
          type="password" 
          className="pa2 mb4 w-100 br2 bg-light-gray inter-font" />
          <div>
            <button 
            type ="submit"
            className="w-100 pa3 bg-black white br2 inter-font pointer grow">Sign Up
            </button>
          </div>
          
        </div>
      </form>
      <div>
      <p className="tc mt3 inter-font">
            Already have an account?{' '}
            <Link to="/login" className="black underline-hover">
              Log in
            </Link>
      </p>
      </div>
        
    </div>  
    
    )
}

export default SignUp;