import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Category(props) {
    const [categories, setCategories] = useState([])

    useEffect(async () => {
        const { data } = await api.get(props.location.pathname)
        setCategories(data.categories.rows)
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
                <h1>Categorias</h1>
                <hr />

                <form action={(e) => e.preventDefault}>
                    <Input label="Nova categoria" type="text" name="new_category" placeholder='Nome da categoria' />
                    <Button primary>Salvar</Button>
                </form>

                <table>
                    <tbody>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Criado</th>
                        <th>Editado</th>
                        <th></th>
                    </tbody>

                    {categories.map(cat => {
                        return (
                            <tbody key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.title}</td>
                                <td>{dateFormat(cat.createdAt)}</td>
                                <td>{dateFormat(cat.updatedAt)}</td>
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