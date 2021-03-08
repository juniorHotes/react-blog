import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminOptions() {

    return (
        <ul>
            <li><Link to="/admin/profile">Editar Perfil</Link></li>
            <li><Link to="/admin/categories/1">Categorias</Link></li>
            <li><Link to="/admin/new/category">Nova Categoria</Link></li>
            <li><Link to="/admin/posts/1">Postagens</Link></li>
            <li><Link to="/admin/post/new">Nova Postagem</Link></li>
            <li><Link to="/">Home</Link></li>
        </ul>
    )
}