import React, { useEffect } from 'react'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'

export default function Profile() {

    useEffect(() => {

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