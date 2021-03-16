import React, { useEffect } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function NewPost() {

    useEffect( async () => {
        const { data } = await api.get('/admin/post/new')
        console.log(data)
    }, [])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>
                <h1>Nova Postagem</h1>
            </div>
        </>
    )
}