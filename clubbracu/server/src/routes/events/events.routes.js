const express = require('express');
const router = express.Router();
const { postPendingEvents, registerEvents, clubEvents, MyEvents, searchEvent, SingleEvent, getPendingEvents, Events, ApprovedEvents } = require('./events.controller.js');

router.post('/:student_id/request-events', postPendingEvents)
router.get('/pending-events', getPendingEvents);
router.patch('/:event_id/approve', ApprovedEvents)
router.get('/events-list', Events)
router.get('/:event_id', SingleEvent);
router.get('/', searchEvent)
router.post('/:event_id/register', registerEvents);
router.get('/my-events/:student_id', MyEvents);
router.get('/clubs/:club_id', clubEvents)

module.exports = router;