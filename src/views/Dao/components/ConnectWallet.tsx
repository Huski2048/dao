import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal, useMatchBreakpoints, Box, Text } from '@huskifinance/huski-frontend-uikit'
import useAuth from 'hooks/useAuth'
import UserMenu from 'components/UserMenu'
import { StyledButton } from './styles'

const ConnectWallet = (props) => {
  const { login, logout } = useAuth()
  const hasProvider = !!window.ethereum
  const { onPresentConnectModal } = useWalletModal(login, logout, hasProvider)
  const { account } = useWeb3React()

  const { isMobile } = useMatchBreakpoints()

  if (!account) {
    return (
      <Box
        borderRadius="14px"
        background="linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%)"
        p="1px"
        height="46px"
        maxWidth="100%"
      >
        <StyledButton
          onClick={onPresentConnectModal}
          {...props}
          maxWidth={isMobile ? '100%' : 146}
          height="100%"
          px={isMobile ? '10px !important' : null}
        >
          <Text fontWeight={700} style={{ whiteSpace: 'nowrap' }}>
            Connect Wallet
          </Text>
        </StyledButton>
      </Box>
    )
  }
  return (
    <Box
      borderRadius="14px"
      background="linear-gradient(68.76deg, #5156e3 32.68%, #e253e9 98.95%)"
      p="1px"
      height="46px"
      maxWidth="100%"
    >
      <UserMenu />
    </Box>
  )
}

export default ConnectWallet
