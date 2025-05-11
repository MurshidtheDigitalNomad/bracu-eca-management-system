import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './StudentActivity.css';
import { useAuth } from '../../context/AuthContext'; 
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FcBusiness } from "react-icons/fc";
import {toast} from 'react-toastify';
import axios from 'axios';
import '../ClubBoxes/ClubBoxes.css'
import eventpic from '../EventBoxes/eventpic.jpg'
import CodingClub from '../../assets/ClubPictures/CodingClub.png'

const Activity = () => {
    const{user} = useAuth();  
    const[joinedClubs, setJoinedClubs]= useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(()=>{
      const fetchMyClubs= async ()=>{
        try{
          const response = await axios.get(`http://localhost:8000/api/clubs/my-clubs/${user.student_id}`);
          setJoinedClubs(response.data.clubs)
          console.log(joinedClubs)
        }catch(err){
          console.error(err)
          toast.error('Try again later!')

        }
      }
      fetchMyClubs();
    }, [user])


    useEffect(() => {
      const fetchRegisteredEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/events/my-events/${user.student_id}`);
          setRegisteredEvents(response.data.events);
        } catch (err) {
          console.error(err);
          toast.error('Failed to load your events');
        }
      };

      fetchRegisteredEvents();
    }, [user.student_id]);


  return (
    <div className="activity-content">
      <div className="activity-sidebar">
        <ul>
          <li>
            <a href="#activity">Activity</a>
            <ul className="sub-menu">
              <li><a href="#view-clubs">Your Clubs</a></li>
              <li><a href="#view-events">Your Events</a></li>
            </ul>
          </li>
          <li><a href="#request-club">Request Club</a></li>
        </ul>
      </div>

      <div className="activity-main">
        <section id="activity">
          <div className='club-activity'>
            <section id="view-clubs">
              <h2>Your Clubs</h2>
              <div className="parent-box">
                {joinedClubs.map((club) => (
                  <Link to={`/clubs/${club.club_id}`} 
                  key={club.club_id} 
                  className="clubbox-link"
                  style={{ textDecoration: 'none', color: 'inherit' }} // Removes underline and keeps text color
                  >
                  <div className="clubbox">
                    <img src={club.image || CodingClub} alt={club.name} className="adv-img" />
                    <h2 className="club-name">{club.name}</h2>
                  </div>
                  </Link>
              ))}
              </div>
            </section>
            <section id="view-events">
              <h2>Your Events</h2>
              <p>List of events you are attending:</p>
              <div className="registered-events">
                  {registeredEvents.map(event => (
                     <div className="event-box" key={event.event_id}>
                    <img src={eventpic} alt="Event" className="adv-img1" />
                    <h2 className="event-name">{event.event_name}</h2>
                    <div className="event-info">
                        <p className="info-item"><IoMdTime /> {event.event_date}</p>
                        <p className="event-location"><CiLocationOn /> {event.venue}</p>
                        <p className="event-organizedBy"><FcBusiness /> {event.club_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section id="request-club">
          <h2>Request Club</h2>
          <button><Link to='/club-request-form'>Club Creation Form</Link></button>
        </section>
      </div>
    </div>
  );
};

export default Activity;
