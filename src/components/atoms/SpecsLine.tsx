'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SpecLine } from '@/hooks/useSpecsLines'

type SpecsLineProps = {
  line: SpecLine
  showCursor: boolean
}

const componentsClass = 'a_SpecsLine'

const SpecsLine: FC<SpecsLineProps> = (props) => {
  const { line, showCursor } = props

  const [memoryDisplay, setMemoryDisplay] = useState(0)
  const [memoryDone, setMemoryDone] = useState(false)

  useEffect(() => {
    if (line.type !== 'memory' || !line.memoryTarget) return

    const target = line.memoryTarget
    const steps = 40
    const duration = 1200
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)))
      setMemoryDisplay(value)
      if (step >= steps) {
        setMemoryDisplay(target)
        setMemoryDone(true)
        clearInterval(interval)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [line.type, line.memoryTarget])

  return (
    <p
      className={classNames(componentsClass, {
        [`${componentsClass}_empty`]: line.text === '',
      })}
    >
      {line.type === 'memory' ? (
        <>
          {line.text}
          <span className={`${componentsClass}_memory`}>
            {memoryDisplay} MB
          </span>
          {memoryDone && <span> OK</span>}
        </>
      ) : (
        line.text
      )}
      {showCursor && (
        <span className={`${componentsClass}_cursor`} aria-hidden='true' />
      )}
    </p>
  )
}

export default SpecsLine
