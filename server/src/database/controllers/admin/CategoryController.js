const Sequelize = require('sequelize')
const Slugify = require('slugify')
const Op = Sequelize.Op

const Category = require('../../migrations/category')

const newCategory = async (req, res) => {
    res.send("Página de cadastro de categoria")
}

const inserNewCategory = async (req, res) => {
    const category = req.body.category

    Category.create({
        title: category,
        slug: Slugify(category, { lower: true })
    }).then(() => {
        res.send('Categoria cadastrada')
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(400)
        console.log("Error on insert new category: " + err)
    })
}

module.exports = {
    newCategory,
    inserNewCategory,
}