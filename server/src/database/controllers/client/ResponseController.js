const Response = require('../../migrations/Response')
const Comment = require('../../migrations/Comment')
const SendEmail = require('../SendEmail')
const Post = require('../../migrations/post')

/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const { name, email, comment, commentId } = req.body

    try {
        await Response.create({ name, email, comment, commentId })
        const _comment = await Comment.findOne({ where: { id: commentId } })
        const post = await Post.findOne({ where: { id: _comment.postId } })

        await SendEmail.main({
            to: _comment.email,
            subject: `${name} Respondeu ao seu comentário - ${email}`,
            html: `<p style="font-size:16px"><b>${name}</b> 
                        Respondeu ao seu comentário na postagem 
                        <b>${post.title}</b></p>
                        <ul>
                            <li><h3>${_comment.name}</h3></li>
                            <p>${_comment.comment}</p>
                            <ul>
                                <li><p><b>${name}</b> Respondeu</p></li>
                                <p>${comment}</p>
                            </ul>
                        </ul>
                        <a class="link" href='http://localhost:3333/post/${post.slug}'>Responder</a>`
        }).then(async () => {
            await SendEmail.main({
                subject: `${name} - Respondeu a um comentário - ${email}`,
                html: `<p style="font-size:16px"><b>${name}</b> - 
                            Respondeu ao comentário de <b>${_comment.name}</b> na postagem 
                            <b>${post.title}</b></p>
                            <ul>
                                <li><h3>${_comment.name}</h3></li>
                                <p>${_comment.comment}</p>
                                <ul>
                                    <li><p><b>${name}</b> Respondeu</p></li>
                                    <p>${comment}</p>
                                </ul>
                            </ul>
                            <a class="link" href='http://localhost:3333/post/${post.slug}'>Ver todos os comentários</a>`
            }).then(res.sendStatus(200))
        })
    } catch (err) { return res.status(404) }
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