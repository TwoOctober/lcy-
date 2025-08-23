"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Star, Users, ExternalLink, Globe, Trophy, Clock, ChevronDown } from "lucide-react"

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
      { name: "腾讯云不限速线路（试运行）", url: "https://vegcat-1301889594.cos.ap-shanghai.myqcloud.com/cs1.6.7z", type: "fast" },
    ],
    supplementLinks: [{ name: "补档链接", url: "https://musetransfer.com/s/xyh30d6gs", type: "supplement" }],
  },
]

const updateLogs = [
  {
    version: "2025-08-23",
    changes: ["腾讯云不限速线路上线", "底部赞助上线", "补档线路上线"],
  },
  {
    version: "2025-08-22",
    changes: ["优化UI", "修复bug", "上线大庙杯比赛"],
  },
  {
    version: "2025-07-06",
    changes: ["正式弃用旧版", "修复严重bug", "上线cs1.6增强版"],
  },
]

// 图片加载组件
function ImageWithLoader({
  src,
  alt,
  className,
  ...props
}: { src: string; alt: string; className?: string; [key: string]: any }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center bg-gray-100 rounded-xl h-full min-h-[200px]">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">图片加载失败</div>
          </div>
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
}

// 新的动态背景组件
function DynamicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 流动的波浪效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-indigo-600/10 animate-wave-1"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-indigo-600/10 to-blue-600/10 animate-wave-2"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-700/10 to-indigo-700/10 animate-wave-3"></div>
      </div>

      {/* 动态网格 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-grid-move"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-grid-move-vertical"></div>
      </div>

      {/* 浮动光点 */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-float-random"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 10}s`,
          }}
        />
      ))}

      {/* 大型装饰圆环 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 border border-white/5 rounded-full animate-spin-reverse"></div>

      {/* 渐变光晕 */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-radial from-blue-400/20 via-blue-500/10 to-transparent rounded-full animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-radial from-indigo-400/20 via-indigo-500/10 to-transparent rounded-full animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>
  )
}

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
  const [selectedDownload, setSelectedDownload] = useState<{
    gameName: string
    linkName: string
    linkType: string
  } | null>(null)

  const visibleSections = useScrollAnimation()

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
        @keyframes wave-1 {
          0%, 100% {
            transform: translateX(-100%) translateY(-50%) rotate(0deg);
          }
          50% {
            transform: translateX(100%) translateY(-25%) rotate(180deg);
          }
        }
        @keyframes wave-2 {
          0%, 100% {
            transform: translateX(100%) translateY(-25%) rotate(180deg);
          }
          50% {
            transform: translateX(-100%) translateY(-75%) rotate(360deg);
          }
        }
        @keyframes wave-3 {
          0%, 100% {
            transform: translateX(-50%) translateY(-100%) rotate(90deg);
          }
          50% {
            transform: translateX(-25%) translateY(100%) rotate(270deg);
          }
        }
        @keyframes grid-move {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes grid-move-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes float-random {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.9;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
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
        .animate-gradient-x {
          animation: gradient-x 2s ease infinite;
        }
        .animate-wave-1 {
          animation: wave-1 25s ease-in-out infinite;
        }
        .animate-wave-2 {
          animation: wave-2 30s ease-in-out infinite;
        }
        .animate-wave-3 {
          animation: wave-3 35s ease-in-out infinite;
        }
        .animate-grid-move {
          animation: grid-move 15s linear infinite;
        }
        .animate-grid-move-vertical {
          animation: grid-move-vertical 20s linear infinite;
        }
        .animate-float-random {
          animation: float-random 15s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 45s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
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

      {/* 全屏Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 animate-gradient-shift bg-400%">
        {/* 新的动态背景 */}
        <DynamicBackground />

        {/* 主要内容 */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <ImageWithLoader
              src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAK_I2ioEwG95D1jEOkaeYTLgWsN9k6fAAJ3GQAC0_xBVSf3mroYpXbmNgQ.ico"
              alt="网站图标"
              className="w-16 h-16 mx-auto mb-6 animate-bounce-slow"
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-white mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-x bg-300%">
              CS1.6精简版下载站
            </span>
          </h1>
          <p className="text-2xl text-white/80 mb-12 font-light">Powered by Vegcat</p>
        </div>

        {/* 滚动指示器 - 移到最底部 */}
        <div className="relative z-10 pb-8">
          <button
            onClick={() => scrollToSection("downloads")}
            className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors group"
          >
            <span className="text-sm mb-2 font-light">向下滚动探索</span>
            <ChevronDown className="w-6 h-6 animate-bounce-slow group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 下载区域 */}
      <section
        id="downloads"
        data-scroll-section
        className={`min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 scroll-section ${
          visibleSections.has("downloads") ? "visible" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div
            className={`text-center mb-16 scroll-section stagger-1 ${
              visibleSections.has("downloads") ? "visible" : ""
            }`}
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">反恐精英相关</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 大庙杯比赛 */}
            <div
              className={`group bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200 scroll-section stagger-2 min-h-[600px] ${
                visibleSections.has("downloads") ? "visible" : ""
              }`}
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <ImageWithLoader
                  src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAALCu2ipcp9DeBbt-awILC5hPQGr_XcPAALuFgAC0_xJVQNDQqrjjUI6NgQ.jpg"
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
                    竞赛活动
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
                      <span className="font-medium">赛事回放</span>
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
                className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 scroll-section stagger-3 min-h-[600px] ${
                  visibleSections.has("downloads") ? "visible" : ""
                }`}
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <ImageWithLoader
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
                    {/* 原有下载链接 */}
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

                    {/* 补档链接 */}
                    {game.supplementLinks.map((link, linkIndex) => (
                      <Button
                        key={`supplement-${linkIndex}`}
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

          {/* 继续向下滚动指示器 - 完全居中 */}
          <div
            className={`w-full flex justify-center mt-16 scroll-section stagger-4 ${
              visibleSections.has("downloads") ? "visible" : ""
            }`}
          >
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
      <section
        id="about"
        data-scroll-section
        className={`min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-indigo-50 py-20 scroll-section ${
          visibleSections.has("about") ? "visible" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div
            className={`text-center mb-16 scroll-section stagger-1 ${visibleSections.has("about") ? "visible" : ""}`}
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">关于此站点</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              本站点为公益下载站点，用爱发电，下载资源仅供学习交流，严厉禁止商用和盗版软件。
            </p>
          </div>

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
                  {selectedDownload.linkType === "official"
                    ? "🚀 高速下载"
                    : selectedDownload.linkType === "fast"
                      ? "📦 免解压"
                      : "🔄 补档链接"}
                </Badge>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    let url = ""
                    if (selectedDownload.linkType === "official") {
                      url = "https://wwuq.lanzouq.com/i9WHN30eisdc"
                    } else if (selectedDownload.linkType === "fast") {
                      url = "https://vegcat-1301889594.cos.ap-shanghai.myqcloud.com/cs1.6.7z"
                    } else if (selectedDownload.linkType === "supplement") {
                      // 补档链接暂时使用示例URL，您可以根据需要修改
                      url = "https://musetransfer.com/s/xyh30d6gs"
                    }
                    window.open(url, "_blank")
                    setIsDownloadDialogOpen(false)
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white h-12 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {selectedDownload.linkType === "supplement" ? "开始下载 (提取码: 7143b4)" : "开始下载 (提取码: 6657)"}
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

      {/* Sponsor Dialog */}
      <Dialog open={isSponsorDialogOpen} onOpenChange={setIsSponsorDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[90vw] sm:max-w-2xl max-h-[90vh] rounded-3xl p-0 border border-gray-200 shadow-2xl overflow-hidden mx-4">
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
                    <ImageWithLoader
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
                    <ImageWithLoader
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
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                感谢您的支持！每一份赞助都将用于后续优化网站加载速度和云存储服务，本公益项目的维护和优化离不开大家的支持，希望能为大家提供更好的服务。腾讯云线路的流量有限，请尽可能使用其他线路！谢谢支持。
                <br />
                <span className="text-gray-700 font-medium">我们或许会倒闭，但永远不会变质。</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
