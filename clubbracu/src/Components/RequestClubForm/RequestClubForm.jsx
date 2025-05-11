import React, {useState} from 'react';
import './RequestClubForm.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router';

const RequestClubForm = () => {
    const [clubFormData, setClubFormData] = useState({
        proposerName: '',
        proposerID: '',
        proposerEmail: '',
        proposerPhone: '',
        clubName: '',
        clubVision: '',
        clubDescription: '',
        clubAdvisor: '',
        declarationConsent: false,
        declarationSignature: '',
        declarationDate: ''

    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setClubFormData({
        ...clubFormData,
        [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) =>{
    
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/clubs/request-new-club', clubFormData);
            if (response.status === 201){
                toast.success("Form Request submitted successfully!");
                navigate('/student-view');
            }
            
        }catch(err){
            console.error("Error submitting form: ", err);
            toast.error('Club Request Form Unsuccessful, please try again later')
        }
    }

    return(
        <div className='request-club-content'>
            <div className='request-club-instructions'>
                <p>Fill out this form to request official recognition for your new club. The Student Affairs Office will review your submission within 7-10 working days. Contact clubs@bracu.ac.bd for queries.</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='club-request-form'style={{ maxWidth: '600px', margin: 'auto' }}>
                    <h2 className='section-name'>1. Proposer's Information</h2>
                    <label className='label-club-name'>
                        Full Name:
                        <input 
                        type="text" 
                        name="proposerName" 
                        value={clubFormData.proposerName} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Student ID:
                        <input 
                        type="text" 
                        name="proposerID" 
                        value={clubFormData.proposerID} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Email:
                        <input 
                        type="email" 
                        name="proposerEmail" 
                        value={clubFormData.proposerEmail} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Phone (Optional):
                        <input 
                        type="tel" 
                        name="proposerPhone" 
                        optional
                        value={clubFormData.proposerPhone} 
                        onChange={handleChange} 
                        />
                    </label>

                    <h2 className='section-name'>2. Club Details</h2>
                    <label className='label-club-name'>
                        Club Name:
                        <input 
                        type="text" 
                        name="clubName" 
                        value={clubFormData.clubName} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Vision:
                        <input 
                        type="text" 
                        name="clubVision" 
                        value={clubFormData.clubVision} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Description:
                        <textarea 
                        name="clubDescription" 
                        value={clubFormData.clubDescription} 
                        onChange={handleChange} 
                        rows="4" 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Faculty Advisor:
                        <input 
                        type="text" 
                        name="clubAdvisor" 
                        value={clubFormData.clubAdvisor} 
                        onChange={handleChange} 
                        required />
                    </label >

                    <h2 className='section-name'>3. Declaration</h2>
                    <label className='label-club-name'>
                        <input 
                        type="checkbox" 
                        name="declarationConsent" 
                        checked={clubFormData.declarationConsent} 
                        onChange={handleChange} />
                        I hereby declare that the above information is true to the best of my knowledge.
                    </label>
                    <label className='label-club-name'>
                        Signature:
                        <input 
                        type="text" 
                        name="declarationSignature" 
                        value={clubFormData.declarationSignature} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <label className='label-club-name'>
                        Date:
                        <input 
                        type="date" 
                        name="declarationDate" 
                        value={clubFormData.declarationDate} 
                        onChange={handleChange} 
                        required />
                    </label>

                    <button className='request-club' type="submit">Submit Club Request</button>
                </form>
            </div>
        </div>
    )
}

export default RequestClubForm;