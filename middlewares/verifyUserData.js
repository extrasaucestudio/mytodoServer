const db = require('../config/db.config');
const User = db.usersdata;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=>{
        if(user){
            res.status(400).send({
                message: "Email already exist!"
            });
            return;
        }
        next();
    });
};

const verifyUserData = { checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail }

module.exports = verifyUserData;