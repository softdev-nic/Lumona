const express = require('express');
const createUser = require('./Modals/Controllers/createUser');
require('./db');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})
app.use(express.json());

app.post('/api/register', createUser);


