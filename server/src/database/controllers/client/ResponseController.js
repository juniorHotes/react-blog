const Response = require('../../migrations/Response')
const Comment = require('../../migrations/Comment')
const SendEmail = require('../SendEmail')
const Post = require('../../migrations/post')
const config = require('../../../config.json')

/*========== (POST) Insert comment  ==========*/
const INSERT = async (req, res) => {
    const { name, email, comment, commentId } = req.body

    try {
        await Response.create({ name, email, comment, commentId })
        const _comment = await Comment.findOne({ where: { id: commentId } })
        const post = await Post.findOne({ where: { id: _comment.postId } })

        const sendUserEmail = {
            to: _comment.email,
            subject: `${name} Respondeu ao seu comentário - ${email}`,
            html: `<div class="container">
                        <h1>${config.blog_name}</h1><hr>
                        <p style="font-size:16px"><b>${name}</b> 
                        Respondeu ao seu comentário na postagem <b>${post.title}</b></p>
                        <ul>
                            <li><p><b>${_comment.name}</b> Seu comentário</p></li>
                            <p>${_comment.comment}</p>
                            <ul>
                                <li><p><b>${name}</b> Respondeu</p></li>
                                <p>${comment}</p>
                            </ul>
                        </ul>
                        <div class="container-buttons">
                            <a class="link" href='${config.http}/post/${post.slug}'>Responder</a>
                            <a class="link" href='${config.http}/status-email/?status=unsubscribe&id=${_comment.id}'>
                            Não receber mais Emails</a>
                        </div>
                    </div>`
        }

        const sendAdminEmail = {
            subject: `${name} - Respondeu a um comentário - ${email}`,
            html: `<div class="container">
                        <h1>${config.blog_name}</h1><hr>
                        <p style="font-size:16px"><b>${name}</b> - 
                        Respondeu ao comentário de <b>${_comment.name}</b> na postagem 
                        <b>${post.title}</b></p>
                        <ul>
                            <li><p><b>${_comment.name}</b> Comentou</p></li>
                            <p>${_comment.comment}</p>
                            <ul>
                                <li><p><b>${name}</b> Respondeu</p></li>
                                <p>${comment}</p>
                            </ul>
                        </ul>
                        <div class="container-buttons">
                            <a class="link" href='${config.http}/post/${post.slug}'>Ver todos os comentários</a>
                        </div>
                    </div>`
        }

        if (_comment.status_email == false) {
            await SendEmail.main(sendAdminEmail).then(res.sendStatus(200))
        } else {
            await SendEmail.main(sendAdminEmail).then(async () => {
                await SendEmail.main(sendUserEmail).then(res.sendStatus(200))
            })
        }
    } catch (err) { return res.status(404) }
}

/*========== (POST) Update comment  ==========*/
const UPDATE = async (req, res) => {
    const { id, name, email, comment } = req.body

    await Response.update({ name, email, comment }, { where: { id: id } })
        .then(res.sendStatus(200)).catch(res.sendStatus(404))
}

/*========== (POST) Delete comment  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.id

    await Response.destroy({ where: { id: id } })
        .then(() => res.sendStatus(200)).catch(() => res.sendStatus(404))
}

module.exports = {
    INSERT,
    UPDATE,
    DELETE
}