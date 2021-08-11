const verifyUserData = require('../middlewares/verifyUserData');
const controller = require('../controllers/auth.controller');

module.exports = function(app){
    app.use(function(res, req, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            verifyUserData.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );
}