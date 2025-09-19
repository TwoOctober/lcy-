"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Star, Users, ExternalLink, Globe, Trophy, Clock, ChevronDown, AlertTriangle } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Counter-Strike 1.6",
    description: "涵盖十余张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    image: "https://game.mhcdkey.com/image/ask/238818/qpvrwk1jwqb.jpg",
    rating: 5,
    downloads: "14k",
    size: "94MB",
    downloadLinks: [
      { name: "蓝奏云线路", url: "https://wwuq.lanzouq.com/iwJqc361q42d", type: "official" },
      { name: "腾讯云线路", url: "http://101.42.25.190:8888/down/VKduTDvUOnpD", type: "fast" },
    ],
  },
]

const updateLogs = [
  {
    version: "2025-09-19",
    changes: ["UI更新", "修复标题色块bug", "优化加载"],
  },
  {
    version: "2025-08-28",
    changes: ["腾讯云线路下线", "优化加载", "修复游戏漏洞"],
  },
  {
    version: "2025-08-23",
    changes: ["腾讯云不限速线路上线", "底部赞助上线", "补档线路上线"],
  },
]

// 滚动动画Hook
function useScrollAnimation() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    // 观察所有需要动画的元素
    const sections = document.querySelectorAll("[data-scroll-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return visibleSections
}

