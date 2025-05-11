
import { useAuth } from '../../context/AuthContext';
const WelcomeMessage = () =>{

    const {user}= useAuth();
    console.log(user)
    
    

    return(
        <div className="welcome-message"
            style={{
                backgroundColor: '#f0f0f0',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                margin: '20px 0',
                height: '16vh'
            }}
        >
            {user? (<h1 className='tc'> Welcome {user?.fullName || user?.name}!</h1>
            ):(<h1 className='tc'> Welcome!</h1>)}
            
        </div>
    )
}

export default WelcomeMessage;