const express = require('express')
const routes = express.Router()
const connection = require('./database/connection')
const config = require('./config.json')

connection.authenticate()
    .then(() => console.log('Database Authenticate: OK!'))
    .catch(err => console.log('Database Authenticate error: ' + err))

const AdminController = require('./database/controllers/admin/AdminController')
const ProfileController = require('./database/controllers/admin/ProfileController')
const CommentController = require('./database/controllers/client/CommentController')
const ResponseController = require('./database/controllers/client/ResponseController')
const PostController = require('./database/controllers/client/PostController')
const CategoryController = require('./database/controllers/admin/CategoryController')
const AdminPostController = require('./database/controllers/admin/AdminPostController')
const SubscriberController = require('./database/controllers/client/SubscriberController')

const SendEmail = require('./database/controllers/SendEmail')

routes.post('/contact-admin/env', (req, res) => {
    const { name, email, msg } = req.body

    SendEmail.main({
        subject: `${name} Entrou em contato - ${email}`,
        html: `<div class="container">
                    <h1>${config.blog_name}</h1><hr>
                    <p>${msg}</p> 
                    <div class="container-buttons">
                        <a class="link" href='${config.http}/admin/login'>Ir para o blog</a>
                    </div>
               </div>`
    }).then(res.sendStatus(200)).catch(res.sendStatus(400))
})

routes.get('/user/unsubscribe/:hash', SubscriberController.DELETE)
routes.post('/user/subscriber/insert', SubscriberController.INSERT)

//#region ########## ADMIN CONTROLLERS ##########
routes.get('/admin/logout', AdminController.logout)

routes.post('/admin/login', AdminController.login)
routes.post('/admin/update', AdminController.UPDATE)
//#endregion

//#region ########## ADMIN PROFILE ##########
routes.get('/admin/profile', ProfileController.index)

routes.post('/admin/profile/insert', ProfileController.INSERT)
routes.post('/admin/profile/update', ProfileController.UPDATE)
//#endregion

//#region ########## CATEGORY CONTROLLERS ##########
routes.get('/admin/categories/:page', CategoryController.index)
routes.get('/admin/category/edit/:id', CategoryController.editCategory)

routes.post('/admin/category/insert', CategoryController.INSERT)
routes.post('/admin/category/update', CategoryController.UPDATE)
routes.post('/admin/category/delete', CategoryController.DELETE)
//#endregion

//#region ########## ADMIN POST CONTROLLERS ##########
routes.get('/admin/posts/:page', AdminPostController.index)
routes.get('/admin/post/new', AdminPostController.newPost)
routes.get('/admin/post/edit/:id', AdminPostController.editPost)

routes.post('/admin/post/insert', AdminPostController.INSERT)
routes.post('/admin/post/update', AdminPostController.UPDATE)
routes.post('/admin/post/delete', AdminPostController.DELETE)
//#endregion

//#region ########## POST CONTROLLERS ##########
routes.get('/home', PostController.index)
routes.get('/post/:slug', PostController.post)
routes.get('/posts/:page', PostController.allPosts)
routes.get('/posts/categoty/:slug/:page', PostController.category)
routes.get('/posts/search/:page', PostController.search)
//#endregion

//#region ########## COMMENTS CONTROLLERS ##########
routes.get('/status-email', CommentController.statusEmail)

routes.post('/comment/insert', CommentController.INSERT)
routes.post('/comment/update', CommentController.UPDATE)
routes.post('/comment/delete', CommentController.DELETE)
//#endregion

//#region ########## RESPONSE CONTROLLERS ##########
routes.post('/response/insert', ResponseController.INSERT)
routes.post('/response/update', ResponseController.UPDATE)
routes.post('/response/delete', ResponseController.DELETE)
//#endregion

module.exports = routes