import React from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  )
}

export default PageLoader
