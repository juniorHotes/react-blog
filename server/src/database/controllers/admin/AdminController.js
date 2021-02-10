const Admin = require('../../migrations/Admin')
const bcryptjs = require('bcryptjs')
// const AdminAuth = require('../middleware/AdminAuth')

/*========== (GET) login  ==========*/
const login = async (req, res) => {
    const { email, password } = req.body

    await Admin.findOne({ where: { email: email } })
        .then(user => {
            if (user != undefined) {
                const correct = bcryptjs.compareSync(password, user.password)

                if (correct) {
                    req.session.user = {
                        id: user.id,
                        user: user.email
                    }
                    return res.json({ "msg": "Sessão criada" }).sendStatus(200)
                } else {
                    return res.json({ "msg": "Email ou senha inválido" }).sendStatus(202)
                }
            } else {
                return res.json({ "msg": "Este usuário não está cadastrado!" }).sendStatus(400)
            }
        }).catch(err => res.json(err).sendStatus(404))
}
/*========== (POST) Update admin  ==========*/
const UPDATE = async (req, res) => {
    const { email, password, new_password } = req.body

    try {
        const pass = await Admin.findOne({ where: { id: 1 } })
        const correct = bcryptjs.compareSync(password, pass.password)

        if (email == undefined) {
            // Change password
            if (correct) {
                const salt = bcryptjs.genSaltSync(10)
                const hash = bcryptjs.hashSync(new_password, salt)

                await Admin.update({ password: hash }, { where: { id: 1 } })
                    .then(res.json({ "msg": "Senha alterada com sucesso!" }).sendStatus(200))
            } else {
                return res.json({ "msg": "Senha atual incorreta!" }).sendStatus(202)
            }
        }
        if (new_password == undefined) {
            // Change e-mail
            if (correct) {
                await Admin.update({ email: email }, { where: { id: 1 } })
                    .then(res.json({ "msg": "E-mail alterada com sucesso!" }).sendStatus(200))
            } else {
                return res.json({ "msg": "Senha incorreta!" }).sendStatus(202)
            }
        }
    } catch (err) { res.json(err).sendStatus(404) }
}
/*========== (GET) Logout admin  ==========*/
const logout = async (req, res) => {
    req.session.user = undefined
    res.json({ "msg": "Sessão encerrada." }).sendStatus(200)
}

module.exports = {
    login,
    UPDATE,
    logout
}