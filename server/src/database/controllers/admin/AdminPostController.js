const Slugify = require('slugify')
const Post = require('../../migrations/post')
const Category = require('../../migrations/category')
const Subscriber = require('../../migrations/Subscriber')
const SendEmail = require('../SendEmail')

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
    const { title, body, categoryId } = req.body

    const slug = Slugify(title, { lower: true })

    try {
        const postSlug = await Post.findOne({ where: { slug: slug } })

        if (postSlug == undefined) {
            await Post.create({ title, slug, body, categoryId })
            const subscriber = await Subscriber.findAll()

            console.log(subscriber)

            const sendSubscribersEmail = {
                to: subscriber.email,
                subject: `Publicou uma nova postagem`,
                html: `<h3>${title}</h3>
                        <a class="link" href='http://localhost:3333/post/${slug}'>Ver</a>
                        <a class="link" href='http://localhost:3333/user/subscriber/delete'>Cancelar inscrição</a>`
            }

            await SendEmail.main(sendSubscribersEmail).then(res.sendStatus(200))

        } else { res.sendStatus(409) }
    } catch (err) { res.sendStatus(404) }
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