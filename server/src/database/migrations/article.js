const Sequelize = require('sequelize')
const connection = require('../connection')
const Category = require('./category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

/*========= Relationship =========*/
Category.hasMany(Article)
Article.belongsTo(Category)
/*================================*/

Article.sync({ force: false })

module.exports = Article