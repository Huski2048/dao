import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, LogoutIcon, UserMenu as UIKitUserMenu, UserMenuItem } from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'

const StyledUserMenu = styled(UIKitUserMenu)`
  background: #16131e;
  border-radius: 14px;
  color: #fff;
  font-weight: 700;
  box-shadow: none;
  height: 100%;
  max-width: 100%;
  width: 146px;
`

const UserMenu = () => {
  const { account } = useWeb3React()
  const { logout } = useAuth()

  return (
    <StyledUserMenu account={account}>
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          Disconnect
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </StyledUserMenu>
  )
}

export default UserMenu
