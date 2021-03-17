import { createGlobalStyle } from 'styled-components'

export const defaultTheme = {
    bg_header_color: '#212F3C'
}

export const GlobalStyle = createGlobalStyle`
    & * {
        margin: 0;
        box-sizing: border-box;
    }

    & html {
        scroll-behavior: smooth;
    }

    & #root {
        max-width: 1600px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 20rem 2fr;
    }

    & .container {
        margin: 16px;
        padding: 8px;
    }

    & table {
        width: 100%;
    }

    & table thead tr th {
       padding: .5rem;
       background-color: ${defaultTheme.bg_header_color};
       text-align: start;
       color: white;
    }

    & table thead tr th:first-child {
        width: 1rem;
        min-width: 1rem;
     }

    & table thead tr th:last-child {
        width: 11rem;
     }
 
    & table td {
       padding: .5rem;
       border: 1px solid #c9c9c9;
    }
`