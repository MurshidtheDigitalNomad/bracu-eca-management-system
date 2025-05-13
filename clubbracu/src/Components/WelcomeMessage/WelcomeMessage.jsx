
import { useAuth } from '../../context/AuthContext';
import './WelcomeMessage.css'

const WelcomeMessage = () =>{

    const {user}= useAuth();
    console.log(user)
    
    

    return(
        <div className="welcome-message"
        >
            {user? (<h1 className='welcome-text'> Welcome {user?.fullName || user?.name}!</h1>
            ):(<h1 className='welcome-text'> Welcome!</h1>)}
            
        </div>
    )
}

export default WelcomeMessage;