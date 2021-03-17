import React, { useEffect, useState } from 'react'
import useDateFormat from '../../../hooks/useDateFormat'
import api from '../../../services/api'

import VerticalHeader from '../../../components/VerticalHeader'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Category(props) {
    const dateFormat = useDateFormat
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')
    const [reload, setReload] = useState(false)


    useEffect(async () => {
        const { data } = await api.get(props.location.pathname)
        setCategories(data.categories.rows)
    }, [reload])

    async function handleNewCategory(e) {
        e.preventDefault()

        const { data } = await api.post('/admin/category/insert', { category: newCategory.trim() })

        data.msg ? alert(data.msg) : alert("Categoria cadastrada com sucesso!")

        setReload(!reload)
    }

    return (
        <>
            <VerticalHeader listOptions={
                <AdminOptions />
            } />

            <div className='container'>
                <h1>Categorias</h1>
                <hr />

                <form onSubmit={handleNewCategory}>
                    <Input label="Nova categoria" type="text" placeholder='Nome da categoria'
                        name="category"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                    />
                    <Button primary size='1.4rem' >Salvar</Button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Criado</th>
                            <th>Editado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => {
                            return (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.title}</td>
                                    <td>{dateFormat(cat.createdAt)}</td>
                                    <td>{dateFormat(cat.updatedAt)}</td>
                                    <td>
                                        <Button secondary_tr><img src={IconEdit} /></Button>
                                        <Button danger_tr><img src={IconDelete} /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    )
}