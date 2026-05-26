'use client'

import { useBootSequence } from '@/hooks/useBootSequence'
import { FC } from 'react'
import Desktop from '../pages/Desktop'
import SpecsScreen from '../pages/SpecsScreen'
import SystemConfigScreen from '../pages/SystemConfigScreen'
import LogoScreen from '../pages/LogoScreen'
import LoginScreen from '../pages/LoginScreen'

const Win95: FC = () => {
  const { current, advance, isLast } = useBootSequence('win95')

  const componentsClass = 't_Win95'

  switch (current.step) {
    case 'specs':
      return (
        <SpecsScreen
          additionalClass={componentsClass}
          osId='win95'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'systemconfig':
      return (
        <SystemConfigScreen
          additionalClass={componentsClass}
          osId='win95'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'logo':
      return (
        <LogoScreen
          additionalClass={componentsClass}
          osId='win95'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'login':
      return (
        <LoginScreen
          additionalClass={componentsClass}
          osId='win95'
          onComplete={advance}
        />
      )
    case 'desktop':
      return (
        <Desktop
          additionalClass={componentsClass}
          osId='win95'
          onComplete={isLast}
        />
      )
    default:
      return null
  }
}

export default Win95
