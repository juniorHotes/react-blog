import React, { useState } from 'react'
import { Container, Modal, Header, Body} from './styles'

import IconClose from '../../assets/icons/bx-x.svg'
import Button from '../Button'

export default function Dialog(props) {
    const [close, setClose] = useState(props.hidden)

    return (
        <Container hidden={close}>
            <Modal>
                <Header>
                    {props.title} 
                    <Button onClick={() => setClose(true)}>
                        <img src={IconClose} alt="Close"/>
                    </Button>
                </Header>
                <Body>
                    {props.body}
                </Body>
            </Modal>
        </Container>
    )
}