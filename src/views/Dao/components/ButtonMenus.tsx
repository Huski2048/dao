import React, { ComponentProps, ElementType, ReactElement } from 'react'
import {
  Button,
  ButtonMenu as UikitButtonMenu,
  ButtonMenuItemProps,
  BaseButtonProps,
} from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'

// Button group
// Re-doing these buttons because styling from uikit is different from what's on the desigin
export const ButtonMenuRounded = styled(UikitButtonMenu)`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  background: #312b39;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
export const ButtonMenuItemRounded = styled(Button)`
  background: #1d1725;
  color: #d953e9;
  max-width: calc(100% / 3);
  font-size: 14px;
  padding: 0;
  box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px rgba(0, 0, 0, 0.04), inset 0px -1px 0px #534960 !important;
`
export const ButtonMenuSquared = styled(UikitButtonMenu)`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  background: none;
  border-radius: 0;
  padding: 0;
  // hide scrollbar on mobile
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

export const ButtonMenuItemSquared = styled(Button)`
  background: #261f30;
  border-radius: 0;
  box-shadow: none !important;
  border-bottom: 2px solid #d953e9;
  max-width: calc(100% / 3);
  font-size: 14px;
  padding: 0;
  svg {
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 27px;
    }
  }
`

/**
 * @see https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 */
export type AsProps<E extends ElementType = ElementType> = {
  as?: E
}

export type MergeProps<E extends ElementType> = AsProps<E> & Omit<ComponentProps<E>, keyof AsProps>

export type PolymorphicComponentProps<E extends ElementType, P> = P & MergeProps<E>

export type PolymorphicComponent<P, D extends ElementType = 'button'> = <E extends ElementType = D>(
  props: PolymorphicComponentProps<E, P>,
) => ReactElement | null

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps['as']
}

const InactiveButtonMenuItemSquared: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(
  ButtonMenuItemSquared,
)<InactiveButtonProps>`
  border-bottom: none;
  &:hover:not(:disabled):not(:active) {
    background: #261f30;
  }
`
const InactiveButtonMenuItemRounded: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(
  ButtonMenuItemRounded,
)<InactiveButtonProps>`
  background: none;
  color: #6f767e;
  &:hover:not(:disabled):not(:active) {
    background: #1d1725;
  }
  box-shadow: none !important;
`
export const CustomButtonMenuItemSquared: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = 'primary',
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButtonMenuItemSquared forwardedAs={as} variant={variant} {...props} />
  }

  return <ButtonMenuItemSquared as={as} variant={variant} {...props} />
}

export const CustomButtonMenuItemRounded: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = 'primary',
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButtonMenuItemRounded forwardedAs={as} variant={variant} {...props} />
  }

  return <ButtonMenuItemRounded as={as} variant={variant} {...props} />
}
