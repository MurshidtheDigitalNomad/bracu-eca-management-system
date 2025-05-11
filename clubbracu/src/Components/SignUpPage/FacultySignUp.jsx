import React, {useState} from 'react';
import {toast} from 'react-toastify'
import "./FacultySignUp.css"
import { useNavigate} from 'react-router';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const FacultySignUp =()=>{
    const[submitstate, setSubmitState]= useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        advisorId: '',
        name: '',
        email: '',
        room: '',
        club: '',
        department: '',
        designation: '',
        password:'',
        confirmpassword:''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (
          formData.password !== formData.confirmpassword){
            toast.error('Passwords do not match!')
            return;
          }
        if (submitstate) return;
        setSubmitState(true);

        try{
            const response = await axios.post('http://localhost:8000/api/users/faculty-signup', formData)
            if (response.status===201){
                const user= response.data.user;
                locqalStorage.setItem('user', JSON.stringify(user))
                toast.success('SignUp Successful')
                navigate('/faculty-view')
            }else{
                toast.error('Internal Server Error: SignUp Unsuccessful')
            }

        }catch(err){
            console.log(err);
            toast.error('SignUp Unsuccessful, please try again later')
        } finally {
            setSubmitState(false);
        }

    };
    
      return (
        <div className="faculty-signup-container">
          <h2>Faculty Sign-Up</h2>
          <form onSubmit={handleSubmit} className="faculty-signup-form">
            <label>
              Advisor ID:
              <input
                type="text"
                name="advisorId"
                value={formData.advisorId}
                onChange={handleChange}
                required
              />
            </label>
    
            <label>
              Full Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
    
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
    
            <label>
              Room (Optional):
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., 4P25"
              />
            </label>
    
            <label>
              Club Name:
              <input
                type="text"
                name="club"
                value={formData.club}
                onChange={handleChange}
                required
              />
            </label>
    
            <label>
              Department:
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="BBA">BBA</option>
                <option value="LAW">LAW</option>
                <option value="PHC">PHC</option>
                <option value="MNS">MNS</option>
              </select>
            </label>
    
            <label>
              Designation:
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Professor">Professor</option>
              </select>
            </label>

            <label className="db mb1 inter-font">Create Password</label>
          <input 
          required 
          name= 'password'
          value ={formData.password}
          onChange={handleChange}
          placeholder="Must be at least 8 characters"
          type="password" 
         />

          <label >Confirm Password:</label>
          <input 
          required 
          name='confirmpassword'
          value ={formData.confirmpassword}
          onChange={handleChange}
          type="password" 
          />
    
            <button type="submit" disabled={submitstate}>{submitstate ? 'Submitting...' : 'Sign Up'}</button>
          </form>
        </div>
      );
}

export default FacultySignUp;