import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 18px;
    
  }
  body {
    background-image: url('/images/egg/background.png');
    background-size: contain; 
    img {
      height: auto;
      max-width: 100%;
    }
  }
  [role=button] a{
    color:white!important;
  }
  .audit_image{
    position:fixed;
    bottom:15px;
    right:20px;
    z-index:999;
    width:250px;
  }
`

export default GlobalStyle
