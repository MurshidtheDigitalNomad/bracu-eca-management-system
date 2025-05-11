const {createEvent, PendingEvents, getClubEvents, fetchMyEvents, registerStudentForEvent, searchEventsByName, fetchEvent, getEventList, FetchApprovedEvents} = require('../../models/events.model');

const postPendingEvents = async(req, res)=>{
    try{
        const{student_id}= req.params;
        await createEvent(student_id, req.body)
        res.status(200).json({message:'Event details added to database'})

    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal Server problem'})
    }
}

const getPendingEvents = async (req, res)=>{
    try{
        const pendingEvent = await PendingEvents();
        res.status(200).json(pendingEvent);
    }catch (err) {
        console.error('Error fetching pending events:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

const ApprovedEvents = async(req, res)=>{
    const {event_id}= req.params;
    try{
        const ApprovedClubs = await FetchApprovedEvents(event_id);
        res.status(200).json(ApprovedClubs);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Approval failed' });
    }
}

const Events= async(req, res)=>{
    try{
        const events = await getEventList();
        res.status(200).json(events)

    }catch(err){

    }
}

const SingleEvent = async(req, res)=>{
    const {event_id}= req.params;
    try{
        const event = await fetchEvent(event_id);
        res.status(200).json(event)
    }catch(err){
        console.err(err)
        res.status(500).json({error:"Internal Server error"})
    }
}

const searchEvent = async(req, res)=>{
    const searchTerm= req.query.search || '';

    try {
        const events = await searchEventsByName(searchTerm);
        res.status(200).json(events);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const registerEvents = async (req, res)=>{
    const { event_id } = req.params;
    const { student_id } = req.body;

    if (!student_id) {
        return res.status(400).json({ error: "Student ID is required" });
    }

    try {
        const registration = await registerStudentForEvent(student_id, event_id);
        if (registration) {
            res.status(201).json({ message: "RSVP successful", registration });
        } else {
            res.status(200).json({ message: "Already registered for this event" });
        }
    } catch (err) {
        console.error("Error during RSVP:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const MyEvents= async(req, res)=>{
    const {student_id} = req.params;
    try{
        const myEvents = await fetchMyEvents(student_id);
        res.status(200).json({
            message:'Here is your event',
            events: myEvents
        })

    }catch(err){
        console.error(err)

    }

}

const clubEvents = async (req, res) => {
  const { club_id } = req.params;

  try {
    const events = await getClubEvents(club_id);
    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching events by club:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports={
    postPendingEvents, clubEvents, searchEvent, MyEvents, registerEvents, getPendingEvents, SingleEvent, ApprovedEvents, Events
}