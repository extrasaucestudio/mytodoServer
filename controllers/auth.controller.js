const db = require('../config/db.config');
const User = db.usersdata;
const Updateprofile = db.updateuserprofile;
const HashActivates = db.hashactivate;
const Todo = db.todo;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');
const md5 = require('md5');
const config = require('../config/auth.config');

//file path
const imageUploadPath = 'luemens/uploads';
//email imports
const sendEmail = require('../email/email.send');
const msgs = require('../email/email.msgs');
const templates = require('../email/email.template');

//public data
let pemail = '';

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
    //searched save used
    pemail = req.body.email;
};

//public data
let imageURL = '';

//store images
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, imageUploadPath);
    },
    filename: function(req, file, cb){
        imageURL = `${file.fieldname}_mytodo_${Date.now()}_${file.originalname}`
        cb(null, imageURL);
    }
});

exports.imageUpload = multer({
    storage: storage,
    //file filter
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            console.log('Only .png, .jpg, and .jpeg format allowed');
        }
    }
});

exports.saveprofiledata = (req, res) => {
    //console.log(pemail);
    //get user id
    User.findOne({
        where: {email: pemail}
    }).then(user=>{
        if(imageURL !== ''){
            //save image and username data to db
            Updateprofile.create({
                profilePicture: imageURL,
                username: req.body.luetext,
                userbioId: user.id
            }).then(()=>{
                console.log("User profile data updated successfully!");
                //send a email confirmation link, with userid
                var md5mail = md5(pemail);
                console.log("Attempting to send data to sendMail()");
                sendEmail(user.email, templates.confirm(md5mail));
                console.log("Main sent to sendMail(), wait for response");
                //save email and hashed to table activates
                HashActivates.create({
                    email: pemail,
                    hash: md5mail
                }).then(()=>{
                    console.log("Activates returned 1");
                }).catch(error=>{
                    console.log(error);
                });
            }).then(()=>{
                res.json({msg: msgs.confirm});
            }).catch(error=>{
                res.status(500).send({message: error.message});
            });
        }
    }).catch(error=>{
        console.log(error);
    })
};

//confirm Email
exports.confirmEmail = (req, res) => {
    const {id} = req.params;
    console.log(id);
    //let decodedId = Base64.decode(id);
    //console.log(decodedId);
    //find email using hash
    HashActivates.findOne({
        where: {hash: id}
    }).then(user=>{
        if(!user){
            console.log("You don't Exist");
        }else{
            //console.log(user);
            //find user in the main db
            //update data field of accountActivated to TRUE
            const email = user.email;
            //console.log(email);
            User.findOne({
                where: {email: email}
            }).then(user=>{
                if(!user){
                    console.log("User Not Found!");
                }else{
                    //update new changes to db
                    let updatedObject = {
                        email: email,
                        accountActivated: true
                    }
                    User.update(updatedObject,
                        {
                            returning: true,
                            where: {email: email},
                            attributes: [
                                'id',
                                'email',
                                'accountActivated'
                            ]
                        }).then(()=>res.json({
                            msg: msgs.confirmed
                        })).catch(error=>console.log(error));
                }
            }).catch(error=>console.log(error));
        }
    })
};

//SIGN-IN-USER
exports.signin =(req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send({message: "User Not found!"})
        }
        //else
        console.log(user);
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        //check password validity
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        //if everything is OK
        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 //24 hours
        });
        //return result
        res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token
        });
    }).catch(error=>{
        res.status(500).send({message: error.message});
    })
};






//test
exports.tests = (req, res) => {
    console.log("TEST LOADED");
};

exports.fetchimage = (req, res) => {
    Updateprofile.findByPk(1, {
        attributes: [
            'id',
            'name'
        ]
    }).then(fetched=>{
        res.status(200).json(fetched);
    }).catch(error=>{
        res.status(500).send({
            message: error.message
        });
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