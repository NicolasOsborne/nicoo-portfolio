'use client'

import { FC } from 'react'

const Linux: FC = () => {
  const componentsClass = '.t_Linux'

  return (
    <main className={componentsClass}>
      <div className={`${componentsClass}_content`}>
        <h1>Linux</h1>
      </div>
    </main>
  )
}

export default Linux
