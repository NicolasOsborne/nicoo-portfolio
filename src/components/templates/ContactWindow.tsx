'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import { useContent } from '@/context/ContentContext'

const ContactWindow: FC = () => {
  const { content } = useContent()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const componentsClass = 't_ContactWindow'

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_window`}>
        <form className={`${componentsClass}_form`}>
          <div className={`${componentsClass}_fields`}>
            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.name.label}
              </span>
              <input
                type='text'
                className={`${componentsClass}_input`}
                placeholder={content.contact.name.placeholder}
                disabled={isSubmitting}
              />
            </label>
            {error && (
              <p className={`${componentsClass}_message-error`}>{error}</p>
            )}

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.email.label}
              </span>
              <input
                type='email'
                className={`${componentsClass}_input`}
                placeholder={content.contact.email.placeholder}
                disabled={isSubmitting}
              />
            </label>
            {error && (
              <p className={`${componentsClass}_message-error`}>{error}</p>
            )}

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.message.label}
              </span>
              <textarea
                className={`${componentsClass}_input`}
                placeholder={content.contact.message.placeholder}
                disabled={isSubmitting}
              />
            </label>
            {error && (
              <p className={`${componentsClass}_message-error`}>{error}</p>
            )}
          </div>

          {success && (
            <p className={`${componentsClass}_message-success`}>{success}</p>
          )}
          {error && (
            <p className={`${componentsClass}_message-error`}>{error}</p>
          )}

          <div className={`${componentsClass}_buttons`}>
            <Button type='submit' disabled={isSubmitting}>
              {content.contact.submit}
            </Button>
            <Button
              type='button'
              disabled={isSubmitting}
              onClick={() => {
                setSuccess('')
                setError('')
              }}
            >
              {content.contact.cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactWindow
