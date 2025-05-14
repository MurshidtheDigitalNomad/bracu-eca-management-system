const {createClub, searchClubsByName, fetchMyclubs, getPendingClubs, FetchApprovedClubs, ApprovedClubsList, fetchClub} = require('../../models/clubs.model.js');


const createNewClub = async (req, res)=>{
    try{
    
        await createClub(req.body);
        res.status(201).json({message: 'Club Form Submitted successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

const PendingClubs = async (req, res)=>{
    try{
        const pendingClubs = await getPendingClubs();
        console.log(pendingClubs)
        res.status(200).json(pendingClubs);
    }catch (err) {
        console.error('Error fetching pending clubs:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

const ApprovedClubs = async(req, res)=>{
    const {id}= req.params;
    const {student_id} = req.params
    try{
        const ApprovedClubs = await FetchApprovedClubs(id, student_id);
        console.log(ApprovedClubs)
        res.status(200).json(ApprovedClubs);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Approval failed' });
    }
}

const getApprovedClubs = async(req, res)=>{
    try{
        const Approvedclubs = await ApprovedClubsList();
        res.status(200).json(Approvedclubs)

    }catch{
        console.error(err);
        res.status(500).json({ error: 'Approval failed' });
    }
}

const getClub= async(req, res)=>{
    const {id}= req.params;
    try{
        const club = await fetchClub(id);
        res.status(200).json(club)
    }catch(err){
        console.err(err)
        res.status(500).json({error:"Internal Server error"})
    }
}

const SearchClub = async(req, res)=>{
    const searchTerm= req.query.search || '';

    try {
        const clubs = await searchClubsByName(searchTerm);
        res.status(200).json(clubs);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const MyClubs =async (req, res)=>{
    const {student_id} = req.params;
    try{
        const myclubs = await fetchMyclubs(student_id);
        res.status(200).json({
            message:'Here is your clubs',
            clubs: myclubs
        })

    }catch(err){
        console.error(err)

    }

}


module.exports ={
    createNewClub, SearchClub, MyClubs, PendingClubs, ApprovedClubs, getApprovedClubs, getClub
}