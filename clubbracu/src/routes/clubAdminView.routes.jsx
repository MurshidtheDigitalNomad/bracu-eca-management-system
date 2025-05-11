import React from 'react';
import ClubAdminActivity from '../Components/ClubAdminActivity/ClubAdminActivity.jsx';
import WelcomeMessage from '../Components/WelcomeMessage/WelcomeMessage.jsx'

const ClubAdminView= ()=>{
    return(
        <div>
            <WelcomeMessage />
            <ClubAdminActivity/>
        </div>

    )
}

export default ClubAdminView;