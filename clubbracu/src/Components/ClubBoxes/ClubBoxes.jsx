import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './ClubBoxes.css';
import axios from'axios';
import{toast} from 'react-toastify';
import CodingClub from '../../assets/ClubPictures/CodingClub.png'


const ClubBoxes = () => {
  const[clubs, setClubs]= useState([]);

  useEffect(()=>{
    const fetchApprovedClubs= async ()=>{
      try{
        const response = await axios.get('http://localhost:8000/api/clubs/clubs-list');
        setClubs(response.data)
      }catch(err){
        console.err(err)
        toast.error('Try again later!')

      }
    }
    fetchApprovedClubs();
  }, [])
    return (
      <div className="parent-box">
        {clubs.map((club) => (
          <Link 
            to={`/clubs/${club.club_id}`} 
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
    );
  };

export default ClubBoxes;