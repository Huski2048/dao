import React from 'react'
import { Box, Text, Flex, useMatchBreakpoints } from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'
import { Container as BaseContainer, Separator, Banner, StyledButton } from './components'
import { AragonIcon, CommonwealthIcon, Banner as BannerImg } from './assets'
import { Links } from './config'

const Container = styled(BaseContainer)`
  padding: 22px 21px 20px;
  ${Text} {
    font-size: 16px;
    font-weight: 900;
    max-width: 586px;
    &.title {
      font-size: 20px;
      &--one {
        background: linear-gradient(90.03deg, #5b56e3 5.08%, #d953e9 51.73%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--two {
        background: linear-gradient(90.07deg, #5956e3 1.1%, #c553e8 50.6%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--three {
        background: linear-gradient(90.05deg, #5956e3 5.08%, #d953e9 40.41%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--four {
        background: linear-gradient(90.05deg, #5956e3 5.08%, #d953e9 40.41%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--five {
        background: linear-gradient(90deg, #5456e3 2.35%, #d953e9 77.79%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--six {
        background: linear-gradient(90deg, #5156e3 0%, #d953e9 36.34%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      margin-bottom: 28px;
    }
  }
  > ${Box} {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 46px;
    }
  }
  ul {
    list-style-position: outside;
    padding: 0 21px;
    li {
      line-height: 30px;
    }
  }
  ${StyledButton} {
    font-size: 12px;
    width: fit-content;
    height: fit-content;
    background: #2b2631;
    border: 2px solid #484850;
    padding: 7px 6px;
    border-radius: 8px;
  }
`

const AsideContent = () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmallScreen = isMobile || isTablet
  return (
    <>
      <Container maxWidth={586}>
        <Flex alignItems="flex-end" justifyContent="space-between" mb="0 !important" flexWrap="wrap">
          <Text fontSize="24px !important" fontWeight={900} style={{ alignSelf: 'flex-start' }}>
            What is Huski DAO ?
          </Text>
          <Flex style={{ columnGap: '8px' }}>
            <StyledButton mr="8px" as="a" href={Links.whatIsDao} target="_blank">
              WHAT IS A DAO
            </StyledButton>
            <StyledButton as="a" href={Links.howToDao} target="_blank">
              HOW TO DAO
            </StyledButton>
          </Flex>
        </Flex>
        <Separator mt="21px" mb="26px !important" />
        <Box>
          <Text className="title title--one">Here are Huski DAO&apos;s missions</Text>
          <Text as="ul">
            <Text as="li">Open, free, and fair financial markets.</Text>
            <Text as="li">Optimize earnings, lower risk, higher returns.</Text>
            <Text as="li">Governing the protocol with more fairness, transparency, and democracy.</Text>
            <Text as="li">Expanding the boundaries of crypto funds.</Text>
          </Text>
        </Box>
        <Box>
          <Text className="title title--two">Why be our DAO founders</Text>
          <Text as="ul">
            <Text as="li">Priority to list token pairs.</Text>
            <Text as="li">Discount on the protocol to reduce fees.</Text>
            <Text as="li">Priority to seek support for projects liquidity.</Text>
            <Text as="li">Providing strategies to the protocol and making a profit.</Text>
          </Text>
        </Box>
        <Box maxWidth="544px !important">
          <img src={BannerImg} alt="huski-banner" width="100%" />
        </Box>
        <Box>
          <Text className="title title--three">What are the funds for</Text>
          <Text as="ul">
            <Text as="li">Community building.</Text>
            <Text as="li">Marketing. DAO operation, and DAO management.</Text>
            <Text as="li">Auditing, listing, protocol improvements.</Text>
          </Text>
        </Box>
        <Box>
          <Text className="title title--four">Find us in</Text>
          <Flex alignItems="center" flexWrap="wrap" justifyContent="space-between">
            <Banner maxWidth="260px !important" mb={isSmallScreen ? '10px' : '0'}>
              <AragonIcon />
              <Text ml="9px">Aragon</Text>
            </Banner>
            <Banner maxWidth="260px !important">
              <CommonwealthIcon />
              <Text ml="9px">Commonwealth</Text>
            </Banner>
          </Flex>
        </Box>
        {/*         <Box>
          <Text className="title">What the protocol provides</Text>
          <Text>part of the collected fees as DAO operation cost. part of the tokens to incentive DAO members.</Text>
        </Box> */}
        <Box>
          <Text className="title title--five">Here are what Huski DAO wants</Text>
          <Text as="ul">
            <Text as="li">Funding partners.</Text>
            <Text as="li">Web3 artists.</Text>
            <Text as="li">Marketing partners.</Text>
            <Text as="li">Developers both frontend and smart contract.</Text>
            <Text as="li">Product thinkers.</Text>
            <Text as="li">Community operators.</Text>
          </Text>
        </Box>
        <Box>
          <Text className="title title--six">What we do</Text>
          <Text as="ul">
            <Text as="li">Voting on core parameters.</Text>
            <Text as="li">Voting to improve efficiencies.</Text>
            <Text as="li">Voting to utilize new features.</Text>
            <Text as="li">Voting to list pairs.</Text>
            <Text>...</Text>
          </Text>
        </Box>
      </Container>
    </>
  )
}

export default AsideContent
