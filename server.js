const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

//import user
const db = require('./config/db.config');
const User = db.usersdata;
const Updateprofile = db.updateuserprofile;
const Todo = db.todo;

const app = express();
const PORT = 8080;

//cors
const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

//parse requests of content-type -application/json
app.use(bodyParser.json());
//parse request of content-type -application/x-www/form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//test route
app.get('/', (req, res)=>{
    res.send({
        message: "I am Unloccode and this is a TEST!"
    });
});

//app routess
require('./routes/auth.routes')(app);

//fire up the server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});

//init the database
//new data
db.sequelize.sync({force: true}).then(()=>{
    console.log('Drop and Resync with {force: true}');
    ////User.sync().then(()=>{
        User.create({
            email: 'peet@mail.com',
            password: bcrypt.hashSync('12345', 8),
            accountActivated: false
        })
    ////});
    Updateprofile.create({
        profilePicture: 'url',
        username: 'alafsasa',
        userbioId: 1
    });
    Todo.create({
        todoText: 'walk the dog',
        tododateCreated: '11/08/2021',
        done: false,
        userbioId: 1
    });
});