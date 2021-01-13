const express = require('express')
const routes = express.Router()
const connection = require('./database/connection')

connection.authenticate()
    .then(() => console.log('Database Authenticate: OK!'))
    .catch(err => console.log('Database Authenticate error: ' + err))

const CategoryController = require('./database/controllers/admin/CategoryController')
const ArticleController = require('./database/controllers/admin/ArticleController')

/*########## CATEGORY CONTROLLERS ##########*/
routes.get('/admin/categories/:page', CategoryController.index)
routes.get('/admin/category/new', CategoryController.newCategory)
routes.get('/admin/category/edit/:id', CategoryController.editCategory)

routes.post('/admin/category/update', CategoryController.UPDATE)
routes.post('/admin/category/insert', CategoryController.INSERT)
routes.post('/admin/category/delete', CategoryController.DELETE)

/*########## ARTICLE CONTROLLERS ##########*/

module.exports = routes