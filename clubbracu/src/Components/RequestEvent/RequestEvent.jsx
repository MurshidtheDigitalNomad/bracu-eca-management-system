import React, { useState } from 'react';
import './RequestEvent.css';
import {toast} from 'react-toastify'
import {useAuth} from '../../context/AuthContext.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router';

const RequestEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    eventDate: '',
    maxAttendees: '',
    venue: '',
    description: '',
    resources: ''
  });

  const {user}= useAuth();

  const venues = [
    'Multipurpose Hall',
    'Auditorium',
    'Lecture Theatre 1',
    'Lecture Theatre 2',
    'Rooftop'
  ];

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.admin_club_id) {
        toast.error("Club ID not found. Please login again.");
        return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/events/${user.student_id}/request-events`, 
        {
        ...formData,
        club_id: user.admin_club_id  
      }
      )
      navigate('/club-admin-view')
      toast.success('Event submitted successfully!');
      
    } catch (err) {
      console.error(err);
      toast.error('Submission failed.');
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="form-title">Request a New Event</h2>
      <form onSubmit={handleSubmit} className="event-form" >
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <input type="date" name="eventDate" required value={formData.eventDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Maximum Attendees</label>
          <input type="number" name="maxAttendees" required value={formData.maxAttendees} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <select name="venue" required value={formData.venue} onChange={handleChange}>
            <option value="">-- Select a Venue --</option>
            {venues.map((v, index) => (
              <option key={index} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Resources</label>
          <textarea name="resources" rows="3" value={formData.resources} onChange={handleChange} />
        </div>

     
        <button type="submit" className="submit-btn">Submit Event Request</button>
      </form>
    </div>
  );
};

export default RequestEvent;
