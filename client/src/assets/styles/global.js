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
`