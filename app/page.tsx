"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Star, Users, ExternalLink, Globe, Trophy, Clock, Sparkles, ChevronDown } from "lucide-react"

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
          className={`inline-block w-0.5 h-8 bg-white ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
        >
          |
        </span>
      )}
    </span>
  )
}

// 粒子组件
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gradient-shift {
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
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
        .bg-400\\% {
          background-size: 400% 400%;
        }
      `}</style>

      {/* 全屏Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-shift bg-400%">
        {/* 动态背景层 */}
        <div className="absolute inset-0">
          {/* 大型装饰圆形 */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>

          {/* 几何装饰 */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-rotate-slow"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/10 rotate-45 animate-rotate-slow"
            style={{ animationDirection: "reverse" }}
          ></div>

          {/* 粒子效果 */}
          <Particles />
        </div>

        {/* 主要内容 */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-6 animate-bounce-slow" />
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-white mb-8 min-h-[5rem]">
            <TypewriterText text="祝贺本站点访问量破1k+" speed={80} />
          </h1>
          <p className="text-2xl text-white/80 mb-12 font-light">Powered by Vegcat</p>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mb-16"></div>

          {/* 滚动指示器 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection("downloads")}
              className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors group"
            >
              <span className="text-sm mb-2 font-light">向下滚动探索</span>
              <ChevronDown className="w-6 h-6 animate-bounce-slow group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 下载区域 */}
      <section
        id="downloads"
        className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">精选游戏下载</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* 大庙杯比赛 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAJK-GiGU_3oRPUxEP8eTGkmSXROKgXlAAJqGAACQKIxVDZrG7Mq9Q5zNgQ.jpg"
                  alt="大庙杯比赛"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">大庙杯比赛</h3>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3 py-1 shadow-lg">
                    🏆 竞赛活动
                  </Badge>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">参与CS2大庙杯比赛，与高手过招，赢取丰厚奖品</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.open("https://b23.tv/x5nXHGj", "_blank")}
                    className="w-full justify-between h-14 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  >
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 mr-3 group-hover/btn:rotate-12 transition-transform" />
                      <span className="font-medium">查看比赛</span>
                    </div>
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => window.open("https://qm.qq.com/q/1NHb1tygHy", "_blank")}
                    variant="outline"
                    className="w-full justify-between h-14 px-6 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 rounded-2xl transition-all duration-300 group/btn"
                  >
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-3 group-hover/btn:rotate-12 transition-transform" />
                      <span className="font-medium">比赛通知群</span>
                    </div>
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CS 1.6 Game */}
            {games.map((game) => (
              <div
                key={game.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{game.title}</h3>
                    <div className="text-sm text-gray-500 text-right">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                        <span className="font-medium">{game.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-medium">{game.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed">{game.description}</p>

                  <div className="space-y-3">
                    {game.downloadLinks.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        onClick={() => handleDownloadClick(game.title, link.name, link.type)}
                        variant="outline"
                        className="w-full justify-between h-14 px-6 border-2 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-2xl transition-all duration-300 group/btn"
                      >
                        <div className="flex items-center">
                          <Download className="w-5 h-5 mr-3 group-hover/btn:translate-y-1 transition-transform" />
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <span className="text-sm font-medium bg-gray-100 group-hover/btn:bg-gray-800 px-3 py-1 rounded-full transition-colors">
                          {game.size}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 继续向下滚动指示器 */}
          <div className="text-center mt-16">
            <button
              onClick={() => scrollToSection("about")}
              className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors group"
            >
              <span className="text-sm mb-2 font-light">了解更多</span>
              <ChevronDown className="w-6 h-6 animate-bounce-slow group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 关于区域 */}
      <section id="about" className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-indigo-50 py-20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-gray-900 mb-6">关于此站点</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              本站点为公益下载站点，用爱发电，下载资源仅供学习交流，严厉禁止商用和盗版软件。
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Vegcat.icu</h3>
                <p className="text-gray-600 text-lg">探索关于站点和站长的信息以及接下来的更新计划。</p>
              </div>
              <Button
                onClick={() => window.open("https://vegcat.icu", "_blank")}
                className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-3 rounded-2xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Globe className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                点击跳转
                <ExternalLink className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16">
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <h3 className="text-2xl font-semibold text-gray-900">更新日志</h3>
            </div>

            <div className="space-y-6">
              {updateLogs.map((log, index) => (
                <div key={index} className="border-l-4 border-indigo-200 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 top-3"></div>
                  <Badge className="bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-3 px-4 py-1 text-sm shadow-md">
                    {log.version}
                  </Badge>
                  <ul className="space-y-2 text-gray-600">
                    {log.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start">
                        <span className="text-indigo-400 mr-3 mt-1">•</span>
                        <span className="leading-relaxed">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <p className="text-gray-500 text-sm">© 2025 Vegcat. All rights reserved.</p>
              <Button
                onClick={() => window.open("https://cs.lcynb.icu", "_blank")}
                variant="outline"
                className="px-6 py-2 text-sm border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 rounded-2xl flex items-center transition-all duration-300 group"
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                跳转旧版
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-md rounded-3xl p-8 border border-gray-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">下载注意事项</DialogTitle>
            <DialogDescription className="text-gray-600 text-base leading-relaxed">
              双击cdkey_schinese.reg以自动注册和汉化，游戏内H键呼出zbot菜单
            </DialogDescription>
          </DialogHeader>

          {selectedDownload && (
            <div className="pt-6">
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-gray-100">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">{selectedDownload.gameName}</h3>
                <p className="text-gray-600 mb-3 text-base">下载方式: {selectedDownload.linkName}</p>
                <Badge className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-1 shadow-md">
                  {selectedDownload.linkType === "official" ? "🚀 高速下载" : "📦 免解压"}
                </Badge>
              </div>

              <div className="flex gap-4">
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
                  className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white h-12 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  开始下载 (提取码: 6657)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDownloadDialogOpen(false)}
                  className="flex-1 border-2 border-gray-200 hover:border-gray-300 h-12 rounded-2xl font-medium transition-all duration-300"
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
