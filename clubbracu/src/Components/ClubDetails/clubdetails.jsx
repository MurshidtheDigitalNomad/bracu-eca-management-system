import React, {useState, useEffect} from 'react';
import './clubdetails.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; 
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FcBusiness } from "react-icons/fc";
import eventpic from '../EventBoxes/eventpic.jpg'
import CodingClub from '../../assets/ClubPictures/CodingClub.png'

const ClubDetails = () => {
  const {club_id} = useParams();
  const[singleClub, setSingleClub]=useState(null)
  const [clubEvents, setClubEvents] = useState([]);

  useEffect(()=>{
    const fetchSingleClub = async ()=>{
      try{
        const response= await axios.get(`http://localhost:8000/api/clubs/${club_id}`)
        setSingleClub(response.data);
      
      
      }catch(err){
        console.error(err);
        toast.error('Failed to fetch club details.');
      }
    };
    fetchSingleClub();
  }, [club_id])


  useEffect(() => {
    const fetchClubEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/events/clubs/${club_id}`);
          setClubEvents(response.data.events); 
        } catch (err) {
          console.error(err);
          toast.error("Failed to load events for this club.");
        }
    };

    fetchClubEvents();
  }, [club_id]);

  if (!singleClub) {
    return <div><h1>Club not found</h1></div>;
  }

  return (
    <div className="club-details-page">
      <div
        className="club-banner"
        style={{
          backgroundImage: `url(${ CodingClub})`,
          
          overflow: "hidden",
        }}
      >
        <h1 className="club-name1">{singleClub.name}</h1>
      </div>
      <div className="club-content">
        <div className="club-sidebar">
          <ul>
            <li><a href="#description">Description</a></li>
            <li><a href="#vision">Vision</a></li>
            <li><a href="#members">Members</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#join">Join</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="club-main">
          <section id="description">
            <h2>Description</h2>
            <p>{singleClub.description}</p>
          </section>

          <section id="vision">
            <h2>Vision</h2>
            <p>{singleClub.vision}</p>
          </section>

          <section id="members">
            <h2>Members</h2>
            <p>{singleClub.members} members</p>
          </section>

          <section id="events">
            <h2>Events</h2>
            <div className="event-boxes">
              {clubEvents.map((event) => (
                <Link to={`/events/${event.event_id}`} className="event-link" key={event.event_id}>
                <div className="event-box" key={event.event_id}>
                  <img src={eventpic} alt="Event" className="adv-img1" />
                  <h2 className="event-name">{event.event_name}</h2>
                  <div className="event-info">
                    <p className="info-item"><IoMdTime /> {event.event_date}</p>
                    <p className="event-location"><CiLocationOn /> {event.venue}</p>
                    <p className="event-organizedBy"><FcBusiness /> {event.club_name}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </section>

          <section id="join">
            <h2>Join</h2>
            <Link to={`/clubs/${singleClub.club_id}/request-join-club`}><button>Click to join Club</button></Link>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>Facebook: {singleClub.facebook_link}</p>
            <p>InStagram: {singleClub.instagram_link}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;