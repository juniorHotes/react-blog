import { createGlobalStyle } from 'styled-components'

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

    & table th {
       padding: .5rem;
       background-color: #c9c9c9;
       text-align: start;
    }
    & table td {
       padding: .5rem;
       border: 1px solid #c9c9c9;
    }
`