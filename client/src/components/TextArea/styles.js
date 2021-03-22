import Styled from 'styled-components'

export const Container = Styled.div`
    width: ${props => props.size ? props.size : '100%'};
    display: flex;
    flex-direction: column;
    justify-content: start;
`
export const Label = Styled.label`
    
`
export const TextAreaElement = Styled.textarea`
    width: 100%;
    resize: vertical;
    margin-top: 20px;
    min-height: 200px;
    border: none;
    height: 200px;
    font-size: 2rem;
    text-align: justify;
`
export const Span = Styled.label`
    display: block;
    margin: 8px;
    color: ${props => props.theme.color.global_subtitle_color};
`