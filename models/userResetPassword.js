module.exports = (sequelize, Sequelize) => {
    const UpdatePassword = sequelize.define('resetpassword', {
        email: {
            type: Sequelize.STRING,
        },
        rphash: {
            type: Sequelize.STRING
        }
    });
    return UpdatePassword;
};