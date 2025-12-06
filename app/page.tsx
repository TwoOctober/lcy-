"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Download,
  ExternalLink,
  Globe,
  Trophy,
  AlertTriangle,
  Heart,
  Bug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const previewImages = [
  // 在这里添加图片URL，留空则显示"敬请期待"
  // 例如: "https://example.com/image1.jpg",
]

// 精简的游戏数据
const gameData = {
  title: "Counter-Strike 1.6",
  description: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
  image:
    "https://p.sda1.dev/29/52ed7e91cfdc21910a6c8e0aa8e1a608/BQACAgUAAyEGAASHRsPbAAECLkhozW1WxGHQtjoDMnepyRsL1IeA4gACdxsAAhwQaVYIRxkAARbi2bg2BA.jpg",
  size: "99MB",
  lanzouUrl: "https://wwuq.lanzouq.com/ikXH33c7q0cb",
  tencentUrl: "https://wwuq.lanzouq.com/ipRcq3c554je",
}

// 外部链接数据
const links = {
  damiao:
    "https://p.sda1.dev/29/e974df0c40e6aaeadcb43080f24cbd42/BQACAgUAAyEGAASHRsPbAAECc91o0AR4-yAX_bP8VOxpp7aCmgABkeYAAhokAAKyroBWF02IBWGJyCE2BA.jpg",
  replay: "https://b23.tv/x5nXHGj",
  qq: "https://qm.qq.com/q/1NHb1tygHy",
  vegcat: "https://vegcat.icu",
  alipay:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjdozWkx_Tzf8tD4ovL6_zNKtFBJhQACYBsAAhwQaVZk35uDBd5K1TYE.jpg",
  wechat:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjZozWkxKgi3DGDBEcVBrOxW6vQpEAACXxsAAhwQaVYo2_9lfUr8GDYE.png",
  feedback: "https://qm.qq.com/q/1tHqgp8OK8",
  ad: "https://img.cdn1.vip/i/6922bac33b11e_1763883715.webp",
}

