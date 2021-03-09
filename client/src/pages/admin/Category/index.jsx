import React, { useEffect } from 'react'
import api from '../../../services/api'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function Category(props) {
    console.log(props.location.pathname)

    useEffect( async () => {
        const { data } = await api.get(props.location.pathname)
        console.log(data)
    }, [])

    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>
            </div>
        </>
    )
}