import React from 'react'
import { Container, Label, TextAreaElement, Span } from './styles'

export default function TextArea(props) {
    props.value.length > 250 ? console.log('Passou') : null

    return (
        <Container size={props.size}>
            <Label htmlFor={props.name}>{props.label}</Label>
            <TextAreaElement {...props} />
            <Span>Limite de 250 caracters /{props.value.length}</Span>
        </Container>
    )
}