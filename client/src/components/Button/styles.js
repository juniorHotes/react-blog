import Styled, { css } from 'styled-components'

export const ButtonElem = Styled.button`
    display: inline-flex;
    text-decoration: none;
    background-color: transparent;
    border-radius: 8px;
    border: 3px solid transparent;
    color: #666;
    text-align: center;
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
        background-color: #1a73e8;
        border-color: #1a73e8;
        color: white;
    `}

    ${props => props.primary_tr && css`
        border-color: #1a73e8;
        color: #1a73e8;
    `}

    ${props => props.secondary && css`
        background-color: #2ECC71;
        border-color: #2ECC71;
        color: white;
    `}

    ${props => props.secondary_tr && css`
        border-color: #2ECC71;
        color: #2ECC71;
    `}


    ${props => props.warn && css`
        background-color: #F39C12;
        border-color: #F39C12;
        color: white;
    `}

    ${props => props.warn_tr && css`
        border-color: #F39C12;
        color: #F39C12;
    `}

    ${props => props.danger && css`
        background-color: #E74C3C;
        border-color: #E74C3C;
        color: white;
    `}

    ${props => props.danger_tr && css`
        border-color: #E74C3C;
        color: #E74C3C;
    `}
`