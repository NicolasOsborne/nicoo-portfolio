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

    let cursor = 0
    const next = (base: number, variance = 80) => {
      cursor += randomDelay(base, variance)
      return cursor
    }

    return [
      { id: 'bios', text: content.biosLine, delay: next(0) },
      { id: 'copy', text: content.copyright, delay: next(100, 40) },
      { id: 'blank1', text: '', delay: next(200, 60) },
      {
        id: 'cpu',
        text: `CPU: ${platform} at ${cores} Logical Processor(s)`,
        delay: next(350, 100),
      },
      {
        id: 'memory',
        text: 'Memory Test :  ',
        delay: next(500, 80),
        type: 'memory',
        memoryTarget: memoryRaw,
      },
      {
        id: 'lang',
        text: `System Language : ${language}`,
        delay: next(200, 80),
      },
      { id: 'blank2', text: '', delay: next(300, 60) },
      { id: 'plugin', text: content.pluginLine, delay: next(200, 80) },
      ...content.ideLines.map((line, i) => ({
        id: `ide${i}`,
        text: line,
        delay: next(180 + i * 20, 100),
      })),
    ]
  }, [osId])
}
