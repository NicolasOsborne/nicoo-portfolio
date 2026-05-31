'use client'

import { useMemo } from 'react'
import { systemConfigContent } from '@/config/bootContent'

export type ResolvedRow = {
  label: string
  value: string
}

export type ResolvedSection = {
  rows: ResolvedRow[]
}

export type ResolvedSystemConfig = {
  title: string
  leftSections: ResolvedSection[]
  rightSections: ResolvedSection[]
  deviceTableTitle: string
  deviceTableHeaders: string[]
  deviceTableRows: string[][]
  startingMessage: string
}

function resolveBrowserValues(): Record<string, string> {
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { effectiveType?: string; downlink?: number }
  }

  const cores = nav.hardwareConcurrency ?? 1
  const memory = nav.deviceMemory ? nav.deviceMemory * 1024 : 262144
  const resolution = `${screen.width}x${screen.height}`
  const depth = screen.colorDepth
  const ratio = window.devicePixelRatio ?? 1

  const performanceMemory = (
    performance as Performance & {
      memory?: { usedJSHeapSize: number }
    }
  ).memory

  return {
    cpuType: `${nav.platform ?? 'x86'} at ${cores} core${cores > 1 ? 's' : ''}`,
    coProcessor: cores > 1 ? 'Installed' : 'None',
    cpuClock: `${cores * 400}MHz`,
    extMemory: `${memory}K`,
    cacheMemory: performanceMemory
      ? `${Math.round(performanceMemory.usedJSHeapSize / 1024)}K`
      : 'None',
    displayType: `${resolution} ${depth}bpp`,
    serialPorts: nav.language ?? 'None',
    sdram: `0 ${Array.from({ length: cores }, (_, i) => i).join(' ')}`,
    l2cache: ratio > 1 ? `${ratio}x DPI` : 'None',
  }
}

export function useSystemConfigRows(osId: string): ResolvedSystemConfig | null {
  return useMemo(() => {
    const config = systemConfigContent[osId]
    if (!config) return null

    const browserValues = resolveBrowserValues()

    const resolve = (sections: typeof config.sections): ResolvedSection[] =>
      sections.map((section) => ({
        rows: section.rows.map((row) => ({
          label: row.label,
          value: row.key
            ? (browserValues[row.key] ?? 'None')
            : (row.value ?? 'None'),
        })),
      }))

    const mid = Math.ceil(config.sections.length / 2)
    const leftSections = resolve(config.sections.slice(0, mid))
    const rightSections = resolve(config.sections.slice(mid))

    return {
      title: config.title,
      leftSections,
      rightSections,
      deviceTableTitle: config.deviceTableTitle,
      deviceTableHeaders: config.deviceTableHeaders,
      deviceTableRows: config.deviceTableRows,
      startingMessage: config.startingMessage,
    }
  }, [osId])
}
