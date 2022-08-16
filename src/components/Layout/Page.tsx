import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import Container from './Container'

const StyledPage = styled(Container)`
  display: flex;
  flex-direction: column;
  max-width: none;
  padding: 20px 33px;
`

const PageMeta = () => {
  const { pathname } = useLocation()

  const pageMeta = getCustomMeta(pathname) || {}
  const { title, description } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
