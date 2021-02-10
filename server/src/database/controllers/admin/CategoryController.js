const Slugify = require('slugify')
const Category = require('../../migrations/category')

/*========== (GET) show all registered categories  ==========*/
const index = async (req, res) => {
    const page = parseInt(req.params.page - 1)
    const limit = 8
    const pageOffset = page * limit

    if (isNaN(page)) return res.sendStatus(404)

    await Category.findAndCountAll({
        limit: limit,
        offset: pageOffset
    }).then(categories => {
        const pages = pageOffset + limit >= categories.count ? false : true
        res.json({ pages, categories }).sendStatus(200)
    }).catch(err => res.json(err).sendStatus(404))
}
/*========== (GET) Page to edit category  ==========*/
const editCategory = async (req, res) => {
    const id = req.params.id

    if (isNaN(id)) return res.sendStatus(404)

    await Category.findOne({ where: { id: id } })
        .then(category => res.json(category).sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}
/*========== (POST) Register new category in database ==========*/
const INSERT = async (req, res) => {
    const category = req.body.category
    const slug = Slugify(category, { lower: true })

    try {
        await Category.findOne({ where: { slug: slug } })
            .then(async _category => {
                if (_category == undefined) {
                    await Category.create({
                        title: category,
                        slug: slug
                    }).then(ctg => res.json(ctg).sendStatus(200))
                } else { res.json({ "msg": "Está categoria já existe!" }).sendStatus(409) }
            })
    } catch (err) { res.sendStatus(404) }
}
/*========== (POST) Update category  ==========*/
const UPDATE = async (req, res) => {
    const { id, category } = req.body
    const slug = Slugify(category, { lower: true })

    await Category.update({
        title: category,
        slug: slug
    }, { where: { id: id } })
        .then(() => res.sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}
/*========== (POST) Delete category  ==========*/
const DELETE = async (req, res) => {
    const id = req.body.categoryId

    await Category.destroy({ where: { id: id } })
        .then(res.sendStatus(200)).catch(err => res.json(err).sendStatus(404))
}

module.exports = {
    index,
    editCategory,
    INSERT,
    UPDATE,
    DELETE
}