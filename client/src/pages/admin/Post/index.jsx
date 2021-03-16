import React, { useEffect, useState } from 'react'
import useDateFormat from '../../../hooks/useDateFormat'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Post({ location }) {
    const dateFormat = useDateFormat
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState(false)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState()

    useEffect(async () => {
        const { data } = await api.get(`/admin/posts/${page}`)
        setPosts(data.post.rows)

        const count = Math.round(data.post.count / 8)
        console.log(count)
        setCount(count)
        setPagination(data.pagination)
    }, [page])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />

            <div className='container'>
                <h1>Postagens</h1>
                <hr />

                <Button as={Link} to='/admin/post/new' primary >Nova Postagem</Button>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Postado</th>
                            <th>Editado</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{dateFormat(post.createdAt)}</td>
                                    <td>{dateFormat(post.updatedAt)}</td>
                                    <td>{post.category.title}</td>
                                    <td>
                                        <Button><img src={IconEdit} /></Button>
                                        <Button danger><img src={IconDelete} /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
                <div>
                    <Button as={Link} to={`/admin/posts/1`} onClick={() => setPage(1)}>Primeira</Button>

                    {[...Array(count)].map((_, idx) => {
                        idx++
                        return (
                            <Button as={Link}
                                key={idx}
                                to={`/admin/posts/${idx}`}
                                onClick={() => setPage(idx)}
                            >{idx}</Button>
                        )
                    })}

                    <Button as={Link} to={`/admin/posts/${count}`} onClick={() => setPage(count)}>Última</Button>

                </div>
            </div>
        </>
    )
}