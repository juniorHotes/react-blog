import React from 'react'
import { Link } from 'react-router-dom'
import HorizontalHeader from '../../../components/HorizontalHeader'

export default function NewCategory() {
    return (
        <div>
            <HorizontalHeader listOptions={
                <Link to="/admin/profile">Editar perfil</Link>
            } />
        </div>
    )
}