import React from 'react'
import styled from 'styled-components'

// PROGRESS BAR
const Progress = styled.div<{ currentProgress: string; color: string }>`
  width: ${({ currentProgress }) => `${currentProgress}%`};
  background: ${({ color }) => color};
  height: 100%;
  border-radius: 14px;
`
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: white;
  padding: 2px;
  border-radius: 14px;
`
const ProgressBarRail = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  border-radius: 14px;
`

export const ProgressBar: React.FC<{ currentProgress: string }> = ({ currentProgress }) => {
  const getResettingProgress = () => {
    if (Number(currentProgress) > 500) {
      return 100
    }
    if (Number(currentProgress) > 100) {
      return Number(currentProgress) - Math.floor(Number(currentProgress) / 100) * 100
    }
    return currentProgress
  }
  const getCurrentColor = (): { trackColor: string; containerColor: string } => {
    if (Number(currentProgress) > 100) {
      return { trackColor: '#FF6B00', containerColor: '#9053DB' }
    }

    return { trackColor: '#9053DB', containerColor: '#ffffff' }
  }

  return (
    <ProgressBarContainer>
      <ProgressBarRail color={getCurrentColor().containerColor}>
        <Progress currentProgress={getResettingProgress()?.toString() || '0'} color={getCurrentColor().trackColor} />
      </ProgressBarRail>
    </ProgressBarContainer>
  )
}
