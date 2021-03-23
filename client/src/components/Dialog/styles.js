import Styled from 'styled-components'

export const Container = Styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    display: ${props => props.hidden ? 'none' : 'flex'};
    justify-content: center;
    align-items: flex-start;
    transition: width .5s;
    
`
export const Modal = Styled.div`
    min-width: 450px;
    min-height: 400px;
    margin-top: 5rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: white;
`
export const Header = Styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    font-weight: bold;

    & button {
        margin: 0 0 0 12px;
        padding: 4px;
    }

    & img {
        width: 32px;
    }
`

export const Body = Styled.div`
    width: 100%
`