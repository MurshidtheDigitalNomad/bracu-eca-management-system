import React from 'react';
import EventCover from './EventsCover.jpg';
import './CoverEvents.css'; 

const CoverEvents = () => {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "50vh",
                backgroundImage: `url(${EventCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
                }}
            ></div>
            <div
                className="flex items-center justify-center h-100 fade-in"
                style={{ position: "relative" }}
            >
                <h1 
                    className="tc white b f1 tracked-wide fw8"
                    style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}
                >
                    WELCOME TO BRACU EVENTS
                </h1>
            </div>
        </div>
    );
};

export default CoverEvents;