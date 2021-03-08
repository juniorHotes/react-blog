import React from 'react'
import { Container, Label, InputElem } from './styles'

export default function Input(props) {

    return (
        <Container >
            <Label htmlFor={props.name}>{props.label}</Label>
            <InputElem {...props} />
        </Container>
    )
}