'use client'

import { useMemo } from 'react'
import { OsId } from '@/enums/OsId'
import { specsContent } from '@/config/bootContent'

export type SpecLine = {
  id: string
  text: string
  delay: number
  type?: 'memory' | 'plain'
  memoryTarget?: number
}

function randomDelay(base: number, variance: number): number {
  return base + Math.floor(Math.random() * variance)
}

export function useSpecsLines(osId: OsId): SpecLine[] {
  return useMemo(() => {
    const content = specsContent[osId]

    const nav = navigator as Navigator & {
      deviceMemory?: number
    }
    const platform = nav.platform ?? 'Intel Pentium'
    const cores = nav.hardwareConcurrency ?? '133MHz'
    const memoryRaw = nav.deviceMemory ? nav.deviceMemory * 1024 : 262144
    const language = nav.language ?? 'en-US'

    const nextDelays = [
      [0, 80],
      [100, 40],
      [200, 60],
      [350, 100],
      [500, 80],
      [200, 80],
      [300, 60],
      [200, 80],
      ...content.ideLines.map((_, index) => [180 + index * 20, 100]),
    ].reduce<number[]>((delays, [base, variance]) => {
      const previous = delays[delays.length - 1] ?? 0
      return [...delays, previous + randomDelay(base, variance)]
    }, [])
    let delayIndex = 0
    const next = () => nextDelays[delayIndex++]

    return [
      { id: 'bios', text: content.biosLine, delay: next() },
      { id: 'copy', text: content.copyright, delay: next() },
      { id: 'blank1', text: '', delay: next() },
      {
        id: 'cpu',
        text: `CPU: ${platform} at ${cores} Logical Processor(s)`,
        delay: next(),
      },
      {
        id: 'memory',
        text: 'Memory Test :  ',
        delay: next(),
        type: 'memory',
        memoryTarget: memoryRaw,
      },
      {
        id: 'lang',
        text: `System Language : ${language}`,
        delay: next(),
      },
      { id: 'blank2', text: '', delay: next() },
      { id: 'plugin', text: content.pluginLine, delay: next() },
      ...content.ideLines.map((line, i) => ({
        id: `ide${i}`,
        text: line,
        delay: next(),
      })),
    ]
  }, [osId])
}
