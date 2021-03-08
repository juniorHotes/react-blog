import React from 'react'
import { Container, ContenProfile, ContainerImg, ImgProfile, DivSocial, AboutContent, ListOptions } from './styles.js'

export default function HorizontalHeader(props) {
    return (
        <Container>
            {props.showProfile &&
                <ContenProfile>
                    <ContainerImg>
                        <ImgProfile src="https://avatars.githubusercontent.com/u/48397952?s=460&u=ce14bd1c65778a22a65bc6f893cd88762587311b&v=4" />
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