const Sequelize = require('sequelize')
const connection = require('../connection')

const Category = connection.define('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({ force: false })

module.exports = Category