'use client'

import { FC } from 'react'

import { useWindows } from '@/context/WindowContext'
import { useContent } from '@/context/ContentContext'
import WindowContainer from '../organisms/WindowContainer'
import TaskBar from '../organisms/TaskBar'
import DesktopShortcuts from '../molecules/DesktopShortcuts'
import DesktopIcon from '../atoms/DesktopIcon'
import classNames from 'classnames'
import { OsId } from '@/enums/OsId'

export type DesktopProps = {
  additionalClass?: string
  osId: OsId
}

const Desktop: FC<DesktopProps> = (props) => {
  const { additionalClass } = props
  const { openWindows } = useWindows()
  const { content } = useContent()

  const componentsClass = 'p_Desktop'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <div className={`${componentsClass}_background`}>
        {openWindows.map((window) => (
          <WindowContainer key={window.id} windowData={window} />
        ))}
      </div>
      <TaskBar />
      <DesktopShortcuts />
      <DesktopIcon entry={content.desktop.recycle} isRecycle={true} />
    </div>
  )
}

export default Desktop
