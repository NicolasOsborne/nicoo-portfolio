import { useCallback, useEffect, useState } from 'react'

export enum ResponsiveSize {
  'SCREEN_XXXS_MAX' = '(max-width: 375px)',
  'SCREEN_XXS_MAX' = '(max-width: 575px)',
  'SCREEN_XS_MIN' = '(min-width: 576px)',
  'SCREEN_XS_MAX' = '(max-width: 767px)',
  'SCREEN_S_MIN' = '(min-width: 768px)',
  'SCREEN_S_MAX' = '(max-width: 991px)',
  'SCREEN_M_MIN' = '(min-width: 992px)',
  'SCREEN_M_MAX' = '(max-width: 1199px)',
  'SCREEN_L_MIN' = '(min-width: 1200px)',
  'SCREEN_XL_MIN' = '(min-width: 1600px)',
}

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
