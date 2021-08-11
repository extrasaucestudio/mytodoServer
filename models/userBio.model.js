module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("userbio",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password:  {
            type: Sequelize.STRING
        },
        accountActivated: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return User;
};