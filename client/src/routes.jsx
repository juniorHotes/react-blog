import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home'
import Profile from './pages/admin/Profile'
import NewCategory from './pages/admin/NewCategory'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/new/category" component={NewCategory} />
        </BrowserRouter>
    )
}