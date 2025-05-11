
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import 'tachyons';
import Home from './routes/home/home.component.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Events from './routes/Events/events.component.jsx';
import Login from './routes/Login/login.component.jsx';
import SignUp from './Components/SignUpPage/SignUp.jsx';
import ClubDetails from './Components/ClubDetails/clubdetails.jsx';
import EventDetails from './Components/EventDetails/EventDetails.jsx';
import StudentView from './routes/studentView.routes.jsx';  
import RequestClubForm from './Components/RequestClubForm/RequestClubForm.jsx';
import FacultyView from './routes/facultyView.routes.jsx';
import SignUpUser from './Components/SignUpPage/SignUpUser.jsx';
import FacultySignUp from './Components/SignUpPage/FacultySignUp.jsx';
import RequestJoinClub from './Components/RequestJoinClubs/RequestJoinClub.jsx';
import ClubAdminView from './routes/clubAdminView.routes.jsx';
import RequestEvent from './Components/RequestEvent/RequestEvent.jsx';

function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={6000}  />
    
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='events' element={<Events />} />
        <Route path='login' element={<Login />} />
        <Route path='signup-student' element={<SignUp />} />
        <Route path='clubs/:club_id' element={<ClubDetails />} />
        <Route path='events/:event_id' element={<EventDetails />} />
        <Route path='student-view' element={<StudentView />} />
        <Route path='signup/student-view' element={<StudentView />} />
        <Route path='club-request-form' element={<RequestClubForm />} />
        <Route path='faculty-view' element={<FacultyView />} />
        <Route path='sign-up-user' element={<SignUpUser />} />
        <Route path='signup-faculty' element={<FacultySignUp />} />
        <Route path= 'clubs/:club_id/request-join-club' element={<RequestJoinClub/>} />
        <Route path ='club-admin-view' element={<ClubAdminView />}></Route>
        <Route path =':student_id/event-request-form' element ={<RequestEvent/>}></Route>
      </Route>
    </Routes>
  </>
      

  );
};

export default App;
