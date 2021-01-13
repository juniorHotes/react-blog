const Sequelize = require('sequelize')

const connection = new Sequelize('react_blog', 'root', 'junior150692', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection