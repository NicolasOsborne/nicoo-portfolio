import { useCallback, useEffect, useState } from 'react'
import { ResponsiveSize } from '@/enums/ResponsiveSize'

const useMediaQuery = (mediaQuery: ResponsiveSize): boolean => {
  const [target, setTarget] = useState(false)

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    setTarget(e.matches)
  }, [])

  useEffect(() => {
    const media = globalThis.matchMedia(mediaQuery)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(media.matches)

    const mediaListener = (e: MediaQueryListEvent) => updateTarget(e)

    media.addEventListener('change', mediaListener)

    return () => {
      media.removeEventListener('change', mediaListener)
    }
  }, [mediaQuery, updateTarget])

  return target
}

export default useMediaQuery
