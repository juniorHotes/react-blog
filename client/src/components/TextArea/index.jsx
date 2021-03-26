import React from 'react'
import { Container, Label, TextAreaElement, Span, Invalid } from './styles'

export default function TextArea(props) {

    function validate() {
        let msg = ''
        if (props.value.length > 350) return msg = "Você exedeu o limite de caracteres" 
        if (props.value.length == 0) return msg = "Campo obrigatório"
    }
    return (
        <Container size={props.size}>
            <Label htmlFor={props.name} invalid={validate()}>{props.label}</Label>
            <TextAreaElement {...props} />
            <Span invalid={validate()}>
                {props.value.length} do limite de 350 caracteres
            </Span>
            <Invalid>{validate()}</Invalid>
        </Container>
    )
}