import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "next/navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "6657sb.icu",
  description: "一键注册，一键汉化，一键下载",
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
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
