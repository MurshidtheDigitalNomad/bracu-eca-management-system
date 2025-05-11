import React from 'react';
import CoverEvents from '../../Components/CoverPhotoEvents/CoverEvents';
import SearchEvents from '../../Components/SearchEvents/SearchEvent';
import EventBoxes from '../../Components/EventBoxes/EventBoxes';

const Events = () => {
    return(
        <div>

            <CoverEvents />
            <SearchEvents />
            <EventBoxes />
    
        </div>
    );
}

export default Events;