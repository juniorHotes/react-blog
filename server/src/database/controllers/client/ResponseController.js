const Response = require('../../migrations/Response')

/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const comment = req.body.comment
    const commentId = req.body.commentId

    await Response.create({
        name: name,
        email: email,
        comment: comment,
        commentId: commentId
    }).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

/*========== (POST) Update comment  ==========*/
const UPDATE = async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const comment = req.body.comment

    await Response.update({
        name: name,
        email: email,
        comment: comment,
    }, {
        where: { id: id }
    }).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

/*========== (POST) Delete comment  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.id

    await Response.destroy({ where: { id: id } })
        .then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(404)
        })
}

module.exports = {
    INSERT,
    UPDATE,
    DELETE
}