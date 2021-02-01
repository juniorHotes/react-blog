const Comment = require('../../migrations/Comment')
const Post = require('../../migrations/post')
const SendEmail = require('../SendEmail')


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
        Post.findOne({where: { id: postId }})
        .then(post => {
            const styles = `
                max-width: 120px;
                display: block;
                margin-top: 20px;
                text-decoration: none;
                padding: 12px;
                background: #00adef;
                color: white;
                text-align: center;`

            SendEmail.main({
                subject: `${name} Fez um comentário - ${email}`,
                html: `<p style="font-size:16px"><b>${name}</b> fez um comentário na postagem <b>${post.title}</b></p>
                       <p>${comment}</p>
                       <a style="${styles}" href='http://localhost:3333/post/${post.slug}'>Ver comentário</a>`
            }).then(res.sendStatus(200)).catch(res.sendStatus(400))
        
            res.sendStatus(200)    
        }).catch(err => { res.sendStatus(400)})
    }).catch(err => {res.sendStatus(404) })
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