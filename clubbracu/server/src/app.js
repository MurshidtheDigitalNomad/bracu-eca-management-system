const express = require('express');
//creating express application
const app = express();
//import routers
const userRoutes = require('./routes/user/user.router.js');
const clubRoutes = require('./routes/clubs/clubs.router.js')
const eventRoutes = require('./routes/events/events.routes.js')

const cors = require('cors');

//Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.post('/', (req, res)=>{
    res.json('hello postman')
})

app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);


module.exports = app;