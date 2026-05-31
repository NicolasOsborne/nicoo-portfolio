import { OsId } from '@/enums/OsId'
import { OsTheme } from '@/types/osThemeType'

export const osConfigs: Record<OsId, OsTheme> = {
  win95: {
    id: 'win95',
    label: 'Windows 95',
    biosLabel: 'Microsoft Windows 95',
    biosDescription: 'Boot into the classic era',
    assetPath: '/assets/themes/win95',
    cursorPath: '/assets/themes/win95/cursors',
    sounds: {
      startup: '/assets/themes/win95/sounds/startup.wav',
      shutdown: '/assets/themes/win95/sounds/shutdown.wav',
      click: '/assets/themes/win95/sounds/click.wav',
      error: '/assets/themes/win95/sounds/error.wav',
    },
  },
  win98: {
    id: 'win98',
    label: 'Windows 98',
    biosLabel: 'Microsoft Windows 98',
    biosDescription: 'Second edition, same soul',
    assetPath: '/assets/themes/win98',
    cursorPath: '/assets/themes/win98/cursors',
    sounds: {
      startup: '/assets/themes/win98/sounds/startup.wav',
      error: '/assets/themes/win98/sounds/error.wav',
    },
  },
  winXP: {
    id: 'winXP',
    label: 'Windows XP',
    biosLabel: 'Microsoft Windows XP',
    biosDescription: 'The one everyone remembers',
    assetPath: '/assets/themes/winXP',
    cursorPath: '/assets/themes/winXP/cursors',
    sounds: {
      startup: '/assets/themes/winXP/sounds/startup.wav',
      shutdown: '/assets/themes/winXP/sounds/shutdown.wav',
      error: '/assets/themes/winXP/sounds/error.wav',
    },
  },
  linux: {
    id: 'linux',
    label: 'Linux',
    biosLabel: 'GNU/Linux',
    biosDescription: 'For those who know',
    assetPath: '/assets/themes/linux',
    cursorPath: '/assets/themes/linux/cursors',
    sounds: {
      error: '/assets/themes/linux/sounds/bell.wav',
    },
  },
}
