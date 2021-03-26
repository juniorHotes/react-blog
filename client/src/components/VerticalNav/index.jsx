import React from 'react'
import { Container, ContenProfile, ContainerImg, ImgProfile, DivSocial, AboutContent, ListOptions } from './styles.js'
import DefaulUserPofile from '../../assets/icons/default_user.svg'

export default function VerticalNav(props) {
    return (
        <Container>
            {props.showProfile &&
                <ContenProfile>
                    <ContainerImg>
                        <ImgProfile src={DefaulUserPofile} />
                    </ContainerImg>
                    <h2>João Domingos</h2>
                    <DivSocial>
                        Redes sociais
                    </DivSocial>
                    <AboutContent>
                        <p>Olá! Meu nome é João Domingos mais também conhecido como Junior Hotes nas redes socias, meu primeiro sistema operacional que utilizei foi Windows 95 quando tinha apenas 13 anos</p>
                    </AboutContent>
                </ContenProfile>
            || <h1>Administrador</h1>}

            <ListOptions>
                {props.listOptions}
            </ListOptions>
        </Container>
    )
}