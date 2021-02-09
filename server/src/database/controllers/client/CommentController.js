const Comment = require('../../migrations/Comment')
const Post = require('../../migrations/post')
const SendEmail = require('../SendEmail')
const config = require('../../../config.json')

/*========== (GET) Status Email  ==========*/
const statusEmail = async (req, res) => {
    const status = req.query["status"]
    const id = req.query["id"]

    const status_email = status == "subscribe" ? true : false

    await Comment.update({ status_email }, { where: { id: id } })
        .then(res.sendStatus(200)).catch(res.sendStatus(400))
}
/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const { name, email, comment, postId, status_email } = req.body

    try {
        await Comment.create({ name, email, comment, status_email, postId })
        const post = await Post.findOne({ where: { id: postId } })

        SendEmail.main({
            subject: `${name} Fez um comentário - ${email}`,
            html: `<div class="container">
                        <h1>${config.blog_name}</h1><hr>
                        <p style="font-size:16px"><b>${name}</b> fez um comentário na postagem <b>${post.title}</b></p>
                        <p>${comment}</p>
                        <div class="container-buttons">
                            <a class="link" href='${config.http}/post/${post.slug}'>Ver comentário</a>
                        </div>
                    </div>`
        }).then(res.sendStatus(200)).catch(res.sendStatus(400))
    } catch (err) { return res.status(404) }
}
/*========== (POST) Update comment  ==========*/
const UPDATE = async (req, res) => {
    const { id, name, email, comment } = req.body

    await Comment.update({ name, email, comment }, {
        where: { id: id }
    }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(404))
}
/*========== (POST) Delete comment  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.id

    await Comment.destroy({ where: { id: id } }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(404))
}

module.exports = {
    statusEmail,
    INSERT,
    UPDATE,
    DELETE
}