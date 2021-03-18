import React, { useEffect, useState } from 'react'
import useDateFormat from '../../../hooks/useDateFormat'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

import VerticalNav from '../../../components/VerticalNav'
import WrapperAside from '../../../components/WrapperAside'
import AdminOptions from '../../../components/AdminOptions'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import PageNavegation from '../../../components/PageNavegation'

import IconEdit from '../../../assets/icons/edit.svg'
import IconDelete from '../../../assets/icons/delete.svg'

export default function Category({ location }) {
    const baseURL = location.pathname.slice(0, location.pathname.length -1)

    const dateFormat = useDateFormat
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')
    const [reload, setReload] = useState(false)

    const [page, setPage] = useState(1)
    const [count, setCount] = useState()

    useEffect(async () => {
        const { data } = await api.get(baseURL + page)
        setCategories(data.categories.rows)

        setCount(Math.round(data.categories.count / 8))
    }, [reload, page])

    async function handleNewCategory(e) {
        e.preventDefault()

        const { data } = await api.post('/admin/category/insert', { category: newCategory.trim() })

        data.msg ? alert(data.msg) : alert("Categoria cadastrada com sucesso!")

        setReload(!reload)
    }

    return (
        <>
            <VerticalNav listOptions={
                <AdminOptions />
            } />

            <WrapperAside title='Categorias'
                element={<Button as={Link} to='/admin/post/new' primary size='1.4rem'>Nova Categoria</Button>}
            >
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
                </table>

                <PageNavegation url={baseURL} count={count} set={(p) => setPage(p)}/>
            </WrapperAside>
        </>
    )
}