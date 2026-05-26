'use client'

import { FC, useEffect } from 'react'
import { OsId } from '@/enums/OsId'

type WelcomeScreenProps = {
  osId: OsId
  duration: number
  onComplete: () => void
}

const WelcomeScreen: FC<WelcomeScreenProps> = (props) => {
  const { duration, onComplete } = props

  useEffect(() => {
    const timer = setTimeout(onComplete, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const componentsClass = 'p_WelcomeScreen'

  return <div className={componentsClass}>WelcomeScreen — {duration}ms</div>
}

export default WelcomeScreen
