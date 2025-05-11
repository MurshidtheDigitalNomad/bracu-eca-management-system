import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import {Link} from 'react-router-dom'
import '../StudentActivity/StudentActivity.css';
import {toast} from 'react-toastify';
import axios from 'axios';
import '../FacultyActivity/FacultyActivity.css';


const ClubAdminActivity = () => {
    const[pendingMembers, setPendingMembers]= useState([]);
    const {user} = useAuth();
    const fetchPendingMembers= async(e) =>{
        try{
            const response= await axios.get('http://localhost:8000/api/users/pending-members');
            toast.success('Fetch Successful')
            setPendingMembers(response.data)
        }catch(err){
            console.error(err);
            toast.error('Unable to fetch clubs! please try again later!')
        }
    }
    
    const sendApprovedMembers = async (studentId)=>{
        try{
            await axios.patch(`http://localhost:8000/api/users/${studentId}/approve`);
            setPendingMembers(prev=>prev.filter(student=> student.student_id !=studentId))

        }catch (err) {
            console.error(err);
            toast.error('Failed to approve club');
        }
    }

    return (
      <div className="activity-content">
            <div className="activity-sidebar">
            <ul>
                <li><a href="#view-member-requests">Manage Members</a></li>
                <li><a href="#request-events">Request Event</a></li>
            </ul>
            </div>
  
        <div className="activity-main">
          <section id="activity">
            <div className='club-admin-activity'>
              <section id="view-member-requests">
                <h2>Pending Member Requests</h2>
                <div>
                    <button onClick={fetchPendingMembers}>Click to view request</button>
                    <div className='club-boxes'>
                        {pendingMembers.map(pending_member=>(
                            <div key={pending_member.student_id} className='member-card'>
                                <h3>Student ID: {pending_member.student_id}</h3>
                                <p><strong>Department:</strong> {pending_member.department}</p>
                                <p><strong>Skills:</strong> {pending_member.skills}</p>
                                <p><strong>Reason:</strong> {pending_member.reason}</p>
                                <p><strong>Choice of Club Department:</strong> {pending_member.club_department}</p>
                                <button onClick={() => sendApprovedMembers(pending_member.student_id)}>Approve</button>

                            </div>
                        ))}
                    </div>
                </div>
              </section>
              <section id="request-events">
                <h2>Request Events</h2>
                <button><Link to={`/${user.student_id}/event-request-form`}>Event Request Form</Link></button>
              </section>
            </div>
          </section>
        </div>
      </div>
    );
  };

  export default ClubAdminActivity;