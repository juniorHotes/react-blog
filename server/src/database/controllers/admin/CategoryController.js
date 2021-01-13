const Slugify = require('slugify')

const Category = require('../../migrations/category')

/*========== (GET) show all registered categories  ==========*/
const index = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const pageOffset = page * 8

    await Category.findAndCountAll({
        limit: 8,
        offset: pageOffset
    }).then(categories => {
        const pages = pageOffset + 1 >= categories.count ? false : true
        res.json({ pages, categories })
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
        console.log("Error on find categories: " + err)
    })
}
/*========== (GET) New category registration page  ==========*/
const newCategory = async (req, res) => {
    res.send('New category registration page')
}
/*========== (GET) Page to edit category  ==========*/
const editCategory = async (req, res) => {
    const id = req.params.id

    await Category.findOne({
        where: { id: id }
    }).then(category => {
        res.json(category)
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
        console.log("Error on find category: " + err)
    })
}
/*========== (POST) Register new category in database ==========*/
const INSERT = async (req, res) => {
    const category = req.body.category
    const slug = Slugify(category, { lower: true })

    try {
        await Category.findOne({
            where: { slug: slug }
        }).then(async (_category) => {

            if (_category == undefined) {
                await Category.create({
                    title: category,
                    slug: slug
                }).then(() => {
                    res.sendStatus(200)
                })
            } else {
                res.sendStatus(409)
            }
        })
    } catch (err) {
        res.send({ error: err })
        console.log("Error on insert category: " + err)
        res.sendStatus(404)
    }
}
/*========== (POST) Update category  ==========*/
const UPDATE = async (req, res) => {
    const id = req.body.categoryId
    const category = req.body.category
    const slug = Slugify(category, { lower: true })

    await Category.update({
        title: category,
        slug: slug
    }, {
        where: { id: id }
    }).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
        console.log("Error on update category: " + err)
    })
}
/*========== (POST) Delete category  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.categoryId

    await Category.destroy({
        where: { id: id }
    }).then(() => {
        res.send('category deleted')
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(404)
        console.log("Error on delete category: " + err)
    })
}

module.exports = {
    index,
    newCategory,
    editCategory,
    INSERT,
    UPDATE,
    DELETE
}