import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import {
  Box,
  Text,
  Flex,
  Input,
  useMatchBreakpoints,
  InfoIcon,
  useTooltip,
  Skeleton,
  AutoRenewIcon,
} from '@huskifinance/huski-frontend-uikit'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL, BIG_ZERO, DEFAULT_GAS_LIMIT, DEFAULT_CODE, CALCULATION_ACCURACY, PRICE_DECIMAL } from 'utils/config'
import { ethers } from 'ethers'
import { useVault, useERC20 } from 'hooks/useContract'
import { getBalanceAmount, getDecimalAmount } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getAddress } from 'utils/addressHelpers'
import useTokenBalance, { useGetEthBalance } from 'hooks/useTokenBalance'
import { Address } from 'config/constants/types'
import { Dao } from 'state/types'
import {
  ButtonMenuRounded,
  ButtonMenuSquared,
  CustomButtonMenuItemSquared,
  CustomButtonMenuItemRounded,
  ProgressBar,
  Container,
  InputContainer,
  StyledButton,
  Banner,
  ConnectWalletButton,
  StyledLink,
} from './components'
import {
  USDCIcon,
  ETHIcon,
  USDTIcon,
  DaoNft,
  DaoVerification,
  LaughingHuski,
  ClipboardIcon,
  Trophy10,
  Trophy100,
  TrophyOthers,
  HuskiGoggles,
  DaoToken,
  GiftIcon,
} from './assets'
import { FUNDING_AMOUNT_TARGET, FUNDING_PERIOD_TARGET, Links } from './config'
import { useHover, useCopyToClipboard, useTimeRemaining } from './helpers'

interface Props {
  data: Dao[]
}

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -38px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: #261f30;
  color: #ffffff;
  border-radius: 16px;
  width: 100px;
`
const StyledTooltip = styled(Container) <{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 20px 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 412px;
    padding: 30px 21px;
    left: 0;
    transform: none;
  }
  ${Text} {
    font-size: 12px;
    &.styledText {
      background: linear-gradient(90deg, #5956e3 4.55%, #d953e9 60.72%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.03em;
    }
  }
  z-index: 10;
`
const CustomTooltip: React.FC<{
  invitedByUser: string
  invitationReward: string
  isHovering: boolean
  leaderboardSpot: string
  bonus: number
}> = ({ invitationReward, invitedByUser, isHovering, leaderboardSpot, bonus }) => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <StyledTooltip isTooltipDisplayed={isHovering}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box style={{ flex: '1' }}>
          <Text textAlign="center" mb="8px" fontSize="16px !important" fontWeight="700 !important">
            Invited
          </Text>
          <Text textAlign="center" fontSize="24px !important" lineHeight="38px">
            {invitedByUser}
          </Text>
          <Text textAlign="center" fontSize="10px !important">
            {`(${bonus}% Bonus)`}
          </Text>
        </Box>
        <Box background="#C4C4C4" height="60px" width="1px" mx={isMobile ? '50px' : '0'} />
        <Box style={{ flex: '1' }}>
          <Text textAlign="center" mb="8px" fontSize="16px !important" fontWeight="700 !important">
            Rewards{' '}
            <Text as="span" fontSize="12px !important" fontWeight="700 !important">
              (HUSKI)
            </Text>
          </Text>
          <Text textAlign="center" fontSize="24px !important" lineHeight="38px" mb={leaderboardSpot ? null : '15px'}>
            {invitationReward}
          </Text>
          {leaderboardSpot ? (
            <Text textAlign="center" fontSize="10px !important">
              {leaderboardSpot}
            </Text>
          ) : null}
        </Box>
      </Flex>
      <Box mt="27px">
        <Text mb="24px" fontSize="14px !important" fontWeight="900 !important" className="styledText">
          Share the referral link with your friends, and you will receive bonus rewards based on their contribution
        </Text>
        <Box mb="15px">
          <Flex alignItems="center">
            <img src={Trophy10} width="23px" alt="prize trophy" />
            <Text>Top 10:</Text>
          </Flex>
          <Text pl="23px">
            An NFT as our Huski DAO Ambassador
            <br />
            Earn bonus reward by Airdrop(10% Bonus)
          </Text>
        </Box>
        <Box mb="15px">
          <Flex alignItems="center">
            <img src={Trophy100} width="23px" alt="prize trophy" />
            <Text>Top 100:</Text>
          </Flex>
          <Text pl="23px">Earn bonus reward by Airdrop(4% Bonus)</Text>
        </Box>
        <Box>
          <Flex alignItems="center">
            <img src={TrophyOthers} width="16px" alt="prize trophy" />
            <Text ml="7px">Others:</Text>
          </Flex>
          <Text pl="23px">Earn bonus reward by Airdrop(2% Bonus)</Text>
        </Box>
      </Box>
      <Flex alignItems="center" mt="28px" style={{ gap: '13px' }}>
        <InfoIcon color="#777373" />
        <Text color="#777373 !important" fontSize="10px !important">
          The ranking is sorted according to the investment amount, and the rewards will follow the ranking changes.
        </Text>
      </Flex>
    </StyledTooltip>
  )
}

