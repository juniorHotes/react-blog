import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import NewCategory from './pages/admin/NewCategory'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={NewCategory} />
            {/* <Route path="/register" component={RegisterUser} />
            <Route path="/login" component={Login} />
            <Route path="/edit/user/:id" component={EditUser} /> */}
        </BrowserRouter>
    )
}