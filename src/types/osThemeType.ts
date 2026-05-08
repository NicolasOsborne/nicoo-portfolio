import { OsId } from '@/enums/OsId'

export type OsTheme = {
  id: OsId
  label: string
  biosLabel: string
  biosDescription: string
  assetPath: string
  cursorPath: string
  sounds: {
    startup?: string
    shutdown?: string
    click?: string
    error?: string
    maximize?: string
    minimize?: string
  }
}
