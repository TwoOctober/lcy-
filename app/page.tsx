"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, ExternalLink, Globe, Trophy, AlertTriangle, Heart } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Counter-Strike 1.6",
    description: "涵盖十余张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    image:
      "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLkhozW1WxGHQtjoDMnepyRsL1IeA4gACdxsAAhwQaVYIRxkAARbi2bg2BA.jpg",
    rating: 5,
    downloads: "14k",
    size: "94MB",
    downloadLinks: [
      { name: "蓝奏云线路", url: "https://wwuq.lanzouq.com/iNB8r36khb1e", type: "official" },
      { name: "腾讯云线路", url: "http://101.42.25.190:8888/down/VKduTDvUOnpD", type: "fast" },
    ],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <style jsx>{`
        html {
          scroll-behavior: smooth;
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

      {/* 主要内容区域 - 单个全屏section */}
      <section
        id="main"
        data-scroll-section
        className={`min-h-screen flex flex-col relative scroll-section ${visibleSections.has("main") ? "visible" : ""}`}
      >
        {/* 主要内容 */}
        <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6">
          <div className="w-full max-w-7xl mx-auto">
            {/* 主要游戏卡片区域 */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* 大庙杯比赛 */}
              <div
                className={`group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-indigo-200/50 scroll-section stagger-1 ${
                  visibleSections.has("main") ? "visible" : ""
                }`}
              >
                <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                  <img
                    src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjJozWeRpWl0VnbyMLVoRgKTeQd42QACWxsAAhwQaVb3hh5-ygueMDYE.jpg"
                    alt="大庙杯比赛"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">大庙杯比赛</h3>
                    <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3 py-1 shadow-lg text-sm">
                      竞赛活动
                    </Badge>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-base mb-6">
                    2025届CS2大庙杯比赛已结赛，期待下一次的相遇~
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={() => window.open("https://b23.tv/x5nXHGj", "_blank")}
                      className="w-full justify-between h-12 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn text-base"
                    >
                      <div className="flex items-center">
                        <Trophy className="w-5 h-5 mr-3 group-hover/btn:rotate-12 transition-transform" />
                        <span className="font-medium">赛事回放</span>
                      </div>
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => window.open("https://qm.qq.com/q/1NHb1tygHy", "_blank")}
                      variant="outline"
                      className="w-full justify-between h-12 px-6 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 rounded-2xl transition-all duration-300 group/btn text-base"
                    >
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-3 group-hover/btn:rotate-12 transition-transform" />
                        <span className="font-medium">比赛交流群</span>
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
                  className={`group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-gray-200/50 scroll-section stagger-2 ${
                    visibleSections.has("main") ? "visible" : ""
                  }`}
                >
                  <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{game.title}</h3>
                      <Badge className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-1 shadow-lg text-sm">
                        经典游戏
                      </Badge>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-base mb-6">{game.description}</p>

                    <div className="space-y-3">
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
                          className="w-full justify-between h-12 px-6 border-2 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-2xl transition-all duration-300 group/btn bg-transparent text-base"
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

            {/* 底部信息区域 */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Vegcat.icu */}
              <div
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 scroll-section stagger-3 transition-all duration-500 ${
                  visibleSections.has("main") ? "visible" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Vegcat.icu</h3>
                    <p className="text-gray-600 text-base">探索关于站点和站长的信息以及接下来的更新计划。</p>
                  </div>
                  <Button
                    onClick={() => window.open("https://vegcat.icu", "_blank")}
                    className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-6 py-2 rounded-2xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 group text-base whitespace-nowrap"
                  >
                    <Globe className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    点击跳转
                    <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* 赞助支持 - 与vegcat.icu相同风格 */}
              <div
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 scroll-section stagger-4 transition-all duration-500 ${
                  visibleSections.has("main") ? "visible" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">赞助支持</h3>
                    <p className="text-gray-600 text-base">支持我们的项目发展，帮助维护服务器和优化体验。</p>
                  </div>
                  <Button
                    onClick={() => setIsSponsorDialogOpen(true)}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-2 rounded-2xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 group text-base whitespace-nowrap"
                  >
                    <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    支持我们
                    <span className="ml-2 text-sm">💝</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - 改为白色背景 */}
        <div className={`relative z-10 scroll-section stagger-6 ${visibleSections.has("main") ? "visible" : ""}`}>
          <div className="bg-white/60 backdrop-blur-sm border-t border-white/50 py-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center space-y-4">
                {/* 版权信息 */}
                <div className="text-center space-y-2">
                  <p className="text-gray-600 text-sm">© 2025 Vegcat. All rights reserved.</p>
                  <p className="text-gray-500 text-xs">我们或许会倒闭，但永远不会变质。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs保持不变 */}
      {/* Lanzou Dialog */}
      <Dialog open={isLanzouDialogOpen} onOpenChange={setIsLanzouDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[90vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl [&>button]:hidden mx-4">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
              重要提醒
            </DialogTitle>
          </DialogHeader>

          {/* 醒目的警告框 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-pulse-warning">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-red-800 mb-2 sm:mb-3">使用前必读</h4>
                <ul className="space-y-1 sm:space-y-2 text-red-700 font-medium text-sm sm:text-base">
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

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-200">
            <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg">蓝奏云线路</p>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-1 sm:py-2 shadow-md text-sm sm:text-base">
              推荐下载
            </Badge>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <Button
              onClick={() => {
                window.open("https://wwuq.lanzouq.com/iNB8r36khb1e", "_blank")
                setIsLanzouDialogOpen(false)
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 sm:h-14 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg"
            >
              <Download className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              <span className="hidden sm:inline">开始下载 (提取码: 6657)</span>
              <span className="sm:hidden">下载 (6657)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsLanzouDialogOpen(false)}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 h-12 sm:h-14 rounded-2xl font-bold transition-all duration-300 text-sm sm:text-lg"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tencent Dialog */}
      <Dialog open={isTencentDialogOpen} onOpenChange={setIsTencentDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[90vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl [&>button]:hidden mx-4">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
              重要提醒
            </DialogTitle>
          </DialogHeader>

          {/* 醒目的警告框 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-pulse-warning">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-red-800 mb-2 sm:mb-3">使用前必读</h4>
                <ul className="space-y-1 sm:space-y-2 text-red-700 font-medium text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span>请先运行免CDKEY补丁后再打开cstrike.exe</span>
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

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-200">
            <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg">腾讯云线路</p>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 sm:px-4 py-1 sm:py-2 shadow-md text-sm sm:text-base">
              备用线路
            </Badge>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <Button
              onClick={() => {
                window.open("http://101.42.25.190:8888/down/VKduTDvUOnpD", "_blank")
                setIsTencentDialogOpen(false)
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 sm:h-14 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg"
            >
              <Download className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              开始下载
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsTencentDialogOpen(false)}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 h-12 sm:h-14 rounded-2xl font-bold transition-all duration-300 text-sm sm:text-lg"
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">支持我们</h2>
          </div>

          {/* 内容区域 */}
          <div className="p-4 sm:p-8 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* 支付宝赞助 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 mb-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjdozWkx_Tzf8tD4ovL6_zNKtFBJhQACYBsAAhwQaVZk35uDBd5K1TYE.jpg"
                      alt="支付宝收款码"
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-xl"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <span className="mr-2 text-lg sm:text-xl md:text-2xl">支付宝支付</span>
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">加载卡顿，请稍后。</p>
                </div>
              </div>

              {/* 微信赞助 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 mb-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjZozWkxKgi3DGDBEcVBrOxW6vQpEAACXxsAAhwQaVYo2_9lfUr8GDYE.png"
                      alt="微信收款码"
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-xl"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <span className="mr-2 text-lg sm:text-xl md:text-2xl">微信支付</span>
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">加载卡顿，请稍后。</p>
                </div>
              </div>
            </div>

            {/* 底部说明 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6">
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
                className="px-6 sm:px-8 py-2 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 rounded-2xl transition-all duration-300 text-sm sm:text-base"
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
