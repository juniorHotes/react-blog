const Admin = require('../../migrations/Admin')
const bcryptjs = require('bcryptjs')
// const AdminAuth = require('../middleware/AdminAuth')

const index = async (req, res) => {
    res.send('Page login admin')
}
/*========== (GET) login  ==========*/
const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    await Admin.findOne({ where: { email: email } })
        .then(user => {
            if (user != undefined) {
                const correct = bcryptjs.compareSync(password, user.password)

                if (correct) {
                    req.session.user = {
                        id: user.id,
                        user: user.email
                    }
                    res.send('Sessão criada')
                    res.sendStatus(200)
                } else {
                    res.send('Email ou senha inválido')
                    res.sendStatus(202)
                }
            } else {
                res.send('Este usuário não está cadastrado!')
                res.sendStatus(400)
            }
        })
}

/*========== (POST) Create admin  ==========*/
const INSERT = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    await Admin.findOne({ where: { email: email } })
        .then(user => {
            if (user == undefined) {
                const salt = bcryptjs.genSaltSync(10)
                const hash = bcryptjs.hashSync(password, salt)

                Admin.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.send("usuário criado")
                    res.sendStatus(200)
                }).catch(err => {
                    res.send("Erro ao criar usuário: " + err)
                    res.sendStatus(404)
                })

            } else {
                res.send('Este usuário já existe!')
                res.sendStatus(400)
            }
        })
}

/*========== (POST) Update admin  ==========*/
const UPDATE = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    await Admin.findOne({ where: { email: email } })
        .then(async user => {
            if (user != undefined) {
                const correct = bcryptjs.compareSync(password, user.password)

                if (correct) {
                    const salt = bcryptjs.genSaltSync(10)
                    const hash = bcryptjs.hashSync(password, salt)
    
                    await Admin.update({
                        password: hash
                    }, {
                        where: { email: email }
                    }).then(() => {
                        res.send('Senha alterada com sucesso!')
                        res.sendStatus(200)
                    }).catch(err => {
                        res.sendStatus(404)
                        console.log("Error on update password: " + err)
                    })
                } else {
                    res.send('Email ou senha inválido')
                    res.sendStatus(202)
                }
            } else {
                res.send('Usuário não encontrado!')
                res.sendStatus(400)
            }
        }).catch(err => {
            res.sendStatus(404)
            console.log("Error on update password: " + err)
        })
}

/*========== (POST) Delete  ==========*/
const DELETE = async (req, res) => {
    const email = req.body.email

    await Admin.destroy({
        where: { email: email }
    }).then(() => {
        res.send('User deleted')
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
        console.log("Error on delete user: " + err)
    })
}

/*========== (GET) Logout admin  ==========*/
const logout = async (req, res) => {
    req.session.user = undefined
    res.sendStatus(200)
}

module.exports = {
    index,
    login,
    INSERT,
    UPDATE,
    DELETE,
    logout
}