const pool = require('../config/db');
const { getApprovedClubs } = require('../routes/clubs/clubs.controller');

const createUser = async (userData)=>{
    const {fullName, studentID, email, department, phoneNumber, password} = userData;

    const query = 
    `INSERT INTO users (student_id, full_name, email, department, phone, password)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`;

    const values = [studentID, fullName, email, department, phoneNumber, password];

    const result= await pool.query(query, values);
    return result.rows[0];
}
const createFacultyUser = async(userFacultyData)=>{
    const{ advisorId, name, email, room, club, department, designation, password}=userFacultyData;

    const query=
    `INSERT INTO faculty (advisor_id, name, email, room, club, department, designation, password)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`

    const values =[advisorId, name, email, room, club, department, designation, password];
    
    try {
        const result = await pool.query(query, values);
    
        if (!result || !result.rows || result.rows.length === 0) {
          throw new Error('No data returned from faculty insert');
        }
    
        return result.rows[0];
    
      } catch (err) {
        console.error('Database error:', err);
        throw err;
      }
}
const findUserByEmail = async (email) => {

    const query = `
    SELECT 
      u.student_id, 
      u.full_name, 
      u.email, 
      u.password,
      cm.club_id
    FROM users u
    LEFT JOIN club_members cm 
      ON u.student_id = cm.student_id 
      AND cm.status = 'approved' 
      AND cm.is_admin = TRUE
    WHERE u.email = $1`;

    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const findFacultyByEmail = async (email)=>{
  const query = 
    `SELECT * FROM faculty WHERE email = $1`;

    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const createPendingMembers = async(id, memberData)=>{
  try{
    const{student_id, department, phone, internalDepartment, skills, reason}= memberData;
    console.log(student_id);
    const query=`INSERT INTO club_members (student_id, club_id, phone, department, club_department, skills, reason, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`

    const values= [student_id, id, phone, department, internalDepartment, skills, reason, 'pending'];
    const result = await pool.query(query, values)
    return result.rows[0];
    
  }catch(err){

  }
}

const fetchPendingMembers= async ()=>{
  const query=`SELECT * FROM club_members WHERE status='pending'`;
  const result = await pool.query(query);
  return result.rows
}

const getApprovedMembers= async (studentId)=>{
  const query=
    `UPDATE club_members SET status= 'approved' WHERE student_id= $1
    RETURNING *`
    
    const result = await pool.query(query, [studentId])
    return result.rows;
}

module.exports={
  createUser, createFacultyUser,
  findUserByEmail, findFacultyByEmail, createPendingMembers, 
  fetchPendingMembers, getApprovedMembers
};

