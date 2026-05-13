 const express = require('express');
const createUser = require('./Modals/Controllers/createUser');
const login = require('./Modals/Controllers/LoginUser');
const auth = require('./Modals/Middlewares/Auth');
const getProfile = require('./Modals/Controllers/profile');
const updateUser = require('./Modals/Controllers/UpdateProfile');
const streakManager = require('./Modals/Controllers/Activities/streakManager');
const updateScore = require('./Modals/Controllers/UpdateScore');
const getScore = require('./Modals/Controllers/Activities/getScore');
const penaltyscore =require('./Modals/Controllers/Activities/PenaltyScore')
const cors = require('cors');
require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
    origin:[
        'https://lumona.site',
        'https://www.lumona.site'
        ''
    ]
}));
app.use(express.json());

app.post('/api/register', createUser);

app.post('/api/login', login);

app.get('/api/auth', auth, (req, res) => {
    res.json({
        message: 'Authorized',
        user: req.user
    });
});
app.get('/api/profile', auth, getProfile)
app.put('/api/profile', auth,updateUser)
app.put('/api/streak', auth, streakManager)
app.put('/api/score', auth, updateScore)
app.put('/api/penaltyscore', auth, penaltyscore)
app.get('/api/score', auth,getScore)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
