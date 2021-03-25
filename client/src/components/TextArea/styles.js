import Styled from 'styled-components'

export const Container = Styled.div`
    width: ${props => props.size ? props.size : '100%'};
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
`
export const Label = Styled.label`
    color: ${props => {
        if(props.invalid) return 'red';
        else return props.theme.color.global_primary_color;
    }};
`
export const TextAreaElement = Styled.textarea`
    width: 100%;
    resize: vertical;
    min-height: 200px;
    max-height: 400px;
    border: none;
    font-size: 2rem;
    padding: 8px;
`
export const Span = Styled.span`
    display: block;
    margin: 8px;
    color: ${props => {
        if(props.invalid) return 'red';
        else return props.theme.color.global_subtitle_color;
    }};
`
export const Invalid = Styled.strong`
    display: block;
    color: red;
`