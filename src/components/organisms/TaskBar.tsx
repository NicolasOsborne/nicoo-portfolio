'use client'

import { FC, useState } from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'
import LocaleSwitch from '../atoms/LocaleSwitch'
import Clock from '../atoms/Clock'
import Menu from '../molecules/Menu'
import { useContent } from '@/context/ContentContext'
import { useAuth } from '@/context/AuthContext'
import { useWindows } from '@/context/WindowContext'
import TaskList from '../molecules/TaskList'
import DesktopIcon from '@/enums/DesktopIcon'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'

const TaskBar: FC = () => {
  const { content, locale } = useContent()
  const { logout } = useAuth()
  const { openWindow, resetWindows } = useWindows()
  const { osId } = useTheme()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const componentsClass = 'o_TaskBar'

  return (
    <div className={componentsClass}>
      <Button
        type='button'
        disabled={false}
        className={`${componentsClass}_start`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image
          src={DesktopIcon.START}
          alt={content.desktop.menu.title}
          width={20}
          height={20}
          draggable={false}
        />
        {content.desktop.menu.title}
      </Button>

      {isMenuOpen && (
        <Menu
          entries={content.desktop.menu.list}
          logoutLabel={content.desktop.logout}
          osId={osId}
          onLogout={() => {
            setIsMenuOpen(false)
            logout()
            resetWindows()
            router.push(`/${locale}`)
          }}
          onItemClick={(key) => {
            const entry = content.desktop.menu.list.find(
              (e) => e.contentKey === key
            )
            if (entry) openWindow(entry.contentKey, entry.label, entry.icon)
            setIsMenuOpen(false)
          }}
        />
      )}

      <div className={`${componentsClass}_tasks`}>
        <TaskList />
      </div>

      <div className={`${componentsClass}_right`}>
        <LocaleSwitch currentLocale={locale} />
        <Clock />
      </div>
    </div>
  )
}

export default TaskBar
