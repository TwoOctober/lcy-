import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CS1.6下载 - 反恐精英1.6中文版免费下载 | 6657sb.icu",
  description:
    "CS1.6反恐精英中文版免费下载，一键注册汉化，涵盖竞技地图，流畅游玩。提供正式版94MB和先行版99MB下载，支持机器人菜单。",
  keywords: "CS1.6下载,反恐精英下载,CS1.6中文版,Counter-Strike下载,CS1.6免费下载,经典射击游戏",
  authors: [{ name: "Vegcat" }],
  openGraph: {
    title: "CS1.6下载 - 反恐精英1.6中文版免费下载",
    description: "一键注册汉化，涵盖十二张竞技地图和休闲对枪图，流畅游玩CS1.6",
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
