import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@huskifinance/huski-frontend-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'M PLUS 2', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body {
  background: #16131e;
overflow: overlay;
  
    // custom scrollbar
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    box-shadow: none;
    border-radius: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: #292233;
  }

    img {
      height: auto;
      max-width: 100%;
    }
    input{
      box-shadow : none!important;
    }
    input:focus{
      outline: none!important;
      box-shadow : none!important;
  }
  }
`

export default GlobalStyle
