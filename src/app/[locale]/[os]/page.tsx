import { notFound } from 'next/navigation'
import { osConfigs } from '@/config/OSThemes'
import { OsId } from '@/enums/OsId'
import Win95 from '@/components/templates/Win95'
import Win98 from '@/components/templates/Win98S'
import WinXP from '@/components/templates/WinXPS'
import Linux from '@/components/templates/Linux'

type OsPageProps = {
  params: Promise<{ locale: string; os: string }>
}

const shellMap: Record<OsId, React.ComponentType> = {
  win95: Win95,
  win98: Win98,
  winXP: WinXP,
  linux: Linux,
}

export function generateStaticParams() {
  return Object.keys(osConfigs).map((os) => ({ os }))
}

export default async function OsPage({ params }: OsPageProps) {
  const { os } = await params

  if (!Object.keys(osConfigs).includes(os)) {
    notFound()
  }

  const Shell = shellMap[os as OsId]
  return <Shell />
}
