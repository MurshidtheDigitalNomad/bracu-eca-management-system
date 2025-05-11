const pool = require('../config/db.js')

const generateNewEventID= async()=>{
    const query =
    `SELECT * FROM events ORDER BY event_id DESC LIMIT 1`;

    const result = await pool.query(query)
    
    if (result.rows.length === 0){
        return 'E001'
    }

    const lastID = result.rows[0].event_id;
    const lastNumber = parseInt(lastID.replace('E', '', 10));
    const newID = lastNumber +1;

    return `E${String(newID).padStart(3,'0')}`;
}

const createEvent = async (student_id, EventData) =>{
    const newEventID = await generateNewEventID();
    const {name, eventDate, description, maxAttendees, venue, resources, club_id  } = EventData;

    const query=
    `INSERT INTO events ( event_id, student_id, name, event_date, description, max_attendees, venue, resources, club_id, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending') 
    RETURNING *`;

    const values = [newEventID, student_id, name, eventDate, description, maxAttendees, venue, resources, club_id];

    const result= await pool.query(query, values);
    return result.rows[0];
}

const PendingEvents= async()=>{
   
        const query=`
        SELECT e.event_id, e.name AS event_name, e.event_date, e.venue, e.description, e.status, c.name
        FROM events e JOIN clubs c ON e.club_id = c.club_id
        WHERE e.status = 'pending'
        `
        const result = await pool.query(query);
        return result.rows;
}

const FetchApprovedEvents=async(event_id)=>{
    
    const query=
    `UPDATE events SET status= 'approved' WHERE event_id= $1
    RETURNING *`
    
    const result = await pool.query(query, [event_id])
    return result.rows;

}

const getEventList = async()=>{
    const query=`
    SELECT e.event_id, e.venue, e.event_date, e.name AS event_name, c.name FROM events e, clubs c
    WHERE e.club_id = c.club_id `

    const result = await pool.query(query)
    return result.rows;
}

const fetchEvent= async (event_id)=>{
    const query=
    `SELECT e.event_id, e.description, e.venue, e.event_date, e.name AS event_name, c.name FROM events e, clubs c
    WHERE e.club_id = c.club_id AND e.event_id=$1 `
    const result = await pool.query(query, [event_id])
    return result.rows[0];
}

const searchEventsByName = async (searchTerm) => {
    const query = `
        SELECT e.event_id, e.name AS event_name, e.venue, e.event_date, c.name AS club_name
        FROM events e
        JOIN clubs c ON e.club_id = c.club_id
        WHERE LOWER(e.name) LIKE LOWER($1) AND e.status = 'approved'
    `;

    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values);
    return result.rows;
};

const registerStudentForEvent = async (student_id, event_id) => {
    const query = `
        INSERT INTO event_registrations (student_id, event_id)
        VALUES ($1, $2)
        ON CONFLICT (student_id, event_id) DO NOTHING
        RETURNING *;
    `;
    const values = [student_id, event_id];
    const result = await pool.query(query, values);
    return result.rows[0]; 
};

const fetchMyEvents = async(student_id)=>{
    const query=`
    SELECT e.event_id, e.name AS event_name, e.event_date, e.venue, c.name AS club_name
    FROM events e, clubs c, event_registrations er WHERE
    e.club_id = c.club_id AND e.event_id = er.event_id 
    AND er.student_id = $1 AND e.status = 'approved'`

    const result = await pool.query(query, [student_id])
    return result.rows;
}

const getClubEvents = async (club_id) => {
  const query = `
    SELECT e.event_id, e.name AS event_name, e.event_date, e.venue, c.name AS club_name
    FROM events e
    JOIN clubs c ON e.club_id = c.club_id
    WHERE e.club_id = $1 AND e.status = 'approved'
  `;
  
  const result = await pool.query(query, [club_id]);
  return result.rows;
};

module.exports={
    createEvent, PendingEvents, fetchMyEvents, getClubEvents, registerStudentForEvent, searchEventsByName, fetchEvent, FetchApprovedEvents, getEventList
}