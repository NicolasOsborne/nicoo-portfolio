import { FC } from 'react'
import { ResolvedSection } from '@/hooks/useSystemConfig'

type SystemConfigTableProps = {
  leftSections: ResolvedSection[]
  rightSections: ResolvedSection[]
}

const SystemConfigTable: FC<SystemConfigTableProps> = (props) => {
  const { leftSections, rightSections } = props

  const componentsClass = 'm_SystemConfigTable'

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_column`}>
        {leftSections.map((section, index) => (
          <div key={index} className={`${componentsClass}_section`}>
            {section.rows.map((row) => (
              <div key={row.label} className={`${componentsClass}_row`}>
                <span className={`${componentsClass}_row-label`}>
                  {row.label}
                </span>
                <span className={`${componentsClass}_row-separator`}>:</span>
                <span className={`${componentsClass}_row-value`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`${componentsClass}_column`}>
        {rightSections.map((section, index) => (
          <div key={index} className={`${componentsClass}_section`}>
            {section.rows.map((row) => (
              <div key={row.label} className={`${componentsClass}_row`}>
                <span className={`${componentsClass}_row-label`}>
                  {row.label}
                </span>
                <span className={`${componentsClass}_row-separator`}>:</span>
                <span className={`${componentsClass}_row-value`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemConfigTable
