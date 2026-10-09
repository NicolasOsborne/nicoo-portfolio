import { OsId } from '@/enums/OsId'

export type OsTheme = {
  id: OsId
  label: string
  biosLabel: string
  biosDescription: string
  assetPath: string
  cursorPath: string
  startupScreenImages: {
    desktop: string
    mobile: string
  }
  wallpaper?: {
    desktop: string
    mobile: string
  }
  sounds: {
    startup?: string
    shutdown?: string
    click?: string
    error?: string
    maximize?: string
    minimize?: string
  }
}
