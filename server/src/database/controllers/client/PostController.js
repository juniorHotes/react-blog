const Post = require('../../migrations/post')
const Comment = require('../../migrations/Comment')
const Response = require('../../migrations/Response')
const Category = require('../../migrations/category')
const Op = require('sequelize').Op

/*========== (GET) Show last posts  ==========*/
const index = async (req, res) => {

    await Post.findAll({
        order: [['id', 'DESC']],
        limit: 4,
        include: [{ model: Category }]
    }).then(post => {
        res.json(post)
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

const post = async (req, res) => {
    const postSlug = req.params.slug

    await Post.findOne({
        where: { slug: postSlug },
        include: [{ model: Category }]
    }).then(post => {
        Comment.findAll({
            include: { model: Response },
            where: { postId: post.id }
        }).then(comment => {
            res.json({ post, comment })
            res.sendStatus(200)
        })
    }).catch(err => {
        res.sendStatus(404)
    })
}

/*========== (GET) Show all posts  ==========*/
const allPosts = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) {
        return res.sendStatus(404)
    }

    await Post.findAndCountAll({
        order: [['id', 'DESC']],
        limit: limit,
        offset: pageOffset,
        include: [{ model: Category }]
    }).then(post => {
        const pagination = pageOffset + limit >= post.count ? false : true
        res.json({ pagination, post })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

/*========== (GET) Post by category  ==========*/
const category = async (req, res) => {
    const slug = req.params.slug
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) {
        return res.sendStatus(404)
    }

    await Post.findAndCountAll({
        order: [['id', 'DESC']],
        limit: limit,
        offset: pageOffset,
        include: [{
            model: Category,
            where: { slug: slug },
        }],
    }).then(post => {
        const pagination = pageOffset + limit >= post.count ? false : true
        res.json({ pagination, post })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

/*========== (GET) Search posts  ==========*/
const search = async (req, res) => {
    const query = req.query["where"]
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) {
        return res.sendStatus(404)
    }

    await Post.findAndCountAll({
        where: { title: { [Op.like]: "%" + query + "%" } },
        order: [['id', 'DESC']],
        limit: limit,
        offset: pageOffset,
        include: [{ model: Category }]
    }).then(post => {
        const pagination = pageOffset + limit >= post.count ? false : true
        res.json({ pagination, post })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

module.exports = {
    index,
    post,
    allPosts,
    category,
    search
}