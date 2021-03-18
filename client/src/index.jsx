import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './assets/styles/global.js'
import { ThemeProvider } from 'styled-components'
import defaultLight from './assets/styles/themes/default-light'
import defaultDark from './assets/styles/themes/default-dark'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultLight} >
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
