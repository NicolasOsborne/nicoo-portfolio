'use client'

import { useState, useCallback } from 'react'
import { bootSequences } from '@/config/bootSequences'
import { OsId } from '@/enums/OsId'

export function useBootSequence(osId: OsId) {
  const sequence = bootSequences[osId]
  const [stepIndex, setStepIndex] = useState(0)

  const advance = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, sequence.length - 1))
  }, [sequence.length])

  const current = sequence[stepIndex]
  const isLast = stepIndex === sequence.length - 1

  return { current, advance, isLast }
}
