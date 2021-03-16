import Styled, { css } from 'styled-components'

export const ButtonElem = Styled.button`
    display: inline-flex;
    text-decoration: none;
    background: transparent;
    border-radius: 8px;
    border: 2px solid #1a73e8;
    color: #1a73e8;
    margin: .5rem;
    padding: .5rem 1rem;
    cursor: pointer;
    font-size: ${props => props.size || '1rem'};
    font-weight: bold;
    transition: .5s;

    &:hover {
        box-shadow: 1px 2px 5px rgba(0, 0, 0, .5);
    }

    ${props => props.primary && css`
        background: #1a73e8;
        color: white;
    `}

    ${props => props.secondary && css`
        background: #2ECC71;
        border-color: #2ECC71;
        color: white;
    `}

    ${props => props.warn && css`
        background: #F39C12;
        border-color: #F39C12;
        color: white;
    `}

    ${props => props.danger && css`
        background: #E74C3C;
        border-color: #E74C3C;
        color: white;
    `}
`