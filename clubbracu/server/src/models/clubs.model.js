
const pool = require('../config/db.js')

const generateNewID= async()=>{
    const query =
    `SELECT * FROM clubs ORDER BY club_id DESC LIMIT 1`;

    const result = await pool.query(query)
    
    if (result.rows.length === 0){
        return 'CLB001'
    }

    const lastID = result.rows[0].club_id;
    const lastNumber = parseInt(lastID.replace('CLB', '', 10));
    const newID = lastNumber +1;

    return `CLB${String(newID).padStart(3,'0')}`;
}

const createClub = async (clubData) =>{
    const newID = await generateNewID();
    const { proposerID, clubName, clubVision, clubDescription, clubAdvisor } = clubData;

    const query=
    `INSERT INTO clubs ( club_id, student_id, name, vision, description, advisor, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'pending') 
    RETURNING *`;

    const values = [newID, proposerID, clubName, clubVision, clubDescription, clubAdvisor];

    const result= await pool.query(query, values);
    return result.rows[0];

    
}

const getPendingClubs= async()=>{
   
        const query=
        `SELECT * FROM clubs WHERE status='pending'`;
        const result = await pool.query(query);
        return result.rows;
}

const FetchApprovedClubs=async(id)=>{
    
    const query=
    `UPDATE clubs SET status= 'approved' WHERE club_id= $1
    RETURNING *`
    
    const result = await pool.query(query, [id])
    const newClub= result.rows;

    const memberInsertQuery = `
        INSERT INTO club_members (student_id, club_id, status, is_admin)
        VALUES ($1, $2, 'approved', TRUE)
    `;
    await pool.query(memberInsertQuery, [proposerID, newID]);
    return newClub;
}

const ApprovedClubsList= async()=>{
    const query=
        `SELECT * FROM clubs WHERE status='approved'`;
        const result = await pool.query(query);
        return result.rows;
}

const fetchClub= async (id)=>{
    const query=
    `SELECT * FROM clubs WHERE club_id=$1`

    const result = await pool.query(query, [id])
    return result.rows[0];
}

const searchClubsByName= async(searchTerm)=>{
    
    const query=
    `SELECT * FROM clubs WHERE LOWER(name) LIKE LOWER($1) and status='approved'`

    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values)
    return result.rows;
}

const fetchMyclubs = async(student_id)=>{
    const query=`
    SELECT c.club_id, c.name, c.description FROM club_members cm
    JOIN clubs c ON cm.club_id = c.club_id 
    WHERE cm.student_id = $1 AND cm.status='approved'`

    const result = await pool.query(query, [student_id])
    return result.rows;
}

module.exports = {
    createClub, getPendingClubs, fetchMyclubs, searchClubsByName, FetchApprovedClubs, ApprovedClubsList, fetchClub
}