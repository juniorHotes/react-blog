import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        background-color: ${props => props.theme.color.bg_section_color};
    }

    #root {
        max-width: 1600px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 20rem 2fr;
    }

    .container {
        margin: 16px;
        padding: 8px;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.color.global_title_color}
    }

    table {
        width: 100%;
    }

    table thead tr th {
       padding: .5rem;
       background-color: white;
       text-align: start;
       color: ${props => props.theme.color.global_title_color}
    }

    table thead tr th:first-child {
        width: 1rem;
        min-width: 1rem;
     }

    table thead tr th:last-child {
        width: 11rem;
     }
 
    table td {
       padding: .5rem;
       border: 1px solid #c9c9c9;
       color: ${props => props.theme.color.global_text_color}
    }
`