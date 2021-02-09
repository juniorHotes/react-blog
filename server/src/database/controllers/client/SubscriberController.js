const Subscriber = require('../../migrations/Subscriber')
const bcryptjs = require('bcryptjs')

/*========== (POST) Insert Subscribers  ==========*/
const INSERT = async (req, res) => {
    const email = req.body.email

    await Subscriber.create({ email })
        .then(res.sendStatus(200)).catch(res.sendStatus(404))
}
/*========== (POST) Delete Subscribers  ==========*/
const DELETE = async (req, res) => {
    const hash = req.params.hash
    const id = req.query["id"]

    const correct = bcryptjs.compareSync(id, hash)

    if (correct) {
        await Subscriber.destroy({ where: { id: id } })
            .then(res.sendStatus(200)).catch(res.sendStatus(404))
    } else {
        res.sendStatus(404)
    }
}

module.exports = {
    INSERT,
    DELETE
}