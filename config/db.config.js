const config = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

//init mysql to use Sequelize
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//require models & init with Sequlize
db.users = require('../models/userBio.model')(sequelize, Sequelize);
db.todos = require('../models/userTodo.model')(sequelize, Sequelize);
//relationships
//one to many
db.users.hasMany(db.todos, {as: "todos"});
db.todos.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users"
});

module.exports = db;