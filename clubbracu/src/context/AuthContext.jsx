import {useState, useEffect, useContext, createContext} from 'react';
import { useNavigate } from 'react-router';
const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      try {
        return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
      } catch {
        return null;
      }
    });

    const navigate= useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === 'undefined') {
        setUser(null);
        localStorage.removeItem('user');
  }
}, []);
      
    const login = (userData)=>{
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
    }

    const logout=()=>{
        setUser(null);
        navigate('/')
        localStorage.removeItem('user');
     
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}   

export const useAuth = () => useContext(AuthContext);