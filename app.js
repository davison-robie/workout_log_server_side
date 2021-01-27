require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require("./db");

let log = require('./controllers/logController');
let user = require('./controllers/userController');

sequelize.sync();
app.use(express.json());

app.use('/user', user);

app.use('/log', log);

app.listen(3000, function(){
    console.log('App is listening on port 3000')
})