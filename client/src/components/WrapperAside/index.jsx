import React from 'react'
import { Wrapper, Header, Title } from './styles'

export default function WrapperAside(props) {
    return (
        <Wrapper>
            <Header>
                <Title>{props.title}</Title>
                {props.element}
            </Header>
            {props.children}
        </Wrapper>
    )
}