const express = require('express')
const routes = express.Router()
const connection = require('./database/connection')

connection.authenticate()
    .then(() => console.log('Database Authenticate: OK!'))
    .catch(err => console.log('Database Authenticate error: ' + err))

const AdminController = require('./database/controllers/admin/AdminController')
const CommentController = require('./database/controllers/client/CommentController')
const PostController = require('./database/controllers/client/PostController')
const CategoryController = require('./database/controllers/admin/CategoryController')
const AdminPostController = require('./database/controllers/admin/AdminPostController')

//#region ########## ADMIN CONTROLLERS ##########
routes.get('/admin/logout', AdminController.logout)

routes.post('/admin/login', AdminController.login)
routes.post('/admin/insert', AdminController.INSERT)
routes.post('/admin/update', AdminController.UPDATE)
routes.post('/admin/delete', AdminController.DELETE)
//#endregion

//#region ########## CATEGORY CONTROLLERS ##########
routes.get('/admin/categories/:page', CategoryController.index)
routes.get('/admin/category/edit/:id', CategoryController.editCategory)

routes.post('/admin/category/update', CategoryController.UPDATE)
routes.post('/admin/category/insert', CategoryController.INSERT)
routes.post('/admin/category/delete', CategoryController.DELETE)
//#endregion

//#region ########## ADMIN POST CONTROLLERS ##########
routes.get('/admin/posts/:page', AdminPostController.index)
routes.get('/admin/post/new', AdminPostController.newPost)
routes.get('/admin/post/edit/:id', AdminPostController.editPost)

routes.post('/admin/post/update', AdminPostController.UPDATE)
routes.post('/admin/post/insert', AdminPostController.INSERT)
routes.post('/admin/post/delete', AdminPostController.DELETE)
//#endregion

//#region ########## POST CONTROLLERS ##########
routes.get('/', PostController.index)
routes.get('/posts/:page', PostController.allPosts)
routes.get('/posts/categoty/:slug/:page', PostController.category)
routes.get('/posts/search/:page', PostController.search)
//#endregion

//#region ########## COMMENTS CONTROLLERS ##########
routes.get('/admin/comments/:page', CommentController.index)
routes.post('/comment/insert', CommentController.INSERT)
//#endregion

module.exports = routes