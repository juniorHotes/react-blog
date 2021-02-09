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

/*========== (POST) Create admin  ==========*/
const INSERT = async (req, res) => {
    const { email, password } = req.body

    try {
        const existsUser = await Admin.findOne({ where: { email: email } })

        if (existsUser == undefined) {
            const salt = bcryptjs.genSaltSync(10)
            const hash = bcryptjs.hashSync(password, salt)

            await Admin.create({ email: email, password: hash })
                .then(res.json({ "msg": "Usuário criado!" }).sendStatus(200))
        } else {
            return res.json({ "msg": "Este usuário já existe!" }).sendStatus(409)
        }
    } catch (err) { res.json(err).sendStatus(404) }
}

/*========== (POST) Update admin  ==========*/
const UPDATE = async (req, res) => {
    const { email, password } = req.body

    try {
        const existsUser = await Admin.findOne({ where: { email: email } })
        if (existsUser != undefined) {
            const correct = bcryptjs.compareSync(password, existsUser.password)

            if (correct) {
                const salt = bcryptjs.genSaltSync(10)
                const hash = bcryptjs.hashSync(password, salt)

                await Admin.update({ password: hash }, { where: { email: email } })
                    .then(res.json({ "msg": "Senha alterada com sucesso!" }).sendStatus(200))
            } else {
                return res.json({ "msg": "Email ou senha inválido!" }).sendStatus(202)
            }
        } else {
            return res.json({ "msg": "Usuário não encontrado!" }).sendStatus(400)
        }
    } catch (err) { res.json(err).sendStatus(404) }

}

/*========== (POST) Delete  ==========*/
const DELETE = async (req, res) => {
    const email = req.body.email

    await Admin.destroy({ where: { email: email } })
        .then(res.json({ "msg": "Administrador deletado!" }).sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}

/*========== (GET) Logout admin  ==========*/
const logout = async (req, res) => {
    req.session.user = undefined
    res.json({ "msg": "Sessão encerrada." }).sendStatus(200)
}

module.exports = {
    login,
    INSERT,
    UPDATE,
    DELETE,
    logout
}