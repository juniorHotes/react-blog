import Styled from 'styled-components'

export const ProfileContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;

    & h1 {
        font-size: 3rem;
    }
`
export const ImgContainer = Styled.div`
    width: 16rem;
`

export const Img = Styled.img`
    width: 100%;
`

export const Email = Styled.span`
    display: block;
    font-size: 1.2rem;
    margin: 12px 0;
`