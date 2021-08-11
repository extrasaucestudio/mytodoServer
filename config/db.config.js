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
db.user = require('../models/userBio.model')(sequelize, Sequelize);
db.updateuserprofile = require('../models/userUpdateProfile')(sequelize, Sequelize);
db.todo = require('../models/userTodo.model')(sequelize, Sequelize);
//RELATIONSHIP TO UPDATE PROFILE TABLE
//one to one
db.user.hasOne(db.updateuserprofile);
db.updateuserprofile.belongsTo(db.user, {
    foreignKey: "userId"
});
//RELATIONSHIPS TO TODO TABLE
//one to many
db.user.hasMany(db.todo, {as: "todos"});
db.todo.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users"
});

module.exports = db;