'use client'

import { FC } from 'react'

const BiosScreen: FC = () => {
  const componentsClass = '.t_BiosScreen'

  return (
    <main className={componentsClass}>
      <div className={`${componentsClass}_content`}>
        <h1>BIOS</h1>
      </div>
    </main>
  )
}

export default BiosScreen
