'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import Window from '@/components/molecules/Window'
import { useAuth } from '@/context/AuthContext'
import ControlType from '@/enums/ControlType'
import { useContent } from '@/context/ContentContext'
import Image from 'next/image'

const LoginForm: FC = () => {
  const { login } = useAuth()
  const { content } = useContent()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const componentsClass = 'o_LoginForm'

  return (
    <div className={componentsClass}>
      <Window
        title={content.login.title}
        icon={content.login.icon}
        controls={[ControlType.HELP]}
        isFocused={true}
      >
        <div className={`${componentsClass}_window`}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsSubmitting(true)
              setError(null)
            }}
            className={`${componentsClass}_form`}
          >
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
                    disabled={isSubmitting}
                  />
                </label>
                {error && (
                  <p className={`${componentsClass}_message-error`}>{error}</p>
                )}

                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.password}
                  </span>
                  <input
                    type='password'
                    className={`${componentsClass}_input`}
                    disabled={isSubmitting}
                  />
                </label>
                {error && (
                  <p className={`${componentsClass}_message-error`}>{error}</p>
                )}
              </div>
            </div>

            <div className={`${componentsClass}_buttons`}>
              <Button type='submit' disabled={isSubmitting}>
                {content.login.ok}
              </Button>
              <Button
                type='button'
                disabled={isSubmitting}
                onClick={() => setError(null)}
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
