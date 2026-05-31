'use client'

import useMediaQuery, { ResponsiveSize } from '@/hooks/useMediaQuery'
import { FC } from 'react'

type SystemConfigDeviceTableProps = {
  title: string
  headers: string[]
  rows: string[][]
}

const SystemConfigDeviceTable: FC<SystemConfigDeviceTableProps> = (props) => {
  const { title, headers, rows } = props

  const isDesktop = useMediaQuery(ResponsiveSize.SCREEN_M_MIN)

  const componentsClass = 'm_SystemConfigDeviceTable'

  return (
    <div className={componentsClass}>
      <p className={`${componentsClass}_title`}>{title}</p>

      {isDesktop ? (
        <table className={`${componentsClass}_table`}>
          <thead>
            <tr className={`${componentsClass}_header`}>
              {headers.map((header) => (
                <th key={header} className={`${componentsClass}_cell`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={`${componentsClass}_row`}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={`${componentsClass}_cell`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={`${componentsClass}_cards`}>
          {rows.map((row, index) => (
            <div key={index} className={`${componentsClass}_card`}>
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className={`${componentsClass}_card-row`}>
                  <span className={`${componentsClass}_card-label`}>
                    {headers[cellIndex]}
                  </span>
                  <span className={`${componentsClass}_card-value`}>
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SystemConfigDeviceTable
