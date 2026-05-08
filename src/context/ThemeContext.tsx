'use client'

import {
  createContext,
  useContext,
  useEffect,
  FC,
  ReactNode,
  useMemo,
} from 'react'
import { OsId } from '@/enums/OsId'
import { OsTheme } from '@/types/osThemeType'
import { osConfigs } from '@/config/OSThemes'

type ThemeContextType = {
  osId: OsId
  theme: OsTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type ThemeProviderProps = {
  children: ReactNode
  osId: OsId
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, osId }) => {
  const theme = osConfigs[osId]

  useEffect(() => {
    document.documentElement.setAttribute('data-os', osId)
    return () => {
      document.documentElement.removeAttribute('data-os')
    }
  }, [osId])

  const value = useMemo(() => ({ osId, theme }), [osId, theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
