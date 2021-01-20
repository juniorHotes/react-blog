const Sequelize = require('sequelize')
const connection = require('../connection')

const Admin = connection.define('admins', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "O campo de email é obrigatório."
            },
            isEmail: {
                msg: "Você deve fornecer um email válido."
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Você deve fornecer uma senha."
            },
        }

    }
})

Admin.sync({ force: false })

module.exports = Admin