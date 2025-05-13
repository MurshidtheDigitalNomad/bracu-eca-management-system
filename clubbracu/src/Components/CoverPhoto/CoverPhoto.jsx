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
           
        </div>
    )
}

export default CoverPhoto;