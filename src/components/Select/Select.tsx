import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Text } from '@huskifinance/huski-frontend-uikit'
import DropdownArrow from './DropdownArrow'

const DropDownHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 12px;
  // box-shadow: ${({ theme }) => theme.shadows.inset};
  // border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  background: linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%);
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 120px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #292434;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 120px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  background: linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%);
  border-radius: 16px;
  height: 50px;
  min-width: 120px;
  user-select: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 120px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }
    `}

  svg {
    &:not(.noPos) {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
    fill: none;
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
  // gap: 8px;
  &:hover {
    background: #ffffff1a;
  }
`

export interface SelectProps {
  options: OptionProps[]
  onChange?: (option: OptionProps) => void
}

export interface OptionProps {
  label: string
  value: any
  icon?: React.ReactNode
}

const Select: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onChange) {
      onChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })

    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropDownContainer
      isOpen={isOpen}
      ref={containerRef}
      {...containerSize}
      style={{ cursor: options.length === 1 ? 'not-allowed' : null }}
    >
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={options.length === 1 ? null : toggling}>
          {options[selectedOptionIndex]?.icon}
          <Text ml="11px">{options[selectedOptionIndex].label}</Text>
        </DropDownHeader>
      )}
      {options.length === 1 ? null : <DropdownArrow color="text" onClick={toggling} />}
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                {option?.icon}
                <Text ml="11px">{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
