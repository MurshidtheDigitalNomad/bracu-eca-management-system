const express = require('express');
const router = express.Router();
//get routehandler by controller  using destructuring
const { createNewClub, SearchClub, MyClubs, getClub, PendingClubs, ApprovedClubs, getApprovedClubs } = require('./clubs.controller');


router.post('/request-new-club', createNewClub);
router.get('/pending-clubs', PendingClubs);
router.patch('/:id/approve', ApprovedClubs);
router.get('/clubs-list', getApprovedClubs);
router.get('/:id', getClub);
router.get('/', SearchClub);
router.get('/my-clubs/:student_id', MyClubs)


module.exports = router;