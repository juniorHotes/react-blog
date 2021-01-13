const Sequelize = require('sequelize')
const connection = require('../connection')

const Category = connection.define('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode ser vazio."
            },
            len: {
                args: [4, 40],
                msg: "Forneça um texto que seja maior que 4 e menor que 40 caracteres."
            }
        }
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

Category.sync({ force: false })

module.exports = Category