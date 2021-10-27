module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('usertodos', {
        taskHead: {
            type: Sequelize.STRING
        },
        taskBody: {
            type: Sequelize.STRING
        },
        taskDate: {
            type: Sequelize.STRING
        },
        taskTimeStamp: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return Todo;
};