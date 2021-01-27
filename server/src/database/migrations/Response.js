const Sequelize = require('sequelize')
const connection = require('../connection')
const Comment = require('./Comment')

const Response = connection.define('responses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Você precisa fornecer um nome."
            },
            len: {
                args: [4, 40],
                msg: "Forneça um nome que seja maior que 4 e menor que 40 caracteres."
            }
        }
    },

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

    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Comente alguma coisa, por favor"
            },
            len: {
                args: [4, 255],
                msg: "Forneça um comentário que seja maior que 4 e menor que 255 caracteres."
            }
        }
    },
})

/*========= Relationship =========*/
Comment.hasMany(Response)
// Response.belongsTo(Comment)
/*================================*/

Response.sync({ force: false })

module.exports = Response