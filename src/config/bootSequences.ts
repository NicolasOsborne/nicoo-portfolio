import { OsId } from '@/enums/OsId'
import { BootSequence } from '@/types/bootType'

export const bootSequences: Record<OsId, BootSequence> = {
  win95: [
    { step: 'specs', duration: 4000 },
    { step: 'systemconfig', duration: 2500 },
    { step: 'logo', duration: 3500 },
    { step: 'login' },
    { step: 'desktop' },
  ],
  win98: [
    { step: 'specs', duration: 3500 },
    { step: 'systemconfig', duration: 2000 },
    { step: 'logo', duration: 3000 },
    { step: 'login' },
    { step: 'desktop' },
  ],
  winXP: [
    { step: 'specs', duration: 1500 },
    { step: 'logo', duration: 4000 },
    { step: 'login' },
    { step: 'desktop' },
  ],
  linux: [{ step: 'desktop' }],
}
