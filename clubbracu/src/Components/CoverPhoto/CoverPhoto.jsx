import react from 'react';
import coverphoto from './CoverPhoto.png';



const CoverPhoto = () => {
    return(
        <div
            className="relative"
            style={{
                backgroundImage: `url(${coverphoto})`,
                filter: "brightness(0.6)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "50vh",
              
                
            }}
        >
            <a
                href="https://www.bracu.ac.bd/student-life/office-co-curricular-activities-oca"
                className="absolute bottom-1 left-2 pa3 bg-white br3 b black-80 no-underline shadow-2 grow pointer inter-font"
            >
                Learn More
            </a>
        </div>
    )
}

export default CoverPhoto;