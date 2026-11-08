'use client'

import { FC } from 'react'
import ControlType from '@/enums/ControlType'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'

export type ControlProps = {
  type: ControlType
  onClick?: () => void
}

const Control: FC<ControlProps> = ({ type, onClick }) => {
  const { theme } = useTheme()

  return (
    <button
      type='button'
      className={`a_Control a_Control_${type}`}
      onClick={onClick}
      aria-label={type}
    >
      <Image
        src={`${theme.assetPath}/icons/controls/${type}.svg`}
        alt=''
        width={13}
        height={13}
        className='a_Control_icon'
        draggable={false}
      />
    </button>
  )
}

export default Control
