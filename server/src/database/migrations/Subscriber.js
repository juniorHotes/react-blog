const Sequelize = require('sequelize')
const connection = require('../connection')

const Subscriber = connection.define('subscribers', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Você precisa fornecer um email"
            },
            isEmail: {
                msg: "Forneça um email válido, seu email não será divulgado."
            }
        }
    },

})

Subscriber.sync({ force: false })

module.exports = Subscriber