import React from 'react'
import { Svg, SvgProps } from '@huskifinance/huski-frontend-uikit'

const DropdownArrow: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="12" height="7" viewBox="0 0 12 7" fill="none" {...props}>
      <path d="M11 1L6 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export default DropdownArrow
