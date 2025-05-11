import React from 'react';
import WelcomeMessage from '../Components/WelcomeMessage/WelcomeMessage';
import Activity from '../Components/StudentActivity/StudentActivity';

const StudentView = () => {
    return(
        <div>
            <WelcomeMessage/>
            
            <Activity />
        {/*
            <RequestClubForm />
        */}
        </div>
    )
}

export default StudentView;