// 立即可用的跳转函数
const openLink = (url: string) => {
  try {
    window.open(url, "_blank", "noopener,noreferrer")
  } catch (e) {
    window.location.href = url
  }
}

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (previewImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % previewImages.length)
      setIsLoading(true)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (previewImages.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
        <div className="text-gray-400 text-sm font-medium">敬请期待</div>
        <div className="text-gray-300 text-xs mt-1">游戏截图即将上线</div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-100 rounded-xl overflow-hidden">
      <div className="aspect-video relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
        {!imageError ? (
          <img
            src={previewImages[currentIndex] || "/placeholder.svg"}
            alt={`预览图 ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setImageError(true)
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">图片加载失败</div>
        )}
      </div>
      {previewImages.length > 1 && (
        <>
          <button
            onClick={() => {
              setCurrentIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length)
              setIsLoading(true)
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setCurrentIndex((prev) => (prev + 1) % previewImages.length)
              setIsLoading(true)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {previewImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i)
                  setIsLoading(true)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const SideAds = lazy(() =>
  Promise.resolve({
    default: () => (
      <>
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:block hover:-translate-y-[calc(50%+5px)] transition-transform duration-300">
          <div
            onClick={() => openLink(links.feedback)}
            className="cursor-pointer bg-white p-2 rounded-2xl shadow-xl border border-black/5"
          >
            <img
              src={links.ad || "/placeholder.svg"}
              alt="广告"
              className="w-[160px] h-auto rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:block hover:-translate-y-[calc(50%+5px)] transition-transform duration-300">
          <div
            onClick={() => openLink(links.feedback)}
            className="cursor-pointer bg-white p-2 rounded-2xl shadow-xl border border-black/5"
          >
            <img
              src={links.ad || "/placeholder.svg"}
              alt="广告"
              className="w-[160px] h-auto rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </>
    ),
  }),
)

export default function GameDownloadSite() {
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false })
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAds(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleDialog = (type: keyof typeof dialogs, state?: boolean) => {
    setDialogs((prev) => ({ ...prev, [type]: state ?? !prev[type] }))
  }

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => new Set([...prev, imageId]))
  }

  const handleDownload = (type: "lanzou" | "tencent") => {
    toggleDialog(type, true)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] relative overflow-hidden font-sans selection:bg-black/10">
      <style jsx>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
        .lanzou-btn { position: relative; overflow: hidden; }
        .lanzou-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .lanzou-btn:hover::before { left: 100%; }
        @media (hover: none) { .lanzou-btn:hover::before { left: -100%; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>

      <main className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full mb-8 sm:mb-12">
            <div
              onClick={() => openLink(links.feedback)}
              className="cursor-pointer relative w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-black/5 hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-8 sm:py-6 gap-3 sm:gap-0">
                <div className="flex items-center gap-4 w-full sm:w-auto justify-start">
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm border border-black/5 flex-shrink-0">
                    <Bug className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div className="text-left flex-1 sm:flex-none">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight mb-0.5 sm:mb-1">
                      报告游戏漏洞 / 期望添加功能
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">点击加入QQ群反馈问题或建议</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-bold bg-amber-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl group-hover:bg-amber-100 transition-colors w-full sm:w-auto justify-center sm:justify-start text-sm sm:text-base">
                  <span>立即反馈</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* 主卡片区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-6 sm:mb-10">
            {/* 大庙杯比赛 */}
            <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:-translate-y-1">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {!imageErrors.has("damiao") ? (
                  <img
                    src={links.damiao || "/placeholder.svg"}
                    alt="福州四中反恐精英联赛"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError("damiao")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Trophy className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">大庙杯比赛</h2>
                  <Badge className="bg-slate-700 text-white hover:bg-slate-800 px-3 py-1.5 text-xs font-medium rounded-full border-0">
                    电竞赛事
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 font-medium leading-relaxed">
                  2026届CS2大庙杯比赛开始报名，请加群咨询
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => openLink(links.replay)}
                    className="w-full justify-between h-12 sm:h-14 px-6 bg-slate-700 hover:bg-slate-800 text-white rounded-2xl text-sm sm:text-base font-bold shadow-lg shadow-slate-200"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Trophy className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="truncate">赛事回放</span>
                    </div>
                    <ExternalLink className="w-5 h-5 flex-shrink-0 opacity-50" />
                  </Button>
                  <Button
                    onClick={() => openLink(links.qq)}
                    variant="outline"
                    className="w-full justify-between h-12 sm:h-14 px-6 border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-2xl text-sm sm:text-base font-bold"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Globe className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="truncate">交流Q群</span>
                    </div>
                    <ExternalLink className="w-5 h-5 flex-shrink-0 text-slate-400" />
                  </Button>
                </div>
              </div>
            </article>

            {/* CS 1.6 游戏 */}
            <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:-translate-y-1">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {!imageErrors.has("cs16") ? (
                  <img
                    src={gameData.image || "/placeholder.svg"}
                    alt={gameData.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError("cs16")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Download className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{gameData.title}</h2>
                  <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 text-xs font-medium rounded-full border-0">
                    经典游戏
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 font-medium leading-relaxed">
                  {gameData.description}
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleDownload("lanzou")}
                    className="w-full justify-between h-12 sm:h-14 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm sm:text-base font-bold shadow-lg shadow-indigo-100 lanzou-btn"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Download className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="truncate">正式版下载</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className="bg-white/20 text-white px-2 py-0.5 text-xs border-0 backdrop-blur-sm">
                        推荐
                      </Badge>
                      <span className="text-xs sm:text-sm bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm font-mono">
                        {gameData.size}
                      </span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => handleDownload("tencent")}
                    variant="outline"
                    className="w-full justify-between h-12 sm:h-14 px-6 border-2 border-gray-100 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-200 rounded-2xl text-sm sm:text-base font-bold"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Download className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="truncate">先行版下载</span>
                    </div>
                    <span className="text-xs sm:text-sm bg-gray-50 px-3 py-1 rounded-full flex-shrink-0 text-gray-500 font-mono border border-gray-100">
                      {gameData.size}
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* 底部信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Vegcat.icu</h3>
                  <p className="text-gray-500 text-sm font-medium">探索关于站点和站长的信息。</p>
                </div>
                <Button
                  onClick={() => openLink(links.vegcat)}
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-xl"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  点击跳转
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">赞助支持</h3>
                  <p className="text-gray-500 text-sm font-medium">支持我们的优化体验。</p>
                </div>
                <Button
                  onClick={() => toggleDialog("sponsor", true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg shadow-rose-100"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  支持我们
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-8 sm:pt-12 pb-8 text-center">
            <p className="text-gray-900 font-bold text-sm mb-2">© 2025 Vegcat. All rights reserved.</p>
            <p className="text-gray-500 text-xs font-medium">我们或许会倒闭，但永远不会变质。</p>
          </footer>
        </div>
      </main>

      {showAds && (
        <Suspense fallback={null}>
          <SideAds />
        </Suspense>
      )}

      <Dialog open={dialogs.lanzou} onOpenChange={(open) => toggleDialog("lanzou", open)}>
        <DialogContent className="bg-white max-w-[95vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border-0 shadow-2xl mx-2">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
              重要提醒
            </DialogTitle>
          </DialogHeader>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-red-800 mb-1 sm:mb-2">使用前必读</h4>
                <ul className="space-y-1 text-red-700 font-medium text-xs sm:text-sm">
                  <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                  <li>• 无法使用请回退版本至wwuq.lanzouq.com/iHl9w3a4ub0j</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-3 sm:mb-4">
            <ImageCarousel />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-blue-200">
            <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">稳定线路</p>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
              推荐下载
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(gameData.lanzouUrl)
                toggleDialog("lanzou", false)
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">开始下载 (提取码: 6657)</span>
              <span className="sm:hidden">下载 (6657)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleDialog("lanzou", false)}
              className="flex-1 border-2 border-gray-100 h-12 rounded-xl font-bold text-sm hover:bg-gray-50"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.tencent} onOpenChange={(open) => toggleDialog("tencent", open)}>
        <DialogContent className="bg-white max-w-[95vw] sm:max-w-lg rounded-3xl p-6 sm:p-8 border-0 shadow-2xl mx-2">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
              重要提醒
            </DialogTitle>
          </DialogHeader>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-red-800 mb-1 sm:mb-2">使用前必读</h4>
                <ul className="space-y-1 text-red-700 font-medium text-xs sm:text-sm">
                  <li>• 请先运行免CDKEY补丁后再打开cstrike.exe</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-3 sm:mb-4">
            <ImageCarousel />
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-green-200">
            <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">先行版</p>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
              最新版本
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(gameData.tencentUrl)
                toggleDialog("tencent", false)
              }}
              className="flex-1 bg-gray-900 hover:bg-black text-white h-12 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>前往下载</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleDialog("tencent", false)}
              className="flex-1 border-2 border-gray-100 h-12 rounded-xl font-bold text-sm hover:bg-gray-50"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.sponsor} onOpenChange={(open) => toggleDialog("sponsor", open)}>
        <DialogContent className="bg-white max-w-[95vw] sm:max-w-2xl rounded-3xl p-0 overflow-hidden border-0 shadow-2xl mx-2">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">赞助支持</h2>
            <p className="text-pink-100 text-sm">您的支持是我们更新的动力</p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6">
              {/* 支付宝 - 左侧 */}
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl px-3 py-1.5 mb-3">
                  <span className="font-bold text-sm sm:text-base whitespace-nowrap">支付宝</span>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded-xl border-2 border-dashed border-gray-200 shadow-sm">
                  {!imageErrors.has("alipay") ? (
                    <img
                      src={links.alipay || "/placeholder.svg"}
                      alt="Alipay"
                      className="w-28 h-28 sm:w-40 sm:h-40 object-contain rounded-lg"
                      onError={() => handleImageError("alipay")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-xs">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
              {/* 微信 - 右侧 */}
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center bg-green-50 text-green-600 rounded-xl px-3 py-1.5 mb-3">
                  <span className="font-bold text-sm sm:text-base whitespace-nowrap">微信支付</span>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded-xl border-2 border-dashed border-gray-200 shadow-sm">
                  {!imageErrors.has("wechat") ? (
                    <img
                      src={links.wechat || "/placeholder.svg"}
                      alt="WeChat"
                      className="w-28 h-28 sm:w-40 sm:h-40 object-contain rounded-lg"
                      onError={() => handleImageError("wechat")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-xs">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => toggleDialog("sponsor", false)}
              className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold text-sm"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
