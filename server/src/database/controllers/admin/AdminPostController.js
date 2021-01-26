const Slugify = require('slugify')
const Post = require('../../migrations/post')
const Category = require('../../migrations/category')

/*========== (GET) Show all posts  ==========*/
const index = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) {
        return res.sendStatus(404)
    }

    await Post.findAndCountAll({
        include: [{ model: Category }],
        limit: limit,
        offset: pageOffset
    }).then(post => {
        const pagination = pageOffset + limit >= post.count ? false : true
        res.json({ pagination, post })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}
/*========== (GET) New post registration page  ==========*/
const newPost = async (req, res) => {

    await Category.findAll()
        .then(categories => {
            res.json(categories)
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(404)
        })
}
/*========== (GET) Page to edit post  ==========*/
const editPost = async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        return res.sendStatus(404)
    }

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
    } catch (err) {
        res.sendStatus(404)
    }
}
/*========== (POST) Register new post in database ==========*/
const INSERT = async (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const categoryId = req.body.categoryId

    const slug = Slugify(title, { lower: true })

    try {
        await Post.findOne({
            where: { slug: slug }
        }).then(async (_post) => {

            if (_post == undefined) {
                await Post.create({
                    title: title,
                    slug: slug,
                    body: body,
                    categoryId: categoryId
                }).then(() => {
                    res.sendStatus(200)
                })
            } else {
                res.sendStatus(409)
            }
        })
    } catch (err) {
        res.send({ error: err })
        res.sendStatus(404)
    }
}
/*========== (POST) Update post  ==========*/
const UPDATE = async (req, res) => {
    const id = req.body.postId
    const title = req.body.title
    const body = req.body.body
    const categoryId = req.body.categoryId

    const slug = Slugify(title, { lower: true })

    await Post.update({
        title: title,
        slug: slug,
        body: body,
        categoryId: categoryId
    }, {
        where: { id: id }
    }).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}
/*========== (POST) Delete post  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.postId

    await Post.destroy({
        where: { id: id }
    }).then(() => {
        res.send('post deleted')
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
    })
}

module.exports = {
    index,
    newPost,
    editPost,
    INSERT,
    UPDATE,
    DELETE
}