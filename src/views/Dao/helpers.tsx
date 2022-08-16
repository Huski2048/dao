import React, { useState, useEffect, useRef } from 'react'

export const useHover = () => {
  const [hovering, setHovering] = React.useState(false)
  const onHoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  }
  return [hovering, onHoverProps]
}

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}

export const useTimeRemaining = (endTime: string): { timeRemaining: string } => {
  const now = new Date()
  const end = new Date(endTime)
  const diff = end.getTime() - now.getTime()
  const timeLeft = useRef({
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  })

  const { days, hours, minutes, seconds } = timeLeft.current
  let timeRemaining = `Ends in ${days} ${days === 1 ? 'day' : 'days'}`

  useEffect(() => {
    const updateCountdown = setInterval(() => {
      timeLeft.current = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }, 1000)
    return () => {
      clearInterval(updateCountdown)
    }
  })

  if (days === 0 && hours !== 0) {
    timeRemaining = `Ends in ${hours} ${hours === 1 ? 'hour' : 'hours'}`
  }
  if (days === 0 && hours === 0 && minutes !== 0) {
    timeRemaining = `Ends in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }
  if (days === 0 && hours === 0 && minutes === 0) {
    timeRemaining = `Ends in ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
  }
  if (diff <= 0) {
    timeRemaining = 'Ended'
  }

  return { timeRemaining }
}
