import { OsId } from '@/enums/OsId'

type SpecsConfig = {
  biosLine: string
  pluginLine: string
  copyright: string
  ideLines: string[]
  footerHint: string
}

type SystemConfigRow = {
  label: string
  value: string | null
  key?: string
}

type SystemConfigSection = {
  rows: SystemConfigRow[]
}

type SystemConfigContent = {
  title: string
  sections: SystemConfigSection[]
  deviceTableTitle: string
  deviceTableHeaders: string[]
  deviceTableRows: string[][]
  startingMessage: string
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

export const systemConfigContent: Record<string, SystemConfigContent> = {
  win95: {
    title: 'System Configurations',
    sections: [
      {
        rows: [
          { label: 'CPU Type', value: null, key: 'cpuType' },
          { label: 'Co-Processor', value: null, key: 'coProcessor' },
          { label: 'CPU Clock', value: null, key: 'cpuClock' },
        ],
      },
      {
        rows: [
          { label: 'Base Memory', value: '640K' },
          { label: 'Extended Memory', value: null, key: 'extMemory' },
          { label: 'Cache Memory', value: null, key: 'cacheMemory' },
        ],
      },
      {
        rows: [
          { label: 'Diskette Drive A', value: '2.88M, 3.5 in.' },
          { label: 'Diskette Drive B', value: 'None' },
          { label: 'Pri. Master Disk', value: 'LBA, Mode 2, 1048MB' },
          { label: 'Pri. Slave  Disk', value: 'CDROM, Mode 4' },
          { label: 'Sec. Master Disk', value: 'None' },
          { label: 'Sec. Slave  Disk', value: 'None' },
        ],
      },
      {
        rows: [
          { label: 'Display Type', value: null, key: 'displayType' },
          { label: 'Serial Port(s)', value: null, key: 'serialPorts' },
          { label: 'Parallel Port(s)', value: '378' },
          { label: 'EDO DRAM at Row(s)', value: 'None' },
          { label: 'SDRAM at Row(s)', value: null, key: 'sdram' },
          { label: 'L2 Cache Type', value: null, key: 'l2cache' },
        ],
      },
    ],
    deviceTableTitle: 'PCI device listing.....',
    deviceTableHeaders: [
      'Bus No.',
      'Device No.',
      'Func No.',
      'Vendor ID',
      'Device ID',
      'Device Class',
      'IRQ',
    ],
    deviceTableRows: [
      ['0', '7', '1', '8086', '1230', 'IDE Controller', '14'],
      ['0', '17', '0', '1274', '1371', 'Multimedia Device', '11'],
    ],
    startingMessage: 'Starting Windows 95...',
  },
  win98: {
    title: 'System Configurations',
    sections: [
      {
        rows: [
          { label: 'CPU Type', value: null, key: 'cpuType' },
          { label: 'Co-Processor', value: null, key: 'coProcessor' },
          { label: 'CPU Clock', value: null, key: 'cpuClock' },
        ],
      },
      {
        rows: [
          { label: 'Base Memory', value: '640K' },
          { label: 'Extended Memory', value: null, key: 'extMemory' },
          { label: 'Cache Memory', value: null, key: 'cacheMemory' },
        ],
      },
      {
        rows: [
          { label: 'Diskette Drive A', value: '2.88M, 3.5 in.' },
          { label: 'Diskette Drive B', value: 'None' },
          { label: 'Pri. Master Disk', value: 'LBA, Mode 2, 2048MB' },
          { label: 'Pri. Slave  Disk', value: 'CDROM, Mode 4' },
          { label: 'Sec. Master Disk', value: 'None' },
          { label: 'Sec. Slave  Disk', value: 'None' },
        ],
      },
      {
        rows: [
          { label: 'Display Type', value: null, key: 'displayType' },
          { label: 'Serial Port(s)', value: null, key: 'serialPorts' },
          { label: 'Parallel Port(s)', value: '378' },
          { label: 'EDO DRAM at Row(s)', value: 'None' },
          { label: 'SDRAM at Row(s)', value: null, key: 'sdram' },
          { label: 'L2 Cache Type', value: null, key: 'l2cache' },
        ],
      },
    ],
    deviceTableTitle: 'PCI device listing.....',
    deviceTableHeaders: [
      'Bus No.',
      'Device No.',
      'Func No.',
      'Vendor ID',
      'Device ID',
      'Device Class',
      'IRQ',
    ],
    deviceTableRows: [
      ['0', '7', '1', '8086', '7111', 'IDE Controller', '14'],
      ['0', '17', '0', '1274', '1371', 'Multimedia Device', '11'],
      ['0', '18', '0', '10EC', '8029', 'Network Controller', '10'],
    ],
    startingMessage: 'Starting Windows 98...',
  },
}
