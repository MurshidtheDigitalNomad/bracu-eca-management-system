import './SearchEvents.css';
import { CiSearch } from "react-icons/ci";
import {useState, useEffect} from 'react';
import eventpic from '../EventBoxes/eventpic.jpg';
import {toast} from 'react-toastify';
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FcBusiness } from "react-icons/fc";
import axios from 'axios'

const SearchEvents = () => {
    const [searchEvent, setSearchEvent] =useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(()=>{
        const handleEventSearch = async (e)=>{
            if (searchInput.trim()===''){
                setSearchEvent([]);
                return;
            }

            try{
                const response= await axios.get(`http://localhost:8000/api/events?search=${searchInput}`);
                if (response.status===200){
                    setSearchEvent(response.data)
                }else{
                    toast.error('Internal server error, please try again later')
                }
                
            }catch(err){
                console.error(err);
                toast.error('Unable to fetch clubs, please try again later')
            }
        };
        const delayBounce= setTimeout(()=>{
            handleEventSearch();
        }, 300);
        return ()=>clearTimeout(delayBounce)
    
    },[searchInput]);
  

    return(
        <div>
            <div className='searchbar'>
                <CiSearch className='search-icon' color='black'/>
                <input 
                type= 'text'
                placeholder='Search for events'
                className='search-input'
                value={searchInput}
                onChange={(e)=>{setSearchInput(e.target.value)}}
                />
                
            </div>

            {searchInput && (<div className='search-results'>
                {searchEvent.length>0 ? (
                    searchEvent.map(event => (
                        <div key={event.event_id} className='eventbox'>
                            <img src={eventpic} alt={event.name} className='adv-img'/>
                            <div className='event-info'>
                                <h2 className='event-name'>{event.event_name}</h2>
                                <p className='event-date'><IoMdTime></IoMdTime>{event.event_date}</p>
                                <p className='event-location'><CiLocationOn></CiLocationOn>{event.venue}</p>
                                <p className='event-organizedBy'><FcBusiness></FcBusiness>{event.club_name}</p>
                            </div>
                            
                        </div>
                    ))
                ):(<div className='no-results'>
                    <h2>No events found</h2>
                    </div>)}
            </div>)}
        </div>
        
    )
}

export default SearchEvents;
