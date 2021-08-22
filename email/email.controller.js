const db = require('../config/db.config');
const User = db.usersdata;

const sendMail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.template');

exports.collectMail = (req, res) => {
    const {email} = req.body;
    User.findOne({email}).then(user=>{
        if(!user){
            User.create({email})
            .then(newUser=>sendMail(newUser.email, templates.confirm(newUser._id)))
            .then(()=>res.json({msg: msgs.confirm}))
            .catch(error=>console.log(error))
        }else if(user && !user.confirmed){
            sendMail(user.email, templates.confirm(user._id))
            .then(()=>res.json({msg: msgs.resend}))
        }else{
            res.json({msg: msgs.alreadyConfirmed})
        }
    }).catch(error=>console.log(error));
};