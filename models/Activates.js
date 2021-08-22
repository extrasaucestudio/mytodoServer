module.exports = (sequelize, Sequelize) => {
    const HashActivates = sequelize.define("activates", {
        email: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        }
    });
    return HashActivates;
};