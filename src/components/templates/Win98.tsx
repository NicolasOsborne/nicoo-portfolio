'use client'

import { useBootSequence } from '@/hooks/useBootSequence'
import { FC } from 'react'
import Desktop from '../pages/Desktop'
import SpecsScreen from '../pages/SpecsScreen'
import SystemConfigScreen from '../pages/SystemConfigScreen'
import LogoScreen from '../pages/LogoScreen'
import LoginScreen from '../pages/LoginScreen'

const Win98: FC = () => {
  const { current, advance } = useBootSequence('win98')

  const componentsClass = 't_Win98'

  switch (current.step) {
    case 'specs':
      return (
        <SpecsScreen
          additionalClass={componentsClass}
          osId='win98'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'systemconfig':
      return (
        <SystemConfigScreen
          additionalClass={componentsClass}
          osId='win98'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'logo':
      return (
        <LogoScreen
          additionalClass={componentsClass}
          osId='win98'
          duration={current.duration!}
          onComplete={advance}
        />
      )
    case 'login':
      return (
        <LoginScreen
          additionalClass={componentsClass}
          osId='win98'
          onComplete={advance}
        />
      )
    case 'desktop':
      return <Desktop additionalClass={componentsClass} osId='win98' />
    default:
      return null
  }
}

export default Win98
