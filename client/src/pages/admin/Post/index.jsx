import React, { useEffect, useState } from 'react'
import useDateFormat from '../../../hooks/useDateFormat'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

import VerticalNav from '../../../components/VerticalNav'
import WrapperAside from '../../../components/WrapperAside'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'
import PageNavegation from '../../../components/PageNavegation'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Post({ location }) {
    const baseURL = location.pathname.slice(0, location.pathname.length -1)

    const dateFormat = useDateFormat

    const [posts, setPosts] = useState([])

    const [page, setPage] = useState(1)
    const [count, setCount] = useState()

    useEffect(async () => {
        const { data } = await api.get(baseURL + page)
        setPosts(data.post.rows)

        setCount(Math.ceil(data.post.count / 8))
    }, [page])

    return (
        <>
            <VerticalNav listOptions={
                <AdminOptions />
            } />

            <WrapperAside title='Postagens' 
                element={<Button as={Link} to='/admin/post/new' primary size='1.4rem'>Nova Postagem</Button>}
            >
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th style={{width:'180px'}}>Postado</th>
                            <th style={{width:'180px'}}>Editado</th>
                            <th >Categoria</th>
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
                                        <Button secondary_tr><img src={IconEdit} /></Button>
                                        <Button danger_tr><img src={IconDelete} /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
                <PageNavegation url={baseURL} count={count} set={(p) => setPage(p)}/>
            </WrapperAside>
        </>
    )
}