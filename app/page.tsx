"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Star, Users, ExternalLink, Globe, Trophy, Clock } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Counter-Strike 1.6",
    description: "一号线路为自解压程序，二号线路为免安装zip压缩包",
    image: "https://game.mhcdkey.com/image/ask/238818/qpvrwk1jwqb.jpg",
    rating: 1,
    downloads: "1294",
    size: "94MB",
    downloadLinks: [
      { name: "蓝奏云1号线路", url: "https://wwuq.lanzouq.com/i9WHN30eisdc", type: "official" },
      { name: "蓝奏云2号线路（免安装）", url: "https://wwuq.lanzouq.com/iPmfM30ei60h", type: "fast" },
    ],
  },
]

const updateLogs = [
  {
    version: "2025-07-06",
    changes: ["正式弃用旧版", "修复严重bug", "上线cs1.6增强版"],
  },
  {
    version: "2025-07-05",
    changes: ["删除冗余文件", "修复严重bug", "添加了新地图"],
  },
  {
    version: "2025-06-26",
    changes: ["优化下载弹窗体验"],
  },
]

// 打字机效果组件
function TypewriterText({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true)
      // 打字完成后，光标闪烁几次然后消失
      setTimeout(() => {
        setShowCursor(false)
      }, 2000)
    }
  }, [currentIndex, text, speed, isComplete])

  useEffect(() => {
    if (!isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [isComplete])

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
        {displayText}
      </span>
      {!isComplete && (
        <span
          className={`inline-block w-0.5 h-8 bg-gray-900 ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
        >
          |
        </span>
      )}
    </span>
  )
}

export default function GameDownloadSite() {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [selectedDownload, setSelectedDownload] = useState<{
    gameName: string
    linkName: string
    linkType: string
  } | null>(null)

  const handleDownloadClick = (gameName: string, linkName: string, linkType: string) => {
    setSelectedDownload({ gameName, linkName, linkType })
    setIsDownloadDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4 min-h-[3rem]">
            <TypewriterText text="祝贺本站点访问量破1k+" speed={80} />
          </h1>
          <p className="text-lg text-gray-600">Powered by Vegcat</p>
        </div>
      </section>

      {/* Games & Competition Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 大庙杯比赛 */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl overflow-hidden shadow-sm border border-indigo-200">
            <div className="aspect-video bg-gray-100">
              <img
                src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAJK-GiGU_3oRPUxEP8eTGkmSXROKgXlAAJqGAACQKIxVDZrG7Mq9Q5zNgQ.jpg"
                alt="大庙杯比赛"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-medium text-gray-900">大庙杯比赛</h3>
                <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">竞赛活动</Badge>
              </div>

              <p className="text-gray-600 mb-6">参与CS2大庙杯比赛，与高手过招，赢取丰厚奖品</p>

              <div className="space-y-2">
                <Button
                  onClick={() => window.open("https://b23.tv/x5nXHGj", "_blank")}
                  className="w-full justify-between h-12 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0"
                >
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span>查看比赛</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => window.open("https://qm.qq.com/q/1NHb1tygHy", "_blank")}
                  variant="outline"
                  className="w-full justify-between h-12 px-4 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                >
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>比赛通知群</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* CS 1.6 Game */}
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border">
              <div className="aspect-video bg-gray-100">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-medium text-gray-900">{game.title}</h3>
                  <div className="text-sm text-gray-500 text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {game.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {game.downloads}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{game.description}</p>

                <div className="space-y-2">
                  {game.downloadLinks.map((link, linkIndex) => (
                    <Button
                      key={linkIndex}
                      onClick={() => handleDownloadClick(game.title, link.name, link.type)}
                      variant="outline"
                      className="w-full justify-between h-12 px-4 hover:bg-gray-900 hover:text-white"
                    >
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        <span>{link.name}</span>
                      </div>
                      <span className="text-sm">{game.size}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About & Updates Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* About */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">关于此站点</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              本站点为公益下载站点，用爱发电，下载资源仅供学习交流，严厉禁止商用和盗版软件。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">Vegcat.icu</h3>
                <p className="text-gray-600">探索关于站点和站长的信息以及接下来的更新计划。</p>
              </div>
              <Button
                onClick={() => window.open("https://vegcat.icu", "_blank")}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full flex items-center"
              >
                <Globe className="w-4 h-4 mr-2" />
                点击跳转
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Update Log */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-xl font-medium text-gray-900">更新日志</h3>
            </div>

            <div className="space-y-4">
              {updateLogs.map((log, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <Badge className="bg-gray-900 text-white mb-2">{log.version}</Badge>
                  <ul className="space-y-1 text-gray-600">
                    {log.changes.map((change, changeIndex) => (
                      <li key={changeIndex}>• {change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="bg-white max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900">下载注意事项</DialogTitle>
            <DialogDescription className="text-gray-600">
              双击cdkey_schinese.reg以自动注册和汉化，游戏内H键呼出zbot菜单
            </DialogDescription>
          </DialogHeader>

          {selectedDownload && (
            <div className="pt-4">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="font-medium text-lg mb-1">{selectedDownload.gameName}</h3>
                <p className="text-gray-600 mb-2">下载方式: {selectedDownload.linkName}</p>
                <Badge className="bg-gray-900 text-white">
                  {selectedDownload.linkType === "official" ? "高速下载" : "免解压"}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    window.open(
                      selectedDownload.linkType === "official"
                        ? "https://wwuq.lanzouq.com/i9WHN30eisdc"
                        : "https://wwuq.lanzouq.com/iPmfM30ei60h",
                      "_blank",
                    )
                    setIsDownloadDialogOpen(false)
                  }}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  开始下载 (提取码: 6657)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDownloadDialogOpen(false)}
                  className="flex-1 rounded-full"
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">© 2025 Vegcat.</p>
        </div>
      </footer>
    </div>
  )
}
