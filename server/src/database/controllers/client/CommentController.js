const Comment = require('../../migrations/Comment')

/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const comment = req.body.comment
    const postId = req.body.postId

    await Comment.create({
        name: name,
        email: email,
        comment: comment,
        postId: postId
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

    await Comment.update({
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

    await Comment.destroy({ where: { id: id } })
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