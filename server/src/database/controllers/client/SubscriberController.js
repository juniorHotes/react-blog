const Subscriber = require('../../migrations/Subscriber')

/*========== (POST) Insert Subscribers  ==========*/
const INSERT = async (req, res) => {
    const email = req.body.email

    await Subscriber.create({ email })
        .then(res.sendStatus(200)).catch(res.sendStatus(404))
}
/*========== (POST) Delete Subscribers  ==========*/
const DELETE = async (req, res) => {
    const email = req.body.email

    await Subscriber.destroy({ where: { email: email } })
        .then(res.sendStatus(200)).catch(res.sendStatus(404))
}

module.exports = {
    INSERT,
    DELETE
}