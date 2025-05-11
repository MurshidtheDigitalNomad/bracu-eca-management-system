import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Searchbar.css';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import {toast} from 'react-toastify';
import CodingClub from '../../assets/ClubPictures/CodingClub.png'

const Searchbar = () => {
    const [searchClub, setSearchClub] =useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(()=>{
        const handleClubSearch = async(e)=>{
            if (searchInput.trim()===''){
                setSearchClub([]);
                return;
            }

            try{
                const response= await axios.get(`http://localhost:8000/api/clubs?search=${searchInput}`);
                if (response.status===200){
                    setSearchClub(response.data)
                }else{
                    toast.error('Internal server error, please try again later')
                }
                
            }catch(err){
                console.err(err);
                toast.error('Unable to fetch clubs, please try again later')
            }
        };
        const delayBounce= setTimeout(()=>{
            handleClubSearch();
        }, 300);
        return ()=>clearTimeout(delayBounce)
    
    },[searchInput]);

    return(
        <div>
            <div className='searchbar'>
                <CiSearch className='search-icon' color='black'/>
                <input 
                type= 'text'
                value= {searchInput}
                onChange={(e)=>{setSearchInput(e.target.value)}}
                placeholder='Search for clubs'
                className='search-input'
                />
                <button className='filter-button'> CATEGORIES </button>
            </div>

            {searchInput && (<div className='search-club-results'>
                {searchClub.length>=0 ?(
                    searchClub.map(club => (
                        <div key={club.club_id} className='clubbox1'>
                            <img src={club.image || CodingClub} alt={club.name} className='adv-img'/>
                            <Link to={`/clubs/${club.club_id}`} className='club-link'>
                                <h2 className='club-name'>{club.name}</h2>
                            </Link>
                        </div>
                    ))
                ): (
                    <div className='no-results'>
                        <h2>No clubs found</h2>
                    </div>
                )}
            </div>
            )}
        
                    
        </div>
    )
}

export default Searchbar;