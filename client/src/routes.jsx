import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home'
import Profile from './pages/admin/Profile'
import Category from './pages/admin/Category'
import NewCategory from './pages/admin/NewCategory'
import Post from './pages/admin/Post'
import NewPost from './pages/admin/NewPost'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/categories/:page" component={Category} />
            <Route path="/admin/new/category" component={NewCategory} />
            <Route path="/admin/posts/:page" component={Post} />
            <Route path="/admin/post/new" component={NewPost} />
        </BrowserRouter>
    )
}