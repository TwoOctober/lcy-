import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "F4CS.cn",
  description:
    "F4CS.cn提供CS1.6反恐精英中文版。涵盖F4CS大庙杯CS2电竞赛事信息。一键注册汉化，流畅游玩，支持竞技地图和机器人菜单。",
  keywords: "CS1.6下载,反恐精英下载,大庙杯比赛,CS1.6中文版,Counter-Strike下载,格斗游戏,电竞赛事,F4CS.cn,F4CS",
  authors: [{ name: "Vegcat" }],
  openGraph: {
    title: "CS1.6下载",
    description: "F4CS.cn提供经典游戏免费下载和电竞赛事信息，一键注册汉化，流畅游玩",
    url: "https://F4CS.cn",
    siteName: "F4CS.cn",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "https://www.helloimg.com/i/2026/01/17/696b9a036bd37.ico",
    shortcut:
      "https://www.helloimg.com/i/2026/01/17/696b9a036bd37.ico",
    apple:
      "https://www.helloimg.com/i/2026/01/17/696b9a036bd37.ico",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link
          rel="icon"
          href="https://www.helloimg.com/i/2026/01/17/696b9a036bd37.ico"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
