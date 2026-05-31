'use client'

import { FC } from 'react'
import LoginForm from '@/components/organisms/LoginForm'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'

const LoginScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, osId, onComplete } = props

  const componentsClass = 'p_Login'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <LoginForm onComplete={onComplete} />
    </div>
  )
}

export default LoginScreen