export default function GameDownloadSite() {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [isSponsorDialogOpen, setIsSponsorDialogOpen] = useState(false)
  const [isLanzouDialogOpen, setIsLanzouDialogOpen] = useState(false)
  const [isTencentDialogOpen, setIsTencentDialogOpen] = useState(false)

  const visibleSections = useScrollAnimation()

  const handleLanzouClick = () => {
    setIsLanzouDialogOpen(true)
  }
  const handleTencentClick = () => {
    setIsTencentDialogOpen(true)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes staggeredFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-warning {
          0%, 100% {
            background-color: rgb(254 242 242);
            border-color: rgb(252 165 165);
          }
          50% {
            background-color: rgb(254 226 226);
            border-color: rgb(248 113 113);
          }
        }
        .animate-gradient-x {
          animation: gradient-x 2s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
        .animate-staggered-fade-in {
          animation: staggeredFadeIn 0.4s ease-out forwards;
        }
        .animate-pulse-warning {
          animation: pulse-warning 2s ease-in-out infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
        .bg-400\\% {
          background-size: 400% 400%;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        .scroll-section {
          opacity: 0;
          transform: translateY(40px);
        }
        .scroll-section.visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.1s; }
        .stagger-3 { transition-delay: 0.15s; }
        .stagger-4 { transition-delay: 0.2s; }
        .stagger-5 { transition-delay: 0.25s; }
        .stagger-6 { transition-delay: 0.3s; }
        
        /* 优化滚动条 */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>

      {/* 下载区域 */}
      <section
        id="downloads"
        data-scroll-section
        className={`h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 relative scroll-section ${
          visibleSections.has("downloads") ? "visible" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-center">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 大庙杯比赛 */}
            <div
              className={`group bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200 scroll-section stagger-1 ${
                visibleSections.has("downloads") ? "visible" : ""
              }`}
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAALE52iqkwY0IXNRy2hlI1tuhDu7Ni0DAALcGAACsgpYVfGKLfm8-f_FNgQ.jpg"
                  alt="大庙杯比赛"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-semibold text-gray-900">大庙杯比赛</h3>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 shadow-lg text-sm">
                    竞赛活动
                  </Badge>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  
                  2025届CS2大庙杯比赛已结赛，期待下一次的相遇~
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => window.open("https://b23.tv/x5nXHGj", "_blank")}
                    className="w-full justify-between h-16 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn text-lg"
                  >
                    <div className="flex items-center">
                      <Trophy className="w-6 h-6 mr-4 group-hover/btn:rotate-12 transition-transform" />
                      <span className="font-medium">赛事回放</span>
                    </div>
                    <ExternalLink className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => window.open("https://qm.qq.com/q/1NHb1tygHy", "_blank")}
                    variant="outline"
                    className="w-full justify-between h-16 px-8 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 rounded-2xl transition-all duration-300 group/btn text-lg"
                  >
                    <div className="flex items-center">
                      <Globe className="w-6 h-6 mr-4 group-hover/btn:rotate-12 transition-transform" />
                      <span className="font-medium">比赛交流群</span>
                    </div>
                    <ExternalLink className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CS 1.6 Game */}
            {games.map((game) => (
              <div
                key={game.id}
                className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 scroll-section stagger-2 ${
                  visibleSections.has("downloads") ? "visible" : ""
                }`}
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
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
                    <h3 className="text-3xl font-semibold text-gray-900">{game.title}</h3>
                    <div className="text-sm text-gray-500 text-right">
                      <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
                        <span className="font-medium text-base">{game.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        <span className="font-medium text-base">{game.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">{game.description}</p>

                  <div className="space-y-4">
                    {/* 下载链接 */}
                    {game.downloadLinks.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        onClick={
                          link.type === "official"
                            ? handleLanzouClick
                            : link.type === "fast"
                              ? handleTencentClick
                              : undefined
                        }
                        variant="outline"
                        className="w-full justify-between h-16 px-8 border-2 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-2xl transition-all duration-300 group/btn bg-transparent text-lg"
                      >
                        <div className="flex items-center">
                          <Download className="w-6 h-6 mr-4 group-hover/btn:translate-y-1 transition-transform" />
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <span className="text-base font-medium bg-gray-100 group-hover/btn:bg-gray-800 px-4 py-2 rounded-full transition-colors">
                          {game.size}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 继续向下滚动指示器 - 移到section底部 */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-section stagger-3 ${
            visibleSections.has("downloads") ? "visible" : ""
          }`}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors group"
          >
            <ChevronDown className="w-6 h-6 animate-bounce-slow group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 关于区域 */}
      <section
        id="about"
        data-scroll-section
        className={`min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-indigo-50 py-20 scroll-section ${
          visibleSections.has("about") ? "visible" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div
            className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-10 scroll-section stagger-2 ${
              visibleSections.has("about") ? "visible" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
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

          <div
            className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-16 scroll-section stagger-3 ${
              visibleSections.has("about") ? "visible" : ""
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <h3 className="text-2xl font-semibold text-gray-900">更新日志</h3>
            </div>

            <div className="space-y-6">
              {updateLogs.map((log, index) => (
                <div
                  key={index}
                  className={`border-l-4 border-indigo-200 pl-6 relative scroll-section stagger-${4 + index} ${
                    visibleSections.has("about") ? "visible" : ""
                  }`}
                >
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
          <div className={`text-center scroll-section stagger-6 ${visibleSections.has("about") ? "visible" : ""}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-4">
              <p className="text-gray-500 text-sm">© 2025 Vegcat. All rights reserved.</p>
              <Button
                onClick={() => window.open("https://cs.lcynb.icu", "_blank")}
                variant="outline"
                className="px-6 py-2 text-sm border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 rounded-2xl flex items-center transition-all duration-300 group"
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                跳转旧版
              </Button>
              <Button
                onClick={() => setIsSponsorDialogOpen(true)}
                variant="outline"
                className="px-6 py-2 text-sm border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 rounded-2xl flex items-center transition-all duration-300"
              >
              <span className="mr-2">😶‍🌫️</span>
                赞助支持
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lanzou Dialog */}
      <Dialog open={isLanzouDialogOpen} onOpenChange={setIsLanzouDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-lg rounded-3xl p-8 border border-gray-200 shadow-2xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-4 text-center">重要提醒</DialogTitle>
          </DialogHeader>

          {/* 醒目的警告框 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 animate-pulse-warning">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-red-800 mb-3">使用前必读</h4>
                <ul className="space-y-2 text-red-700 font-medium">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>请先运行免CDKEY补丁后再打开游戏</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>否则将出现无汉化/序列号异常等问题</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>进入游戏后按下H键可以呼出机器人菜单</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-200">
            <h3 className="font-bold text-2xl mb-3 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-4 text-lg">蓝奏云线路</p>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 shadow-md text-base">
              推荐下载
            </Badge>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                window.open("https://wwuq.lanzouq.com/iwJqc361q42d", "_blank")
                setIsLanzouDialogOpen(false)
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              开始下载 (提取码: 6657)
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsLanzouDialogOpen(false)}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 h-14 rounded-2xl font-bold transition-all duration-300 text-lg"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tencent Dialog */}
      <Dialog open={isTencentDialogOpen} onOpenChange={setIsTencentDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-lg rounded-3xl p-8 border border-gray-200 shadow-2xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-4 text-center">重要提醒</DialogTitle>
          </DialogHeader>

          {/* 醒目的警告框 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 animate-pulse-warning">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-red-800 mb-3">使用前必读</h4>
                <ul className="space-y-2 text-red-700 font-medium">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>请先运行免CDKEY补丁后再打开游戏</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>否则将出现无汉化/序列号异常等问题</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>进入游戏后按下H键可以呼出机器人菜单</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <h3 className="font-bold text-2xl mb-3 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-4 text-lg">腾讯云线路</p>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 shadow-md text-base">
              备用线路
            </Badge>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                window.open("http://101.42.25.190:8888/down/VKduTDvUOnpD", "_blank")
                setIsTencentDialogOpen(false)
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              开始下载
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsTencentDialogOpen(false)}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 h-14 rounded-2xl font-bold transition-all duration-300 text-lg"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sponsor Dialog */}
      <Dialog open={isSponsorDialogOpen} onOpenChange={setIsSponsorDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[90vw] sm:max-w-2xl max-h-[90vh] rounded-3xl p-0 border border-gray-200 shadow-2xl overflow-hidden mx-4 [&>button]:hidden">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-8 text-center text-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">支持我们</h2>
          </div>

          {/* 内容区域 */}
          <div className="p-4 sm:p-8 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* 支付宝赞助 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-4">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <img
                      src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK__GioQeYepsP6iVC3bsMxHNIjllKeAALpGgAC0_xBVf9i4oojkhwjNgQ.jpg"
                      alt="支付宝收款码"
                      className="w-28 h-28 sm:w-44 sm:h-44 rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <span className="mr-2 text-xl sm:text-2xl">支付宝支付</span>
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">加载卡顿，请稍后。</p>
                </div>
              </div>

              {/* 微信赞助 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-4">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <img
                      src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_-2ioQebputS_5HfrVDDM_h32L5HZAALoGgAC0_xBVQ5n_jogCyUONgQ.png"
                      alt="微信收款码"
                      className="w-28 h-28 sm:w-44 sm:h-44 rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <span className="mr-2 text-xl sm:text-2xl">微信支付</span>
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">加载卡顿，请稍后。</p>
                </div>
              </div>
            </div>

            {/* 底部说明 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-6">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                感谢您的支持！每一份赞助都将用于后续优化网站加载速度和云存储服务，本公益项目的维护和优化离不开大家的支持，希望能为大家提供更好的服务。腾讯云线路的流量有限，请尽可能使用其他线路！谢谢支持。
                <br />
                <span className="text-gray-700 font-medium">我们或许会倒闭，但永远不会变质。</span>
              </p>
            </div>

            {/* 关闭按钮 */}
            <div className="flex justify-center">
              <Button
                onClick={() => setIsSponsorDialogOpen(false)}
                variant="outline"
                className="px-8 py-2 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 rounded-2xl transition-all duration-300"
              >
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
