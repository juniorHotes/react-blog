const express = require('express')
const routes = express.Router()
const connection = require('./database/connection')

connection.authenticate()
    .then(() => console.log('Database Authenticate: OK!'))
    .catch(err => console.log('Database Authenticate error: ' + err))

const CategoryController = require('./database/controllers/admin/CategoryController')
const ArticleController = require('./database/controllers/admin/ArticleController')

/*########## CATEGORY CONTROLLERS ##########*/
routes.get('/admin/category/new', CategoryController.newCategory)
routes.post('/admin/category/new/insert', CategoryController.inserNewCategory)

/*########## ARTICLE CONTROLLERS ##########*/

module.exports = routes