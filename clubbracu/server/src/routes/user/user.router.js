const express = require('express');
const router = express.Router();
const { SignUpUser, ApprovedClubMembers, PendingMembers, getPendingMembers, LoginUser, SignUpFaculty, LoginFaculty} = require('./user.controller.js');

router.post('/signup', SignUpUser);
router.post('/faculty-signup', SignUpFaculty);
router.post('/student-view', LoginUser);
router.post('/faculty-view', LoginFaculty);
router.post('/:id/join', PendingMembers)
router.get('/pending-members', getPendingMembers);
router.patch('/:studentId/approve', ApprovedClubMembers)
module.exports = router;