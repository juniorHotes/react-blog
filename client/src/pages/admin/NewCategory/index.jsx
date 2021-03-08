import React from 'react'
import HorizontalHeader from '../../../components/HorizontalHeader'
import AdminOptions from '../../../components/AdminOptions'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function NewCategory() {
    return (
        <>
            <HorizontalHeader listOptions={
                <AdminOptions />
            } />
            <div className='container'>
                <h1>Nova Categoria</h1>
                <hr/>
                <form action={(e) => e.preventDefault}>
                    <Input label="Título" type="text" name="new_category" placeholder='Nome da categoria'/>
                    <Button primary>Salvar</Button>
                </form>
            </div>

        </>
    )
}