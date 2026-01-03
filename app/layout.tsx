import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CS1.6下载 | 死神vs火影 | CS2大庙杯赛事 - 6657sb.icu",
  description:
    "提供CS1.6反恐精英中文版、死神vs火影经典格斗游戏免费下载。涵盖大庙杯CS2电竞赛事信息。一键注册汉化，流畅游玩，支持竞技地图和机器人菜单。",
  keywords: "CS1.6下载,反恐精英下载,死神vs火影下载,大庙杯比赛,CS1.6中文版,Counter-Strike下载,格斗游戏,电竞赛事",
  authors: [{ name: "Vegcat" }],
  openGraph: {
    title: "CS1.6下载 | 死神vs火影 | 大庙杯赛事",
    description: "提供经典游戏免费下载和电竞赛事信息，一键注册汉化，流畅游玩",
    url: "https://6657sb.icu",
    siteName: "6657sb.icu",
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
    icon: "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_I2ioEwG95D1jEOkaeYTLgWsN9k6fAAJ3GQAC0_xBVSf3mroYpXbmNgQ.ico",
    shortcut:
      "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_I2ioEwG95D1jEOkaeYTLgWsN9k6fAAJ3GQAC0_xBVSf3mroYpXbmNgQ.ico",
    apple:
      "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_I2ioEwG95D1jEOkaeYTLgWsN9k6fAAJ3GQAC0_xBVSf3mroYpXbmNgQ.ico",
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
          href="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_I2ioEwG95D1jEOkaeYTLgWsN9k6fAAJ3GQAC0_xBVSf3mroYpXbmNgQ.ico"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
