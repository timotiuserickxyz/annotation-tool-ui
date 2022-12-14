import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }
  body {
    position: relative;
    font-size: 16px;
    font-family: sans-serif;
    color: #080619;
  }
  a {
    text-decoration: none;
  }
  ol, ul {
    padding: 0;
  }
  ol {
    list-style-position: inside;
  }
  img {
    vertical-align: middle;
    width: 100%;
  }
  button, input, select, textarea {
    font-family : inherit;
    font-size   : 100%;
  }
`;
export default GlobalStyle;
