import React from 'react'
import { Box, Flex, Text, useMatchBreakpoints } from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'

// TIMELINE
const TimelineContainer = styled(Flex)`
  height: 360px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
    padding: 0 21px;
  }
  flex-direction: row-reverse;
  margin: 54px 0 105px;
  ${Text} {
    font-size: 14px;
    font-weight: 700;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 18px;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
`
const TimelineTrack = styled(Box)`
  background: white;
  position: relative;
  width: 4px;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    height: 4px;
  }
`
const TimelineProgress = styled.div<{ progress: string }>`
  background: #d953e9;
  height: ${({ progress }) => `${progress}`};
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: ${({ progress }) => `${progress}`};
    height: 100%;
  }
`
const TimelineStep = styled.div`
  height: 6px;
  width: 18px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 6px;
    height: 18px;
  }
  position: absolute;
  transform: translateY(-50%);
  background: white;
  border-radius: 6px;
  &:first-child {
    background: #d953e9;
    top: 0;
    ${({ theme }) => theme.mediaQueries.sm} {
      left: 0;
    }
  }
  &:nth-child(2) {
    background: #d953e9;
    top: calc(100% / 3);
    ${({ theme }) => theme.mediaQueries.sm} {
      left: calc(100% / 3);
    }
  }
  &:nth-child(3) {
    top: calc(2 / 3 * 100%) ;
    ${({ theme }) => theme.mediaQueries.sm} {
      left: calc(2 / 3 * 100%) ;
    }
  }
  &:nth-child(4) {
    top: 100%;
    ${({ theme }) => theme.mediaQueries.sm} {
      left: 100%;
    }
  }
`

export const Timeline = () => {
  const { isMobile } = useMatchBreakpoints()

  const getCurrentQuarter = () => {
    const today = new Date()
    if (today > new Date('2022-01-01') && today < new Date('2022-04-01')) {
      return `${100 / 3}%`
    }
    if (today > new Date('2022-04-01') && today < new Date('2022-07-01')) {
      return `${(2 / 3) * 100}%`
    }
    if (today > new Date('2022-07-01') && today < new Date('2022-10-01')) {
      return '100%'
    }
    return '0%'
  }
  const currentQuarter = getCurrentQuarter()

  return (
    <TimelineContainer>
      <Flex
        width="100%"
        position="relative"
        flexDirection={isMobile ? 'column' : 'row'}
        ml={isMobile ? '18px' : '0'}
        mb={isMobile ? '0' : '20px'}
      >
        <Text
          maxWidth="137px"
          maxHeight="fit-content"
          style={{
            color: 'white',
            transform: isMobile ? 'translate(0, -50%)' : null,
            position: 'absolute',
            left: '0',
            bottom: '0',
            top: isMobile ? '0' : null,
          }}
        >
          2021 Q4
          {isMobile ? <Text>Beta Test Huski Finance</Text> : null}
        </Text>
        <Text
          maxWidth="137px"
          maxHeight="fit-content"
          style={{
            color: 'white',
            transform: isMobile ? 'translate(0, -50%)' : 'translate(-50%)',
            position: 'absolute',
            left: isMobile ? '0' : 'calc(100% / 3)',
            bottom: '0',
            top: isMobile ? 'calc(100% / 3)' : null,
          }}
        >
          2022 Q1
          {isMobile ? <Text>DAO Launching Campaing</Text> : null}
        </Text>
        <Text
          maxWidth="137px"
          maxHeight="fit-content"
          style={{
            color: 'white',
            transform: isMobile ? 'translate(0, -50%)' : 'translate(-50%)',
            position: 'absolute',
            left: isMobile ? '0' : 'calc(2 / 3 * 100%)',
            bottom: '0',
            top: isMobile ? 'calc(2 / 3 * 100%)' : null,
          }}
        >
          2022 Q2
          {isMobile ? <Text>DAO Launch</Text> : null}
        </Text>
        <Text
          maxWidth="137px"
          maxHeight="fit-content"
          style={{
            color: 'white',
            transform: isMobile ? 'translate(0, 50%)' : null,
            position: 'absolute',
            right: isMobile ? null : '0',
            left: isMobile ? '0' : null,
            bottom: '0',
          }}
        >
          2022 Q3
          {isMobile ? <Text>Fair Launch Huski Finance</Text> : null}
        </Text>
      </Flex>
      <TimelineTrack>
        <TimelineStep />
        <TimelineStep />
        <TimelineStep />
        <TimelineStep />
        <TimelineProgress progress={currentQuarter} />
      </TimelineTrack>
      {isMobile ? null : (
        <Flex width="100%" position="relative" mt="17px">
          <Text
            maxWidth="137px"
            maxHeight="fit-content"
            style={{
              color: 'white',
              // transform: 'translate(-50%)',
              position: 'absolute',
              left: '0',
              top: '0',
            }}
          >
            Beta Test Huski Finance
          </Text>
          <Text
            maxWidth="137px"
            maxHeight="fit-content"
            style={{
              color: 'white',
              transform: 'translate(-50%)',
              position: 'absolute',
              left: 'calc(100% / 3)',
              top: '0',
            }}
          >
            DAO Launching Campaign
          </Text>
          <Text
            maxWidth="137px"
            maxHeight="fit-content"
            style={{
              color: 'white',
              transform: 'translate(-50%)',
              position: 'absolute',
              left: 'calc(2 / 3 * 100%)',
              top: '0',
            }}
          >
            DAO Launch
          </Text>
          <Text
            maxWidth="137px"
            maxHeight="fit-content"
            textAlign="right"
            style={{
              color: 'white',
              // transform: 'translate(-50%)',
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          >
            Fair Launch Huski Finance
          </Text>
        </Flex>
      )}
    </TimelineContainer>
  )
}
