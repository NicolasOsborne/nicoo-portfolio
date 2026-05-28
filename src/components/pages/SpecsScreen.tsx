'use client'

import { FC, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'

import BlueMan from '../../../public/assets/images/bios/energy-star-blue-man.png'
import EnergyStar from '../../../public/assets/images/bios/energy-star-logo.png'
import Image from 'next/image'

type SpecLine = {
  id: string
  text: string
  delay: number
}

type BrowserSpecs = {
  platform: string
  cores: number
  memory: string
  language: string
  timezone: string
}

function getSpecs(): BrowserSpecs {
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { effectiveType?: string; downlink?: number }
  }

  const platform = nav.platform
  const cores = nav.hardwareConcurrency ?? 1
  const memory = nav.deviceMemory ? `${nav.deviceMemory * 1024}MB` : '???K'
  const language = nav.language
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return { platform, cores, memory, language, timezone }
}

function generateSpecLines(specs: BrowserSpecs): SpecLine[] {
  return [
    {
      id: 'cpu',
      text: `CPU: ${specs.platform} with ${specs.cores} cores`,
      delay: 950,
    },
    {
      id: 'memory',
      text: `Memory Test : ${specs.memory} OK`,
      delay: 1600,
    },
    { id: 'blank1', text: '', delay: 800 },
    {
      id: 'bios1',
      text: 'Award Plug and Play BIOS Extension v1.0A',
      delay: 1200,
    },
    { id: 'blank2', text: '', delay: 1550 },
    {
      id: 'copyright',
      text: 'Copyright (C) 1992, Nicolas Osborne',
      delay: 1820,
    },
    {
      id: 'ide1',
      text: '  Detecting IDE Primary Master ... None',
      delay: 2000,
    },
    {
      id: 'ide2',
      text: '  Detecting IDE Primary Slave ... None',
      delay: 2200,
    },
    {
      id: 'ide3',
      text: '  Detecting IDE Secondary Master ... None',
      delay: 2420,
    },
    {
      id: 'ide4',
      text: '  Detecting IDE Secondary Slave ... [Press F4 to skip]',
      delay: 2620,
    },
  ]
}

const SpecsScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, duration, onComplete } = props

  const [visibleCount, setVisibleCount] = useState(0)
  const [specs, setSpecs] = useState<BrowserSpecs | null>(null)
  const [lines, setLines] = useState<SpecLine[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const now = new Date()
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const componentsClass = 'p_SpecsScreen'

  useEffect(() => {
    const gathered = getSpecs()
    const built = generateSpecLines(gathered)
    setSpecs(gathered)
    setLines(built)

    built.forEach((line, index) => {
      const t = setTimeout(() => {
        setVisibleCount(index + 1)
      }, line.delay)
      timeoutsRef.current.push(t)
    })

    const completion = setTimeout(onComplete, duration)
    timeoutsRef.current.push(completion)

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <div className={`${componentsClass}_screen`}>
        <div className={`${componentsClass}_header`}>
          <div className={`${componentsClass}_title`}>
            <Image
              src={BlueMan}
              alt='Energy Star Blue Man'
              width={42}
              height={58}
              className={`${componentsClass}_blue-man`}
            />
            <div className={`${componentsClass}_text`}>
              <p className={`${componentsClass}_line`}>
                Award Modular BIOS v4.60PGA, An Energy Star Ally
              </p>
              <p className={`${componentsClass}_line`}>
                Copyright (C) 1992-{now.getFullYear()}, Nicolas Osborne
              </p>
            </div>
          </div>
          <div className={`${componentsClass}_logo`}>
            <Image
              src={EnergyStar}
              alt='Energy Star Logo'
              width={266}
              height={168}
              className={`${componentsClass}_energy-star`}
            />
          </div>
        </div>
        <div className={`${componentsClass}_lines`}>
          {lines.slice(0, visibleCount).map((line) => (
            <p
              key={line.id}
              className={classNames(`${componentsClass}_line`, {
                [`${componentsClass}_line-empty`]: line.text === '',
              })}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
      <div className={`${componentsClass}_footer`}>
        <p className={`${componentsClass}_line`}>
          Press <span className={`${componentsClass}_highlight`}>DEL</span> to
          enter SETUP
        </p>
        <p className={`${componentsClass}_line`}>
          {dateStr} {timeStr} | {specs?.timezone} | {specs?.language}
        </p>
      </div>
    </div>
  )
}

export default SpecsScreen
