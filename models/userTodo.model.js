module.exports = (sequelize, Sequelize) => {
    const Todos = sequelize.define('usertodos', {
        todoText: {
            type: Sequelize.STRING
        },
        tododateCreated: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.STRING
        }
    });
};