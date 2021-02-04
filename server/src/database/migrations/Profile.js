const Sequelize = require('sequelize')
const connection = require('../connection')

const Profile = connection.define('profile', {
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

    about_me: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Escreva um pouco sobre você, por favor"
            },
            len: {
                args: [4, 255],
                msg: "O texto deve ser maior que 4 e menor que 255 caracteres."
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
                msg: "Forneça um email válido, seu email será divulgado para todos que acesarem a página."
            }
        }
    },

    github: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    youtube: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    linkedin: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    instagram: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    facebook: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    twitter: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    twitch: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})

Profile.sync({ force: false })

module.exports = Profile