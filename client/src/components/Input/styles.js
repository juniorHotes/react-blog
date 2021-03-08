import Styled from 'styled-components'

export const Container = Styled.div`
    display: block;
    margin: .5rem;
` 
export const Label = Styled.label`
    display: flex;
` 
export const InputElem = Styled.input`
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    background-color: #EBEDEF;
    font-weight: bold;
    outline: none;
    transition: .5s;

    &:focus {
        box-shadow: 1px 2px 5px rgba(0, 0, 0, .5);
        background-color: #FFF;
    }
` 