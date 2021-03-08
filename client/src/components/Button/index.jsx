import React from 'react'
import { ButtonElem } from './styles'

export default function Button(props) {

    return (
        <ButtonElem {...props}>
            {props.children}
        </ButtonElem>
    )
}