import { Box, Flex, Button } from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNav = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  max-width: 1058px;
  flex-wrap: wrap;
  row-gap: 10px;
`
export const Header = styled(Box)`
  width: 100%;
`
export const Body = styled(Flex)`
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: center;
  }
`
export const Main = styled(Box)`
  height: 100%;
  margin-bottom: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0px;
    margin-right: 14px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    position: sticky;
    top: 0.75rem;
  }
`
export const Aside = styled(Box)`
  height: 100%;
`
export const Container = styled(Flex)`
  background: linear-gradient(167.86deg, #1d1723 4.99%, #1d1727 92.76%);
  border: 2px solid #282627;
  border-radius: 15px;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
export const Footer = styled(Box)``

export const StyledButton = styled(Button)<{ filled?: boolean }>`
  background: ${({ filled }) => (filled ? 'linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%)' : '#16131e')};
  border: none;
  border-radius: 14px;
  color: #ffffff;
  font-weight: 700;
  box-shadow: none;
  &:disabled,
  &.pancake-button--disabled {
    color: #ffffff;
    background: ${({ filled }) => (filled ? 'linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%)' : '#16131e')};
    border: none;
    filter: grayscale(80%);
  }
`
export const InputContainer = styled(Flex)`
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  padding: 0 10px;
  align-items: center;
  > input {
    background: none;
    border-radius: 0;
    border: none;
    &:disabled {
      background-color: #ffffff;
    }
  }
`
export const Banner = styled(Flex)`
  align-items: center;
  justify-content: center;
  background: #261f30;
  border-radius: 8px;
  width: 100%;
  height: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 202px;
  }
`
export const Separator = styled(Box)`
  width: 100%;
  height: 1px;
  background: #ffffff;
`
export const FoundersWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  row-gap: 10px;
  column-gap: 6px;
  max-height: 150px;
  flex-flow: column wrap;
  max-width: 100%;
  overflow: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: unset;
    flex-flow: row wrap;
  }

  // hide scrollbar on mobile
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
export const FoundersContainer = styled(Flex)`
  width: 170px;
  max-width: 170px;
  height: 60px;
  background: #28273066;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 19px 14px;
  * {
    font-size: 12px;
  }
  img {
    width: 30px;
    height: 30px;
  }
`
export const StyledLink = styled(Link)`
  background: linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%);
  border-radius: 14px;
  color: #ffffff;
  font-weight: 700;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`
