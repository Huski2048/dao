import React from 'react'
import { Svg, SvgProps } from '@huskifinance/huski-frontend-uikit'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 27 28" fill="none" {...props}>
      <circle cx="13.5" cy="14.4829" r="13" fill="#617DE0" stroke="#2B49B1" />
      <path d="M13.9975 11.9824V4.83325L7.99609 14.6791L13.9975 11.9824Z" fill="#F7F7F7" />
      <path
        d="M13.9975 18.1872V11.9824L7.99609 14.6791L13.9975 18.1872ZM13.9975 11.9824L20.0001 14.6791L13.9975 4.83325V11.9824Z"
        fill="#BCC7ED"
      />
      <path d="M13.998 11.9824V18.1872L20.0006 14.6792L13.998 11.9824Z" fill="#7E95E5" />
      <path d="M13.9975 19.3105L7.99609 15.8047L13.9975 24.1664V19.3105Z" fill="#F7F7F7" />
      <path d="M20.0039 15.8047L13.998 19.3105V24.1664L20.0039 15.8047Z" fill="#BCC7ED" />
    </Svg>
  )
}
export default Icon
