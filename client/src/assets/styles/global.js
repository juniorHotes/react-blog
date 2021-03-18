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
        font-family: 'Poppins', sans-serif;
        background-color: ${props => props.theme.color.bg_section_color};
    }

    #root {
        margin: 0 auto;
        display: flow-root;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.color.global_title_color}
    }

    table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
    }

    table thead tr th {
       font-size: 1.2rem;
       padding: .8rem .4rem;
       text-align: start;
       color: ${props => props.theme.color.global_title_color}
    }

    table thead tr {
        box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    }

    table thead tr th:first-child {
        width: 1rem;
        min-width: 1rem;
     }

    table thead tr th:last-child {
        width: 11rem;
     }
 
    table tbody tr {
       box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
       color: ${props => props.theme.color.global_text_color}
    }

    table tbody td {
        padding: .4rem;
     }
`