import { OsId } from '@/enums/OsId'

type SpecsConfig = {
  biosLine: string
  pluginLine: string
  copyright: string
  ideLines: string[]
  footerHint: string
}

export const specsContent: Record<OsId, SpecsConfig> = {
  win95: {
    biosLine: 'Nicoo BIOS v4.60PGA',
    pluginLine: 'Portfolio BIOS Extension v1.0',
    copyright: 'Copyright (C) 1995, Nicoo',
    ideLines: [
      'Detecting IDE Primary Master   ... None',
      'Detecting IDE Primary Slave    ... None',
      'Detecting IDE Secondary Master ... None',
      'Detecting IDE Secondary Slave  ... None',
    ],
    footerHint: 'Press DEL to go back to BIOS',
  },
  win98: {
    biosLine: 'Nicoo BIOS v4.60PGA',
    pluginLine: 'Portfolio BIOS Extension v1.0',
    copyright: 'Copyright (C) 1998, Nicoo',
    ideLines: [
      'Detecting IDE Primary Master   ... None',
      'Detecting IDE Primary Slave    ... None',
      'Detecting IDE Secondary Master ... None',
      'Detecting IDE Secondary Slave  ... None',
    ],
    footerHint: 'Press DEL to go back to BIOS',
  },
  winXP: {
    biosLine: 'Nicoo BIOS v4.60PGA',
    pluginLine: 'Portfolio BIOS Extension v1.0',
    copyright: 'Copyright (C) 2002, Nicoo',
    ideLines: [
      'Checking NVRAM ...',
      'Verifying DMI Pool Data ...',
      'Boot from CD/DVD : No system disk.',
      'Loading Windows XP ...',
    ],
    footerHint: 'Press DEL to go back to BIOS',
  },
  linux: {
    biosLine: 'SeaBIOS (version 1.13.0)',
    pluginLine: 'Booting from Hard Disk...',
    copyright: 'Copyright (C) 2022, Nicoo',
    ideLines: [
      'ata1.00: ATA-7, max UDMA/133, 976773168 sectors',
      'ata1.00: configured for UDMA/133',
      'scsi 0:0:0:0: Direct-Access ATA ST3500418AS CC38',
      'sd 0:0:0:0: [sda] 976773168 512-byte logical blocks',
    ],
    footerHint: 'Press DEL to go back to BIOS',
  },
}
