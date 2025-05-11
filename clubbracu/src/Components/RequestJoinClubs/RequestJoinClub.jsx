import { useState } from 'react';
import './RequestJoinClub.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {useAuth} from '../../context/AuthContext.jsx';

const RequestJoinClub  = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    internalDepartment: '',
    skills: '',
    reason: '',
  });

  const {user}= useAuth();
  const navigate= useNavigate();
  const {club_id}= useParams();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await axios.post(`http://localhost:8000/api/users/${club_id}/join`, {
        student_id: user.student_id,
        ...formData,
      });

      if (response.status === 200) {
        toast.success('Request submitted successfully!');
        
        navigate('/student-view')
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit request.');
    }
  };

  return (
    <form className="join-club-form" onSubmit={handleSubmit}>
      <h2>Join This Club</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Your Department</option>
        <option value="CSE">CSE</option>
        <option value="BBA">BBA</option>
        <option value="MNS">MNS</option>
        <option value="LAW">LAW</option>
        <option value="PMC">PMC</option>
      </select>

      <select
        name="internalDepartment"
        value={formData.internalDepartment}
        onChange={handleChange}
        required
      >
        <option value="">Select Club Department</option>
        <option value="HR Management">HR Management</option>
        <option value="Event Management">Event Management</option>
        <option value="Research And Development">Research And Development</option>
        <option value="Project Management">Project Management</option>
        <option value="Social Media and Marketing">Social Media and Marketing</option>
      </select>

      <input
        type="text"
        name="skills"
        placeholder="Mention Relevant Skills"
        value={formData.skills}
        onChange={handleChange}
        required
      />

      <textarea
        name="reason"
        placeholder="Why do you want to join this club?"
        value={formData.reason}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestJoinClub;
