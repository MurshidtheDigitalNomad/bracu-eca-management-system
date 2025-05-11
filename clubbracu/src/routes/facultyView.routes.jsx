import React from 'react';
import WelcomeFaculty from '../Components/WelcomeMessage/WelcomeFaculty';
import FacultyActivity from '../Components/FacultyActivity/FacultyActivity';
const FacultyView = () => {
    return(
        <div>
            <WelcomeFaculty/>
            
            <FacultyActivity />
        
        </div>
    )
}

export default FacultyView;