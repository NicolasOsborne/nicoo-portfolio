import { OsId } from '@/enums/OsId'

export type BootScreen =
  | 'specs'
  | 'systemconfig'
  | 'logo'
  | 'login'
  | 'welcome'
  | 'desktop'

export type BootStep = {
  step: BootScreen
  duration?: number
}

export type BootSequence = BootStep[]

export type BootScreenProps = {
  additionalClass?: string
  osId: OsId
  duration?: number
  onComplete: () => void
}
