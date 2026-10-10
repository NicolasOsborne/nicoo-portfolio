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
    startupScreenImages: {
      desktop: '/assets/themes/win95/images/Windows_95_Startup_Desktop.webp',
      mobile: '/assets/themes/win95/images/Windows_95_Startup_Mobile.webp',
    },
    sounds: {
      startup: '/assets/themes/win95/sounds/startup.wav',
      shutdown: '/assets/themes/win95/sounds/shutdown.wav',
    },
  },
  win98: {
    id: 'win98',
    label: 'Windows 98',
    biosLabel: 'Microsoft Windows 98',
    biosDescription: 'Second edition, same soul',
    assetPath: '/assets/themes/win98',
    cursorPath: '/assets/themes/win98/cursors',
    startupScreenImages: {
      desktop: '/assets/themes/win98/images/Windows_98_Startup_Desktop.webp',
      mobile: '/assets/themes/win98/images/Windows_98_Startup_Mobile.webp',
    },
    sounds: {
      startup: '/assets/themes/win98/sounds/startup.wav',
      error: '/assets/themes/win98/sounds/shutdown.wav',
    },
  },
  winXP: {
    id: 'winXP',
    label: 'Windows XP',
    biosLabel: 'Microsoft Windows XP',
    biosDescription: 'The one everyone remembers',
    assetPath: '/assets/themes/winXP',
    cursorPath: '/assets/themes/winXP/cursors',
    startupScreenImages: {
      desktop: '/assets/themes/winXP/images/Windows_XP_Startup_Desktop.webp',
      mobile: '/assets/themes/winXP/images/Windows_XP_Startup_Mobile.webp',
    },
    wallpaper: {
      desktop: '/assets/themes/winXP/images/Windows_XP_Wallpaper_Desktop.webp',
      mobile: '/assets/themes/winXP/images/Windows_XP_Wallpaper_Mobile.webp',
    },
    sounds: {
      startup: '/assets/themes/winXP/sounds/startup.wav',
      shutdown: '/assets/themes/winXP/sounds/shutdown.wav',
    },
  },
  linux: {
    id: 'linux',
    label: 'Linux',
    biosLabel: 'GNU/Linux',
    biosDescription: 'For those who know',
    assetPath: '/assets/themes/linux',
    cursorPath: '/assets/themes/linux/cursors',
    startupScreenImages: {
      desktop: '/assets/themes/linux/images/Ubuntu_Startup_Desktop.webp',
      mobile: '/assets/themes/linux/images/Ubuntu_Startup_Mobile.webp',
    },
    wallpaper: {
      desktop: '/assets/themes/linux/images/Ubuntu_Wallpaper_Desktop.webp',
      mobile: '/assets/themes/linux/images/Ubuntu_Wallpaper_Mobile.webp',
    },
    sounds: {
      error: '/assets/themes/linux/sounds/bell.wav',
    },
  },
}

export const isOsId = (value: string): value is OsId =>
  Object.prototype.hasOwnProperty.call(osConfigs, value)
