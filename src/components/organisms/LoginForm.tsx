'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import Window from '@/components/molecules/Window'
import { useAuth } from '@/context/AuthContext'
import ControlType from '@/enums/ControlType'
import { useContent } from '@/context/ContentContext'
import Image from 'next/image'
import classNames from 'classnames'
import { USER } from '../../../data/users'

export type LoginFormProps = {
  additionalClass?: string
  onComplete: () => void
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { additionalClass, onComplete } = props

  const { login } = useAuth()
  const { content } = useContent()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const componentsClass = 'o_LoginForm'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const success = login(username, password)
    if (success) {
      onComplete()
    } else {
      setError(content.login.errors.error)
    }
  }

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <Window
        title={content.login.title}
        icon={content.login.icon}
        controls={[ControlType.HELP]}
        isFocused={true}
      >
        <div className={`${componentsClass}_window`}>
          <form onSubmit={handleSubmit} className={`${componentsClass}_form`}>
            <div className={`${componentsClass}_content`}>
              <div className={`${componentsClass}_header`}>
                <Image
                  src={content.login.icon}
                  alt={content.login.title}
                  width={42}
                  height={42}
                />
                <p className={`${componentsClass}_title`}>
                  {content.login.prompt}
                </p>
              </div>
              <div className={`${componentsClass}_fields`}>
                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.username}
                  </span>
                  <input
                    type='text'
                    className={`${componentsClass}_input`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                  />
                </label>
                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.password}
                  </span>
                  <input
                    type='password'
                    className={`${componentsClass}_input`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {error && (
                  <p className={`${componentsClass}_message-error`}>{error}</p>
                )}
              </div>
            </div>
            <div className={`${componentsClass}_buttons`}>
              <Button type='submit'>{content.login.ok}</Button>
              <Button
                type='button'
                onClick={() => {
                  setUsername('')
                  setPassword('')
                  setError(null)
                }}
              >
                {content.login.cancel}
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  )
}

export default LoginForm
