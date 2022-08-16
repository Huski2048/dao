import React from 'react'
import { Svg, SvgProps } from '@huskifinance/huski-frontend-uikit'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="26" height="32" viewBox="0 0 26 32" fill="none" {...props}>
      <path
        d="M22 7C22 10.866 18.7744 14 14.7954 14C10.8164 14 12.2525 10.4285 12.2525 6.5625C12.2525 2.69651 10.8164 0 14.7954 0C18.7744 0 22 3.13401 22 7Z"
        fill="url(#paint0_linear_104072_8544)"
      />
      <g filter="url(#filter0_i_104072_8544)">
        <ellipse cx="14" cy="7" rx="6" ry="7" fill="#81B4FF" />
      </g>
      <path
        d="M25.5 28.0485C25.5 34.952 18 29.5 14.5 27.5485C7.87258 27.5485 3 27.5485 3 26.5485C3 18.9092 4 15.5484 13 16.0485C18.9908 16.3814 25.5 20.3401 25.5 28.0485Z"
        fill="url(#paint1_linear_104072_8544)"
      />
      <g filter="url(#filter1_i_104072_8544)">
        <path
          d="M22.5 28.0483C22.5 34.9519 20 27.9062 10.5 28.5C2.5 29 0 29 0 26.5483C0 18.9091 5 16.0483 10 16.0483C16 16.0483 22.5 20.3399 22.5 28.0483Z"
          fill="#81B4FF"
        />
      </g>
      <mask
        id="mask0_104072_8544"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="16"
        width="23"
        height="16"
      >
        <path
          d="M22.5 28.0483C22.5 34.9519 20 27.9062 10.5 28.5C2.5 29 0 29 0 26.5483C0 18.9091 5 16.0483 10 16.0483C16 16.0483 22.5 20.3399 22.5 28.0483Z"
          fill="#81B4FF"
        />
      </mask>
      <g mask="url(#mask0_104072_8544)">
        <path
          d="M13.0755 17.9391L14.9987 16.5L11.4987 16.5L12.075 17.9391L9.99932 25.5L10.5 26.5L11.4995 26.5001L12.9991 25.115L13.0755 17.9391Z"
          fill="#6FA5F4"
        />
        <g filter="url(#filter2_i_104072_8544)">
          <path
            d="M12.9096 17.5207L15.0006 16L10.7778 15.9999L11.8533 17.4389L9.99969 24.5001L10.7778 26.5L12.5 25L12.9096 17.5207Z"
            fill="white"
          />
        </g>
        <path d="M12 29.5L10 24.5L9 25V27L12 29.5Z" fill="url(#paint2_linear_104072_8544)" />
      </g>
      <defs>
        <filter
          id="filter0_i_104072_8544"
          x="8"
          y="0"
          width="12"
          height="14"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_104072_8544" />
        </filter>
        <filter
          id="filter1_i_104072_8544"
          x="0"
          y="16.0483"
          width="22.5"
          height="15.0535"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_104072_8544" />
        </filter>
        <filter
          id="filter2_i_104072_8544"
          x="10"
          y="15.9998"
          width="5.00098"
          height="10.5002"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.435294 0 0 0 0 0.647059 0 0 0 0 0.956863 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_104072_8544" />
        </filter>
        <linearGradient
          id="paint0_linear_104072_8544"
          x1="14.7953"
          y1="0"
          x2="14.7953"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A1C8FF" />
          <stop offset="1" stopColor="#6A8EE6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_104072_8544"
          x1="14.25"
          y1="16.0483"
          x2="14.25"
          y2="31.2518"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9CC3FD" />
          <stop offset="1" stopColor="#6D91E7" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_104072_8544"
          x1="10.5"
          y1="24.5"
          x2="10.5"
          y2="29.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.71976" stopColor="#81B4FF" />
          <stop offset="0.792496" stopColor="#75A4E8" />
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon
