const Sequelize = require('sequelize')
const connection = require('../connection')
const Category = require('./category')

const Post = connection.define('posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O campo título não pode ser vazio."
            },
            len: {
                args: [4, 40],
                msg: "Forneça um título que seja maior que 4 e menor que 40 caracteres."
            }
        }
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O campo de postagem não pode ser vazio."
            },
        }
    }
})

/*========= Relationship =========*/
Category.hasMany(Post)
Post.belongsTo(Category)
/*================================*/

Post.sync({ force: false })

module.exports = Post