const MainContent: React.FC<Props> = ({ data }) => {
  const [selectedToken, setSelectedToken] = useState<string>('ETH')
  const [tokenButtonIndex, setTokenButtonIndex] = useState<number>(0)
  const [amountButtonIndex, setAmountButtonIndex] = useState<number>(null)
  const [amountInToken, setAmountInToken] = useState<string>('')
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()

  /**
   * pass the name of the current selected token or any other token
   * to get the information other functions need from tha token
   * more values can be added to the return object if needed
   *
   * @param {String} tokenName name of currently selected token
   * @returns {Object} necessary information about that token
   */
  const getSelectedTokenData = (
    tokenName: string,
  ): {
    selTokenPrice: BigNumber
    selTokenDecimalPlaces: number
    selTokenIcon: React.ReactNode
    selToken: Record<string, any>
    selTokenAddress: Address
  } => {
    const selToken = data.find((d) => d.name === tokenName)
    const selTokenPrice = selToken ? new BigNumber(selToken.price).div(PRICE_DECIMAL) : BIG_ZERO
    const selTokenDecimalPlaces = selToken ? selToken?.token?.decimalsDigits : 18
    const selTokenIcon = (() => {
      if (selectedToken === 'ETH') {
        return <ETHIcon width="27px" />
      }
      if (selectedToken === 'USDT') {
        return <USDTIcon width="27px" />
      }
      return <USDCIcon width="27px" />
    })()
    const selTokenAddress = selToken?.token?.address

    return { selTokenPrice, selTokenDecimalPlaces, selTokenIcon, selToken, selTokenAddress }
  }

  const { selTokenPrice, selTokenIcon, selToken, selTokenAddress, selTokenDecimalPlaces } =
    getSelectedTokenData(selectedToken)
  const tokenPriceDataNotLoaded = selTokenPrice.isZero() || selTokenPrice.isNaN() || !selTokenPrice

  const convertTokenToUsd = (pAmountInToken: string): BigNumber => {
    BigNumber.config({ DECIMAL_PLACES: selToken.token?.decimals })
    if (!pAmountInToken || tokenPriceDataNotLoaded) {
      return BIG_ZERO
    }
    return new BigNumber(pAmountInToken).times(selTokenPrice)
  }

  const convertUsdToToken = (amountInUSD: string): BigNumber => {
    BigNumber.config({ DECIMAL_PLACES: selToken.token?.decimals })
    let convertedAmount = new BigNumber(amountInUSD).div(selTokenPrice)
    if (!amountInUSD || tokenPriceDataNotLoaded) {
      convertedAmount = BIG_ZERO
    }

    const convertedAmountDeal = new BigNumber(convertedAmount).times(CALCULATION_ACCURACY)
    const convertedAmountCeil = Math.floor(Number(convertedAmountDeal))
    const amount = new BigNumber(convertedAmountCeil).div(CALCULATION_ACCURACY)

    return amount
  }

  const convertUsdToTokenCeil = (amountInUSD: string): BigNumber => {
    BigNumber.config({ DECIMAL_PLACES: 18 })
    let convertedAmount = new BigNumber(amountInUSD).div(selTokenPrice)

    if (!amountInUSD || tokenPriceDataNotLoaded) {
      convertedAmount = BIG_ZERO
    }
    const convertedAmountDeal = new BigNumber(convertedAmount).times(CALCULATION_ACCURACY)
    const convertedAmountCeil = Math.ceil(Number(convertedAmountDeal))
    const amount = new BigNumber(convertedAmountCeil).div(CALCULATION_ACCURACY)

    return amount
  }

  const balance = getBalanceAmount(useTokenBalance(getAddress(selTokenAddress)).balance)
  const ethBalance = getBalanceAmount(useGetEthBalance().balance)
  const userBalance = selToken?.name.toLowerCase() === 'eth' ? ethBalance : balance

  const handleTokenButton = (index) => {
    if (index === 0) {
      setSelectedToken('ETH')
      setTokenButtonIndex(index)
      setAmountInToken('')
      setAmountButtonIndex(null)
    } else if (index === 1) {
      setSelectedToken('USDT')
      setTokenButtonIndex(index)
      setAmountInToken('')
      setAmountButtonIndex(null)
    } else if (index === 2) {
      setSelectedToken('USDC')
      setTokenButtonIndex(index)
      setAmountInToken('')
      setAmountButtonIndex(null)
    }
  }
  const handleAmountButton = (index) => {
    if (index === 0) {
      setAmountInToken(convertUsdToTokenCeil('1000').toString())
      setAmountButtonIndex(index)
    } else if (index === 1) {
      setAmountInToken(convertUsdToToken('10000').toString())
      setAmountButtonIndex(index)
    } else if (index === 2) {
      setAmountInToken(convertUsdToToken('50000').toString())
      setAmountButtonIndex(index)
    }
  }
  const handleInputChange = React.useCallback(
    (event) => {
      if (event.target.value.match(/^[0-9]*[.,]?[0-9]{0,18}$/)) {
        const input = event.target.value
        const finalValue = new BigNumber(input).gt(userBalance) ? userBalance.toString() : input
        setAmountInToken(finalValue)
      } else {
        event.preventDefault()
      }
    },
    [userBalance, setAmountInToken],
  )

  const { timeRemaining } = useTimeRemaining(FUNDING_PERIOD_TARGET)

  const raisedAmount = new BigNumber(data[0].raiseFund).div(DEFAULT_TOKEN_DECIMAL)
  const raisedAmountString = raisedAmount.toNumber().toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const { toastError, toastSuccess, toastInfo, toastWarning } = useToast()
  const tokenAddress = getAddress(selToken?.token.address)
  const approveContract = useERC20(tokenAddress)
  const vaultAddress = getAddress(selToken?.vaultAddress)
  const depositContract = useVault(vaultAddress)
  const { callWithGasPrice } = useCallWithGasPrice()
  const [isApproving, setIsApproving] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleApprove = async () => {
    toastInfo('Approving...', 'Please Wait!')
    setIsApproving(true)
    try {
      const tx = await approveContract.approve(vaultAddress, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess('Approved!', 'Your request has been approved')
      } else {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
    } catch (error: any) {
      toastWarning('Error', error.message)
    } finally {
      setIsApproving(false)
    }
  }

  const handleDeposit = async (depositAmount: string, name: string, roundID, inviterCode) => {
    const callOptions = {
      gasLimit: DEFAULT_GAS_LIMIT,
    }
    const callOptionsETH = {
      gasLimit: DEFAULT_GAS_LIMIT,
      value: depositAmount.toString(),
    }
    setIsPending(true)

    try {
      toastInfo('Transaction Pending...', 'Please Wait!')
      const tx = await callWithGasPrice(
        depositContract,
        'deposit',
        [depositAmount, roundID, inviterCode],
        name === 'ETH' ? callOptionsETH : callOptions,
      )
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess('Successful!', 'Your deposit was successfull')
      }
    } catch (error) {
      console.info('error', error)
      toastError('Unsuccessful', 'Something went wrong your deposit request. Please try again...')
    } finally {
      setIsPending(false)
      setAmountInToken('')
    }
  }

  const handleConfirm = async () => {
    const { allowance, name, roundID, code } = selToken

    if (Number(allowance) === 0) {
      handleApprove()
    } else {
      const url = window.location.href
      const index = url.lastIndexOf('=')
      let inviterCode = DEFAULT_CODE
      if (index !== -1) {
        inviterCode = url.substring(index + 1, url.length)
      }
      if (inviterCode === code) {
        inviterCode = DEFAULT_CODE
      }
      const amountInTokenToNumber = Number(amountInToken)
      let depositAmount
      if (Number.isInteger(amountInTokenToNumber)) {
        depositAmount = ethers.utils.parseEther(amountInToken || '0')
      } else {
        depositAmount = getDecimalAmount(new BigNumber(amountInToken || '0'), 18).toString()
      }

      handleDeposit(depositAmount, name, roundID, inviterCode)
    }
  }

  const referralLink = data[0].code ? `https://dao.huski.finance?code=${data?.[0]?.code}` : null
  const [showReferralLink, setShowReferralLink] = useState<boolean>(false)
  const handleGenerateReferralLink = () => {
    setShowReferralLink(true)
  }

  const poolsWithInvitees = (() => {
    return data.filter((pool) => pool?.invitees?.length)
  })()

  const inviteesAmount = (() => {
    let sum = 0
    poolsWithInvitees.forEach((pool) => {
      sum += pool?.invitees?.length
      return null
    })
    return sum?.toString()
  })()

  const poolsWithInvestors = (() => {
    return data.filter((pool) => pool?.investors?.length)
  })()

  const getUserLeaderboardSpot = (): { text: string; position: number; bonus: number } => {
    // find how many times the same investor code appears in pool with investors
    const leaderboard = {}
    // add each unique investor code into leaderboard and count how many times it appears
    poolsWithInvestors.forEach((pool) => {
      pool.investors
        .filter((investor) => investor.inviterCode !== DEFAULT_CODE)
        .forEach((investor) => {
          if (leaderboard[investor.inviterCode]) {
            leaderboard[investor.inviterCode]++
          } else {
            leaderboard[investor.inviterCode] = 1
          }
          return null
        })
      return null
    })

    // sort leaderboard by count
    const sortedLeaderboard = Object.keys(leaderboard).sort((a, b) => leaderboard[b] - leaderboard[a])
    const position = sortedLeaderboard.indexOf(data[0].code) + 1
    let bonus = 2
    let text = ''
    if (position > 10 && position <= 100) {
      text = '(Top 100)'
      bonus = 4
    }
    if (position > 0 && position <= 10) {
      text = '(Top 10)'
      bonus = 10
    }
    return { text, position, bonus }
  }

  const userLeaderboardSpot = getUserLeaderboardSpot()

  const getRewards = (): BigNumber => {
    let rewardsSum = 0
    poolsWithInvitees?.forEach((pool) => {
      pool?.invitees?.forEach((inv) => {
        rewardsSum += Number(inv?.amount)
        return null
      })
      return null
    })

    const rewards = new BigNumber(rewardsSum).div(DEFAULT_TOKEN_DECIMAL).times(userLeaderboardSpot.bonus / 100)
    return rewards
  }
  const userRewards = getRewards()

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [value, copy] = useCopyToClipboard()
  const [tooltipIsHovering, tooltipHoverProps] = useHover()
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Box p="6px">
      <Text fontSize="14px">Fundraising on ETH</Text>
      <Text fontSize="14px">Distribution on ETH</Text>
      <Text fontSize="14px">Claim HUSKI on BSC</Text>
    </Box>,
    { placement: 'top' },
  )
  const {
    targetRef: targetRef2,
    tooltip: tooltip2,
    tooltipVisible: tooltipVisible2,
  } = useTooltip(
    <Box p="6px">
      <Text fontSize="14px">
        Each person has only one chance to support, and the amount is limited between $1,000 and $50,000
      </Text>
    </Box>,
    { placement: 'top' },
  )

  const [isHoveringConfirm, confirmHoverProps] = useHover()

  const getConfirmBtnText = (() => {
    if (isPending) {
      return 'Processing...'
    }
    if (isApproving) {
      return 'Approving...'
    }
    if (new BigNumber(selToken?.allowance).gt(0)) {
      return 'Confirm'
    }
    return 'Approve & Confirm'
  })()

  const walletReady = () => {
    return (
      <Container mb="13px" p="33px 21px 19px" maxWidth="460px">
        <Flex>
          <LaughingHuski style={{ zIndex: 2, marginRight: '-5px', alignSelf: 'center' }} width="16px" />
          <HuskiGoggles style={{ zIndex: 1 }} width="36px" />
          <LaughingHuski style={{ zIndex: 2, marginLeft: '-8px', alignSelf: 'flex-end' }} width="16px" />
        </Flex>
        <Text textAlign="center" fontSize="24px" fontWeight="800 !important" mb="25px" mt="16px">
          Support Huski DAO
        </Text>
        <ButtonMenuSquared
          onItemClick={handleTokenButton}
          activeIndex={tokenButtonIndex}
        // disabled={data[0]?.investorStatus === true}
        >
          <CustomButtonMenuItemSquared startIcon={<ETHIcon />}>ETH</CustomButtonMenuItemSquared>
          <CustomButtonMenuItemSquared startIcon={<USDTIcon />}>USDT</CustomButtonMenuItemSquared>
          <CustomButtonMenuItemSquared startIcon={<USDCIcon />}>USDC</CustomButtonMenuItemSquared>
        </ButtonMenuSquared>

        <Box my="25px" width="100%">
          <Text ml="auto" fontSize="12px" textAlign="right" color="#8B8787 !important" fontFamily={`'Baloo Bhai 2'`}>
            Balance:{' '}
            <Text as="span" fontSize="14px" fontFamily={`'Baloo Bhai 2'`}>
              {`${userBalance.toFixed(selTokenDecimalPlaces, 1)} ${selToken.name}`}
            </Text>
          </Text>
          <InputContainer>
            <Box>{selTokenIcon}</Box>
            <Input
              placeholder="0.00"
              value={amountInToken}
              onChange={handleInputChange}
              pattern="^[0-9]*[.,]?[0-9]{0,18}$"
              disabled={tokenPriceDataNotLoaded || data[0]?.investorStatus === true}
              style={{ fontSize: '18px' }}
            />
            <Text color="#00000082 !important" fontSize="14px" fontFamily={`'Baloo Bhai 2'`}>{`≈${Number(
              convertTokenToUsd(amountInToken || '0'),
            )?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}USD`}</Text>
          </InputContainer>
        </Box>
        <ButtonMenuRounded
          onItemClick={handleAmountButton}
          activeIndex={amountButtonIndex}
          disabled={tokenPriceDataNotLoaded || data[0]?.investorStatus === true}
        >
          <CustomButtonMenuItemRounded>$1,000</CustomButtonMenuItemRounded>
          <CustomButtonMenuItemRounded>$10,000</CustomButtonMenuItemRounded>
          <CustomButtonMenuItemRounded endIcon={<img src={GiftIcon} alt="" width="17px" />}>
            $50,000
          </CustomButtonMenuItemRounded>
        </ButtonMenuRounded>
        {amountInToken && convertTokenToUsd(amountInToken).lt(1000) ? (
          <Text color="red !important" fontSize="12px" mt="10px">
            Minimum investment amount is $1,000 (One Thousand USD)
          </Text>
        ) : null}
        {amountInToken && convertTokenToUsd(amountInToken).gt(50000) ? (
          <Text color="red !important" fontSize="12px" mt="10px">
            You cannot invest more than $50,000 (Fifty Thousand USD)
          </Text>
        ) : null}
        {data[0]?.investorStatus === true ? (
          <Text fontSize="12px" mt="10px">
            Thank you for your support.
            <br />
            Please claim rewards when campaign closes.
          </Text>
        ) : null}
        <Box mx="auto" width="fit-content" mt="38px" mb="19px">
          {data[0]?.investorStatus === true ? (
            <StyledLink
              to={Links.joinDao}
              onClick={(e) => e.preventDefault()} /* preventDefault bc this link is empty TODO: change later */
              {...confirmHoverProps}
              style={{ padding: '10px', cursor: 'not-allowed', opacity: isHoveringConfirm && '0.8' }}
            >
              {isHoveringConfirm ? `Coming Soon` : `Join our DAO`}
            </StyledLink>
          ) : (
            <StyledButton
              filled
              onClick={handleConfirm}
              disabled={
                new BigNumber(convertTokenToUsd(amountInToken)).lt(1000) ||
                amountInToken === undefined ||
                new BigNumber(convertTokenToUsd(amountInToken)).gt(50000) ||
                new BigNumber(amountInToken).gt(userBalance)
              }
              isLoading={isPending || isApproving}
              endIcon={isPending || isApproving ? <AutoRenewIcon spin color="white" /> : null}
            >
              {getConfirmBtnText}
            </StyledButton>
          )}
        </Box>
        <Box width="100%">
          <Flex
            alignItems="center"
            {...tooltipHoverProps}
            style={{ position: 'relative', cursor: 'pointer' }}
            width="fit-content"
          >
            <Text fontSize="14px" mr="5px">
              Referral Link:
            </Text>
            <InfoIcon color="#ffffff" width="14px" />
            <CustomTooltip
              isHovering={!!tooltipIsHovering}
              invitedByUser={inviteesAmount}
              invitationReward={userRewards.toFixed(0)}
              leaderboardSpot={userLeaderboardSpot.text}
              bonus={userLeaderboardSpot.bonus}
            />
          </Flex>
          <Flex>
            <Flex
              background="#261F30"
              borderRadius="8px"
              height="40px"
              alignItems="center"
              justifyContent="center"
              p="10px 10px"
              width="90%"
              maxWidth="333px"
              mr="7px"
            >
              {showReferralLink ? (
                <Text
                  onClick={() => copy(referralLink).then(displayTooltip)}
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  fontSize="12px"
                  width="100%"
                >
                  {referralLink}
                </Text>
              ) : (
                <Text fontSize="14px">Share your link to earn bonus rewards</Text>
              )}
            </Flex>
            {showReferralLink ? (
              <>
                <button
                  type="button"
                  onClick={() => copy(referralLink).then(displayTooltip)}
                  style={{
                    background: 'none',
                    height: '40px',
                    boxShadow: 'none',
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '0 auto',
                  }}
                >
                  <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied!</Tooltip>
                  <ClipboardIcon color="#ffffff" />
                </button>
              </>
            ) : (
              <StyledButton
                filled
                width="78px"
                height="40px"
                onClick={handleGenerateReferralLink}
                disabled={!referralLink}
              >
                <Text fontSize="12px">Generate</Text>
              </StyledButton>
            )}
          </Flex>
        </Box>
      </Container>
    )
  }
  const walletNotReady = () => {
    return (
      <Container mb="13px" p="33px 21px 19px" maxWidth="460px">
        <Flex>
          <LaughingHuski style={{ zIndex: 2, marginRight: '-5px', alignSelf: 'center' }} width="16px" />
          <HuskiGoggles style={{ zIndex: 1 }} width="36px" />
          <LaughingHuski style={{ zIndex: 2, marginLeft: '-8px', alignSelf: 'flex-end' }} width="16px" />
        </Flex>
        <Text textAlign="center" fontSize="24px" fontWeight="800 !important" mb="25px" mt="16px">
          Support Huski DAO
        </Text>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Token:
          </Text>
          <Text fontSize="14px" textAlign="right">
            Huski DAO (HIDAO)
          </Text>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Type:
          </Text>
          <Flex alignItems="center" style={{ gap: '5px' }}>
            <Text fontSize="14px" textAlign="right">
              ERC - 20 (Ethereum)
            </Text>
            {tooltipVisible && tooltip}
            <span ref={targetRef}>
              <InfoIcon color="#ffffff" width="12px" />
            </span>
          </Flex>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            You will get:
          </Text>
          <Flex alignItems="center" style={{ gap: '5px' }}>
            <Text fontSize="14px" textAlign="right">
              2 HIDAO per $1000
            </Text>
            {tooltipVisible2 && tooltip2}
            <span ref={targetRef2}>
              <InfoIcon color="#ffffff" width="12px" />
            </span>
          </Flex>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Total Rewards:
          </Text>
          <Text fontSize="14px" textAlign="right">
            10,000 HIDAO
          </Text>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Goal:
          </Text>
          <Text fontSize="14px" textAlign="right">
            {FUNDING_AMOUNT_TARGET.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{' '}
            ~ $5,000,000
          </Text>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Distribution：
          </Text>
          <Text fontSize="14px" textAlign="right">
            Claim on HuskiDAO Landing Page
          </Text>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="25px">
          <Text fontSize="14px" textAlign="left">
            Accepted Payments:
          </Text>
          <Flex flexWrap="wrap" alignItems="center" justifyContent="space-between" maxWidth={230} width="100%">
            <Flex alignItems="center">
              <ETHIcon width="24px" height="24px" />
              <Text fontSize="14px" ml="5px">
                ETH
              </Text>
            </Flex>
            <Flex alignItems="center">
              <USDTIcon width="24px" height="24px" />
              <Text fontSize="14px" ml="5px">
                USDT
              </Text>
            </Flex>
            <Flex alignItems="center">
              <USDCIcon width="24px" height="24px" />
              <Text fontSize="14px" ml="5px">
                USDC
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="14px" textAlign="left">
            Deadline:
          </Text>
          <Text fontSize="14px" textAlign="right">
            March 31, 2022 (UTC)
          </Text>
        </Flex>

        <Box mx="auto" width="fit-content" mt="23px">
          <ConnectWalletButton />
        </Box>
      </Container>
    )
  }

  const getFirstContainer = () => {
    if (account) {
      return walletReady()
    }
    return walletNotReady()
  }

  return (
    <Box>
      {getFirstContainer()}

      <Container mb="13px" p="31px 21px 24px" maxWidth="460px">
        <Text fontSize="20px" fontWeight="800 !important" mb="27px" textAlign="center">
          You will receive
        </Text>
        <Flex flexDirection={isMobile ? 'column' : 'row'} width="100%">
          <Banner mr={isMobile ? '0' : '15px'} mb={isMobile ? '15px' : '0'}>
            <DaoToken />
            <Text fontSize="14px">Huski DAO Token</Text>
          </Banner>
          <Banner>
            <DaoVerification />
            <Text fontSize="14px" ml="10px">
              DAO Verification
            </Text>
          </Banner>
        </Flex>
        {new BigNumber(convertTokenToUsd(amountInToken).toFixed(0)).gte(50000) ? (
          <Banner mt="15px" maxWidth="100% !important">
            <DaoNft />
            <Text fontSize="14px" ml="10px">
              NFT co-branded sponsors{' '}
            </Text>
          </Banner>
        ) : null}
      </Container>

      <Container p="40px 21px 30px" maxWidth="460px">
        <Text fontSize="20px" fontWeight="800 !important" mb="42px" textAlign="center">
          More rewards after Protocols Fair Launch
        </Text>
        <Banner mx="auto" mb="32px" maxWidth="268px !important">
          <DaoToken />
          <Text fontSize="14px">{account ? convertTokenToUsd(amountInToken).toFixed(2) : null} HUSKI Token</Text>
        </Banner>
        <Box width="100%">
          <Flex justifyContent="space-between" alignItems="center" mb="8px">
            <Text fontSize="14px">{timeRemaining}</Text>
            {raisedAmount && !raisedAmount.isNaN() ? (
              <Text fontSize="14px">
                {new BigNumber(raisedAmount).div(FUNDING_AMOUNT_TARGET).times(100).toFixed(2, 1)}%
              </Text>
            ) : (
              <Skeleton width="3rem" height="14px" />
            )}
          </Flex>
          <ProgressBar currentProgress={new BigNumber(raisedAmount).div(FUNDING_AMOUNT_TARGET).times(100).toString()} />
          {raisedAmount && !raisedAmount.isNaN() ? (
            <Text
              fontSize="14px"
              textAlign="left"
              mt="9px"
            >{`${raisedAmountString} / ${FUNDING_AMOUNT_TARGET.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}</Text>
          ) : (
            <Skeleton width="10rem" height="14px" mt="9px" />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MainContent
