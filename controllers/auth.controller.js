const db = require('../config/db.config');
const User = db.user;
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    //save New user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        accountActivated: req.body.accountActivated
    }).then(()=>{
        res.send({message: "User was registered successfully!"});
    }).catch((error)=>{
        res.status(500).send({message: error.message});
    });
};