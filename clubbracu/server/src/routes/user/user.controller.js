const {createUser, createPendingMembers, getApprovedMembers, fetchPendingMembers, createFacultyUser, findUserByEmail, findFacultyByEmail} = require('../../models/user.model.js')

const SignUpUser = async (req , res) =>{
    try{
        //getting userData from model
        const newUser= await createUser(req.body);
        //sends response back to the client
        res.status(201).json({
            message: 'User created successfully',
            user: {
                student_id: newUser.student_id,
                fullName : newUser.full_name,
                email: newUser.email
            }
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

const SignUpFaculty = async (req , res) =>{
    try{
        const newFaculty= await createFacultyUser(req.body);
        //sends response back to the client
        res.status(201).json({
            message: 'Faculty created successfully',
            user: {
                name : newFaculty.full_name
            }
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}


const LoginUser = async (req, res) =>{
    const {email, password} = req.body;
    console.log('Received body:', req.body);
    try{
        const user = await findUserByEmail(email);

        if (!user || user.password !== password){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const responseData = {
            student_id: user.student_id,
            name: user.full_name,
            email: user.email,
            is_admin: !!user.club_id,
            admin_club_id: user.club_id || null
        };
        
        res.status(200).json({
            message: 'Login successful',
            user:responseData
        });

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

const LoginFaculty =async(req, res)=>{
    const {email, password} = req.body;
    console.log('Received body:', req.body);
    try{
        const faculty = await findFacultyByEmail(email);
        if (!faculty || faculty.password !== password){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        res.status(200).json({
            message: 'Login successful',
            user:{
                id: faculty.advisor_id,
                name: faculty.name,
                email: faculty.email,
            }});

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

const PendingMembers = async(req, res)=>{
    const {id}= req.params;

    try{
        console.log(req.body);
        const result= await createPendingMembers(id, req.body)
        res.status(200).json({message: 'Request submitted successfully', data: result})
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
    
}

const getPendingMembers = async (req, res)=>{
    try{
        const pendingMembers =await fetchPendingMembers();
        res.status(200).json(pendingMembers);

    }catch(err){
        console.error(err)
        res.status(500).json({message:" Internal Server error, couldn't fetch pending members"})
    }
}

const ApprovedClubMembers = async(req, res)=>{
    const{studentId}= req.params
    try{
        const approvedMembers= getApprovedMembers(studentId)
        res.status(200).json(approvedMembers);
    }catch(err){
        console.err(err)
        res.status(500).json({message:" Internal Server error, couldn't fetch pending members"})
    }
}

module.exports = { SignUpUser, ApprovedClubMembers, getPendingMembers, SignUpFaculty, LoginUser, LoginFaculty, PendingMembers};