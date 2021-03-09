import React, { useEffect } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function Profile() {

    useEffect( async () => {
        const { data } = await api.get('/admin/profile')
        console.log(data)
    }, [])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>
                
                <div>
                    <img src="" alt=""/>
                </div>
                <form action="">
                    <input type="text" name="" id=""/>
                </form>
            </div>
        </>
    )
}