import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import './EventDetails.css';
import { useParams } from 'react-router-dom';
import RSVPModal from './RSVPModal';
import {useAuth} from '../../context/AuthContext.jsx'

import eventpic from '../EventBoxes/eventpic.jpg';

const EventDetails = () => {
  
    const {event_id} = useParams();
    const[singleEvent, setSingleEvent]=useState(null)
    const [showModal, setShowModal] = useState(false);
    const{user} = useAuth()
   

    useEffect(()=>{
        const fetchSingleEvent = async ()=>{
            try{
            const response= await axios.get(`http://localhost:8000/api/events/${event_id}`)
            setSingleEvent(response.data);
        
        
        }catch(err){
            console.error(err);
            toast.error('Failed to fetch club details.');
        }
        };
        fetchSingleEvent();
    }, [event_id])

    if (!singleEvent) {
        return <div><h1>Event not found</h1></div>;
    }

    const handleRSVPConfirm = async () => {
    try {
      await axios.post(`http://localhost:8000/api/events/${event_id}/register`, {
        student_id: user?.student_id
      });
      toast.success('You have successfully registered!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to register.');
    }
    setShowModal(false);
  };
  
       

        return (
            <div className='event-details-container'>
               
                <div className='event-content'>
                    <h1 className='event-title'>{singleEvent.event_name}</h1>
                    <div className='event-info'>
                        <p><strong>Date:</strong> {new Date(singleEvent.event_date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                            })}
                        </p>
                        <p><strong>Location:</strong> {singleEvent.venue}</p>
                        <p><strong>Organized By:</strong> {singleEvent.name}</p>
                    </div>

                    <div className='event-description'>
                        <p><strong> Event Details:</strong> {singleEvent.description}</p>
                    </div>
                    
                    <div className='rsvp-button'>
                        <p><i>Want to join us? Click the button below to RSVP!</i></p>
                        <button className='rsvp-btn' onClick={(()=>setShowModal(true))}>RSVP: Add to my Calender</button>
                    </div>
                </div>
                
                {showModal && (
                    <RSVPModal
                    event={singleEvent}
                    onConfirm={handleRSVPConfirm}
                    onCancel={() => setShowModal(false)}
                    />
                )}
            </div>
        )


}

export default EventDetails;