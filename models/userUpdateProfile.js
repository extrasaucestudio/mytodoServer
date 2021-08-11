module.exports = (sequelize, Sequelize) => {
    const Updateprofile = sequelize.define('userupdateprofile', {
        profilePicture: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });
    return Updateprofile;
};