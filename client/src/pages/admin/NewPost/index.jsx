import React, { useEffect } from 'react'
import api from '../../../services/api'
import VerticalHeader from '../../../components/VerticalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function NewPost() {

    useEffect( async () => {
        const { data } = await api.get('/admin/post/new')
        console.log(data)
    }, [])

    return (
        <>
            <VerticalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>
                <h1>Nova Postagem</h1>
            </div>
        </>
    )
}