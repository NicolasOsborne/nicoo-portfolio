'use client'

import { useBootSequence } from '@/hooks/useBootSequence'
import { FC } from 'react'
import Desktop from '../pages/Desktop'
import SpecsScreen from '../pages/SpecsScreen'
import SystemConfigScreen from '../pages/SystemConfigScreen'
import LogoScreen from '../pages/LogoScreen'
import LoginScreen from '../pages/LoginScreen'

const WinXP: FC = () => {
  const { current, advance } = useBootSequence('winXP')

  const componentsClass = 't_WinXP'

  switch (current.step) {
    case 'specs':
      return (
        <SpecsScreen
          additionalClass={componentsClass}
          osId='winXP'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'systemconfig':
      return (
        <SystemConfigScreen
          additionalClass={componentsClass}
          osId='winXP'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'logo':
      return (
        <LogoScreen
          additionalClass={componentsClass}
          osId='winXP'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'login':
      return (
        <LoginScreen
          additionalClass={componentsClass}
          osId='winXP'
          onComplete={advance}
        />
      )
    case 'desktop':
      return <Desktop additionalClass={componentsClass} osId='winXP' />
    default:
      return null
  }
}

export default WinXP
