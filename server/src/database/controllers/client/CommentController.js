const Comment = require('../../migrations/Comment')
const Post = require('../../migrations/post')
const SendEmail = require('../SendEmail')

/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const { name, email, comment, postId } = req.body

    try {
        await Comment.create({ name, email, comment, postId })
        const post = await Post.findOne({ where: { id: postId } })

        SendEmail.main({
            subject: `${name} Fez um comentário - ${email}`,
            html: `<p style="font-size:16px"><b>${name}</b> fez um comentário na postagem <b>${post.title}</b></p>
            <p>${comment}</p>
            <a class="link" href='http://localhost:3333/post/${post.slug}'>Ver comentário</a>`
        }).then(res.sendStatus(200)).catch(res.sendStatus(400))
    } catch (err) { return res.status(404) }
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