const Slugify = require('slugify')
const Post = require('../../migrations/post')
const Category = require('../../migrations/category')
const Subscriber = require('../../migrations/Subscriber')
const SendEmail = require('../SendEmail')
const config = require('../../../config.json')
const bcryptjs = require('bcryptjs')

/*========== (GET) Show all posts  ==========*/
const index = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) return res.sendStatus(404)

    await Post.findAndCountAll({
        include: [{ model: Category }],
        limit: limit,
        offset: pageOffset
    }).then(post => {
        const pagination = pageOffset + limit >= post.count ? false : true
        res.json({ pagination, post })
        res.sendStatus(200)
    }).catch(() => res.sendStatus(404))
}
/*========== (GET) New post registration page  ==========*/
const newPost = async (req, res) => {

    await Category.findAll()
        .then(categories => {
            res.json(categories)
            res.sendStatus(200)
        }).catch(() => res.sendStatus(404))
}
/*========== (GET) Page to edit post  ==========*/
const editPost = async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) return res.sendStatus(404)

    try {
        await Post.findOne({
            where: { id: id },
            include: [{ model: Category }],
        }).then(async post => {
            await Category.findAll()
                .then(categories => {
                    res.json({ post, categories })
                    res.sendStatus(200)
                })
        })
    } catch (err) { res.sendStatus(404) }
}
/*========== (POST) Register new post in database ==========*/
const INSERT = async (req, res) => {
    const { title, body, categoryId, sendUsers } = req.body

    const slug = Slugify(title, { lower: true })

    try {
        const postSlug = await Post.findOne({ where: { slug: slug } })

        if (postSlug == undefined) {
            const post = await Post.create({ title, slug, body, categoryId })

            if(sendUsers == false) return res.json(post).sendStatus(200)

            const subscriber = await Subscriber.findAll()
            subscriber.map(async item => {

                const salt = bcryptjs.genSaltSync(10)
                const hashID = bcryptjs.hashSync(String(item.id), salt)

                const sendSubscribersEmail = {
                    to: item.email,
                    subject: `${config.blog_name} - Fez uma nova postagem`,
                    html: `<div class="container">
                                <h1>${config.blog_name}</h1><hr>
                                <h2>${title}</h2>
                                <p>Publiquei uma nova postagem no blog com o título, <b>${title}</b>, confira agora.</p>
                                <div class="container-buttons">
                                    <a class="link" href='${config.http}/post/${slug}'>Ver postagem</a>
                                    <a class="link" href='${config.http}/user/unsubscribe/${hashID}/?id=${item.id}'>
                                    Não quero mais receber E-mails</a>
                                </div>
                            </div>`
                }

                await SendEmail.main(sendSubscribersEmail).then(res.sendStatus(200))
            })

        } else { res.sendStatus(409) }
    } catch (err) { res.json(err).sendStatus(404) }
}
/*========== (POST) Update post  ==========*/
const UPDATE = async (req, res) => {
    const { id, title, body, categoryId } = req.body

    const slug = Slugify(title, { lower: true })

    await Post.update({ title, slug, body, categoryId }, {
        where: { id: id }
    }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(404))
}
/*========== (POST) Delete post  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.postId

    await Post.destroy({
        where: { id: id }
    }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(404))
}

module.exports = {
    index,
    newPost,
    editPost,
    INSERT,
    UPDATE,
    DELETE
}