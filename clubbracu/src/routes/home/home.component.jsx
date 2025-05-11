import React from 'react';
import CoverPhoto from '../../Components/CoverPhoto/CoverPhoto.jsx';
import Searchbar from '../../Components/Searchbar/Searchbar.jsx';
import ClubBoxes from '../../Components/ClubBoxes/ClubBoxes.jsx';

function Home() {

    return (
        <div>
            <CoverPhoto />
            <Searchbar />
            <ClubBoxes />
        </div>
        
    
    )
  };
  
  export default Home;