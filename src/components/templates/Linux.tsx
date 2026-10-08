'use client'

import { useBootSequence } from '@/hooks/useBootSequence'
import { FC } from 'react'
import Desktop from '../pages/Desktop'
import SpecsScreen from '../pages/SpecsScreen'
import SystemConfigScreen from '../pages/SystemConfigScreen'
import LogoScreen from '../pages/LogoScreen'
import LoginScreen from '../pages/LoginScreen'

const Linux: FC = () => {
  const { current, advance } = useBootSequence('linux')

  const componentsClass = 't_Linux'

  switch (current.step) {
    case 'specs':
      return (
        <SpecsScreen
          additionalClass={componentsClass}
          osId='linux'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'systemconfig':
      return (
        <SystemConfigScreen
          additionalClass={componentsClass}
          osId='linux'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'logo':
      return (
        <LogoScreen
          additionalClass={componentsClass}
          osId='linux'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'login':
      return (
        <LoginScreen
          additionalClass={componentsClass}
          osId='linux'
          onComplete={advance}
        />
      )
    case 'desktop':
      return <Desktop additionalClass={componentsClass} osId='linux' />
    default:
      return null
  }
}

export default Linux
