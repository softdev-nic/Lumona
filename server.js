 const express = require('express');
const createUser = require('./Modals/Controllers/createUser');
const login = require('./Modals/Controllers/LoginUser');
const auth = require('./Modals/Middlewares/Auth');
const getProfile = require('./Modals/Controllers/profile');
const cors = require('cors');
require('./db');
require('dotenv').config();

const app = express();

const port = 3000;
app.use(cors());
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
