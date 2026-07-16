import { FC } from 'react'
import Image from 'next/image'
import MenuItem, { MenuEntry } from '../atoms/MenuItem'
import DesktopIcon from '@/enums/DesktopIcon'
import { OsId } from '@/enums/OsId'
import { osConfigs } from '@/config/osThemes'

export type MenuProps = {
  entries: MenuEntry[]
  logoutLabel: string
  osId: OsId
  onItemClick?: (contentKey: string) => void
  onLogout?: () => void
}

const Menu: FC<MenuProps> = (props) => {
  const { entries, logoutLabel, osId, onItemClick, onLogout } = props

  const componentClass = 'm_Menu'
  const childClass = 'a_MenuItem'

  const osLabel = osConfigs[osId]?.label || 'Windows 95'

  const [boldPart, ...rest] = osLabel.split(' ')
  const regularPart = rest.join(' ')

  return (
    <div className={componentClass}>
      <div className={`${componentClass}_sidebar`}>
        <p className={`${componentClass}_os`}>
          <span>{boldPart}</span>
          {regularPart}
        </p>
      </div>

      <div className={`${componentClass}_list`}>
        {entries.map((entry) => (
          <MenuItem key={entry.id} entry={entry} onClick={onItemClick} />
        ))}
        <button
          className={`${childClass} ${childClass}_logout`}
          onClick={onLogout}
        >
          <Image
            src={DesktopIcon.SHUTDOWN}
            alt={logoutLabel}
            width={32}
            height={32}
          />
          <span className={`${childClass}_label`}>{logoutLabel}</span>
        </button>
      </div>
    </div>
  )
}

export default Menu