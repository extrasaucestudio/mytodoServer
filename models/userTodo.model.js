module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('usertodos', {
        todoText: {
            type: Sequelize.STRING
        },
        tododateCreated: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return Todo;
};