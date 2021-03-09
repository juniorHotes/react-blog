import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function Post(props) {
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        const { data } = await api.get(props.location.pathname)
        setPosts(data.post.rows)
    }, [])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            {console.log(posts)}
            <div className='container'>
                <h1>Postagens</h1>
                <hr/>

                <table>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Criado</th>
                        <th>Editado</th>
                        <th>Categoria</th>
                    </tr>

                    {posts.map(post => {
                        return (
                            <tr>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.createdAt}</td>
                                <td>{post.updatedAt}</td>
                                <td>{post.category.title}</td>
                            </tr>
                        )
                    })}
                </table>

            </div>
        </>
    )
}