import styled from 'styled-components'

export const Container = styled.nav`
    width: 20rem;
    min-height: 100vh;
    padding: 20px;
    background-color: #212F3C;
    scroll-behavior: auto;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    
    & h1 {
        color: ${props => props.theme.color.title_header_color};
    }
`
export const ContenProfile = styled.div`
    margin-top: 20px;
    padding: 18px 0;
    text-align: center;
`
export const ContainerImg = styled.div`
    width: 10rem;
    margin: 0 auto;
`
export const ImgProfile = styled.img`
    width: 100%;
    border-radius: 50%;
`
export const DivSocial = styled.div`
    padding: 12px 0;
`
export const AboutContent = styled.div`
    padding: 12px 0;
    text-align: justify;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
`
export const ListOptions = styled.div`
    margin: 2rem 0;

    & ul {
        padding: 0;
    }

    & li {
        list-style: none;
        background-color: #17202A;
        margin-top: .5rem;
        border-radius: 0 50px 50px 0;
    }

    & a {
        display: block;
        padding: .7rem .4rem;
        font-size: 1.2rem;
        font-weight: bold;
        text-decoration: none;
        color: white;
    }

    & a:hover {
        background-color: white;
        color: #17202A;
        border-radius: 0 50px 50px 0;
        transition: .5s;
    }

    & a.active {
        background-color: white;
        color: #17202A;
    }
`