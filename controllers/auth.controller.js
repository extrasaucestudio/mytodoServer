const db = require('../config/db.config');
const User = db.usersdata;
const Updateprofile = db.updateuserprofile;
const Todo = db.todo;
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    //save New user to database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        accountActivated: req.body.accountActivated
    }).then(()=>{
        res.send({message: "User was registered successfully!"});
    }).catch((error)=>{
        res.status(500).send({message: error.message});
    });
};

exports.updateprofile = (req, res) => {
    //save profile data
    //profile picture and username
    Updateprofile.create({
        profilePicture: req.body.profilePicture,
        username: req.body.username,
        userbioId: req.body.userbioId
    }).then(()=>{
        res.send({message: "User data updated successfully"});
    }).catch((error)=>{
        res.status(500).send({message: error.message});
    });
};

exports.writetodo = (req, res) => {
    //save todo data
    Todo.create({
        todoText: req.body.todoText,
        tododateCreated: req.body.tododateCreated,
        done: req.body.done,
        userbioId: req.body.userbioId
    }).then(()=>{
        res.send({message: "Todo stored successfully!"});
    }).catch((error)=>{
        res.status(500).send({message: error.message});
    });
};