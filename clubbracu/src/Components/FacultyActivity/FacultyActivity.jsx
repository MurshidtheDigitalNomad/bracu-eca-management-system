import React, {useState} from 'react';
import '../StudentActivity/StudentActivity.css';
import {toast} from 'react-toastify';
import axios from 'axios';
import './FacultyActivity.css'


const FacultyActivity = () => {
    const[pendingClubs, setPendingClubs]= useState([]);
    const[pendingEvents, setPendingEvents] = useState([])
    const fetchPendingClubs= async(e) =>{
        try{
            const response= await axios.get('http://localhost:8000/api/clubs/pending-clubs');
            toast.success('Fetch Successful')
            setPendingClubs(response.data)
        }catch(err){
            console.error(err);
            toast.error('Unable to fetch clubs! please try again later!')
        }
    }

    const sendApprovedClubs = async (clubId)=>{
        try{
            await axios.patch(`http://localhost:8000/api/clubs/${clubId}/approve`);
            setPendingClubs(prev=>prev.filter(club=> club.club_id !=clubId))

        }catch (err) {
            console.error(err);
            toast.error('Failed to approve club');
        }
    }    

    const fetchPendingEvents= async(e) =>{
        try{
            const response= await axios.get('http://localhost:8000/api/events/pending-events');
            toast.success('Event Fetch Successful')
            setPendingEvents(response.data)
        }catch(err){
            console.error(err);
            toast.error('Unable to fetch events! please try again later!')
        }
    }
    const sendApprovedEvents = async (event_id)=>{
        try{
            await axios.patch(`http://localhost:8000/api/events/${event_id}/approve`);
            setPendingEvents(prev=>prev.filter(event=> event.event_id !=event_id))

        }catch (err) {
            console.error(err);
            toast.error('Failed to approve club');
        }
    }

    return (
      <div className="activity-content">
            <div className="activity-sidebar">
            <ul>
                <li><a href="#view-clubs-requests">Club Requests</a></li>
                <li><a href="#view-events-requests">Event Requests</a></li>
            </ul>
            </div>
  
        <div className="activity-main">
          <section id="activity">
            <div className='club-activity'>
              <section id="view-clubs-requests">
                <h2>Pending Club Requests</h2>
                <div>
                    <button className='primary-button' onClick={fetchPendingClubs}>Click to view club request</button>
                    <div className='club-boxes'>
                        {pendingClubs.map(pending_club=>(
                            <div key={pending_club.club_id} className='member-card'>
                                <h3>{pending_club.name}</h3>
                                <p><strong>Vision:</strong> {pending_club.vision}</p>
                                <p><strong>Description:</strong> {pending_club.description}</p>
                                <p><strong>Advisor:</strong> {pending_club.advisor}</p>
                                <button onClick={() => sendApprovedClubs(pending_club.club_id)}>Approve</button>

                            </div>
                        ))}
                    </div>
                </div>
              </section>
              <section id="view-events-requests">
                <h2>Pending Events Requests</h2>
                <div>
                    <button className='primary-button' onClick={fetchPendingEvents}>Click to view event requests</button>
                    <div className='event-boxes'>
                        {pendingEvents.map(pending_event=>(
                            <div key={pending_event.event_id} className='event-card'>
                                <h3>Event Name: {pending_event.event_name}</h3>
                                <p><strong>Club:</strong> {pending_event.name}</p>
                                <p><strong>Venue:</strong> {pending_event.venue}</p>
                                <p><strong>Date:</strong>{new Date(pending_event.event_date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                            })}
                                </p>
                                <p><strong>Description:</strong> {pending_event.description}</p>
                                <button onClick={() => sendApprovedEvents(pending_event.event_id)}>Approve</button>

                            </div>
                        ))}
                    </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default FacultyActivity;