const Comment = require('../../migrations/Comment')
const Post = require('../../migrations/post')

/*========== (GET) Show all comments  ==========*/
const index = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) {
        return res.sendStatus(404)
    }

    await Comment.findAndCountAll({
        include: [{ model: Post }],
        limit: limit,
        offset: pageOffset
    })
    .then(comment => {
        const pagination = pageOffset + limit >= comment.count ? false : true
        res.json({ pagination, comment })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

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
    })
    .then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

module.exports = {
    index,
    INSERT
}