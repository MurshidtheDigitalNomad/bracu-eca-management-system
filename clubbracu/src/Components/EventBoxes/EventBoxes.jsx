import React, {useState, useEffect} from 'react';
import './EventBoxes.css';
import { Link } from 'react-router-dom';
import eventpic from './eventpic.jpg';
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FcBusiness } from "react-icons/fc";
import axios from 'axios';
import {toast} from 'react-toastify'


const EventBoxes = () => {
    const[events, setEvents]= useState([]);

    useEffect(()=>{
        const fetchApprovedEvents= async ()=>{
        try{
            const response = await axios.get('http://localhost:8000/api/events/events-list');
            setEvents(response.data)
        }catch(err){
            console.err(err)
            toast.error('Try again later!')

        }
        }
        fetchApprovedEvents();
    }, [])
    return(
        <div className="parent-box">
            {events.map((event) => (
                <Link to={`/events/${event.event_id}`} className="event-link" key={event.event_id}>
                <div className="event-box" key={event.event_id}>
                    <img src={eventpic} alt="Event" className="adv-img1" />
                    <h2 className="event-name">{event.event_name}</h2>
                    <div className="event-info">
                        <p className="info-item"><IoMdTime /> {event.event_date}</p>
                        <p className="event-location"><CiLocationOn /> {event.venue}</p>
                        <p className="event-organizedBy"><FcBusiness /> {event.name}</p>
                   </div>
                </div>
                </Link>
            ))}
       </div>
    );


}

export default EventBoxes;
