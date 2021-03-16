import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Post(props) {
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        const { data } = await api.get(props.location.pathname)
        setPosts(data.post.rows)
    }, [])

    function dateFormat(date) {
        const fullDate = new Date(`${date}`)

        function convert(n) { return n < 10 ? `0${n}` : n }

        const dd = convert(fullDate.getDate())
        const mm = convert(fullDate.getMonth() + 1)
        const yy = fullDate.getFullYear()
        const hrs = convert(fullDate.getHours())
        const mts = convert(fullDate.getMinutes())

        return `${dd}/${mm}/${yy} às ${hrs}:${mts}`
    }

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            
            <div className='container'>
                <h1>Postagens</h1>
                <hr />

                <Button primary>Nova Postagem</Button>

                <table>
                    <tbody>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Postado</th>
                        <th>Editado</th>
                        <th>Categoria</th>
                        <th></th>
                    </tbody>

                    {posts.map(post => {
                        return (
                            <tbody key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{dateFormat(post.createdAt)}</td>
                                <td>{dateFormat(post.updatedAt)}</td>
                                <td>{post.category.title}</td>
                                <td>
                                    <Button><img src={IconEdit} /></Button>
                                    <Button danger><img src={IconDelete} /></Button>
                                </td>
                            </tbody>
                        )
                    })}
                </table>

            </div>
        </>
    )
}