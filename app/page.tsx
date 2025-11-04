"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, ExternalLink, Globe, Trophy, AlertTriangle, Heart } from "lucide-react"

// 精简的游戏数据
const gameData = {
  title: "Counter-Strike 1.6",
  description: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
  image:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECdAxo0AWk02omTDjQjLlLVnt0ZVbQiQACWSQAArKugFbNcleb5oROKDYE.jpg",
  size: "99MB",
  lanzouUrl: "https://wwuq.lanzouq.com/iOLmc39hkuyj",
  tencentUrl: "https://wwuq.lanzouq.com/iSEcv39hkrqd",
}
// 外部链接数据
const links = {
  damiao:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECdApo0AWh23SX_Bj3NzCgiSV8AAHT8rUAAlckAAKyroBWB_fpxvgP_OU2BA.jpg",
  replay: "https://b23.tv/x5nXHGj",
  qq: "https://qm.qq.com/q/1NHb1tygHy",
  vegcat: "https://vegcat.icu",
  alipay:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjdozWkx_Tzf8tD4ovL6_zNKtFBJhQACYBsAAhwQaVZk35uDBd5K1TYE.jpg",
  wechat:
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECLjZozWkxKgi3DGDBEcVBrOxW6vQpEAACXxsAAhwQaVYo2_9lfUr8GDYE.png",
}

// 立即可用的跳转函数
const openLink = (url: string) => {
  try {
    window.open(url, "_blank", "noopener,noreferrer")
  } catch (e) {
    window.location.href = url
  }
}

export default function GameDownloadSite() {
  const [dialogs, setDialogs] = useState({
    sponsor: false,
    lanzou: false,
    tencent: false,
  })
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  // 简化的移动端检测
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 对话框控制
  const toggleDialog = (type: keyof typeof dialogs, state?: boolean) => {
    setDialogs((prev) => ({ ...prev, [type]: state ?? !prev[type] }))
  }

  // 图片错误处理
  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => new Set([...prev, imageId]))
  }

  // 立即可用的下载处理
  const handleDownload = (type: "lanzou" | "tencent") => {
    if (type === "lanzou") {
      toggleDialog("lanzou", true)
    } else {
      toggleDialog("tencent", true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <style jsx>{`
        /* 最小化CSS - 只保留必要样式 */
        html { scroll-behavior: smooth; }
        
        @media (max-width: 768px) {
          * { -webkit-transform: translateZ(0); transform: translateZ(0); }
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 3px; }
        
        .lanzou-btn {
          position: relative;
          overflow: hidden;
        }
        .lanzou-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .lanzou-btn:hover::before {
          left: 100%;
        }
        
        @media (hover: none) {
          .lanzou-btn:hover::before { left: -100%; }
        }
      `}</style>

      {/* 主内容 - 单一section减少DOM */}
      <main className="min-h-screen flex flex-col justify-center py-4 sm:py-8 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* 主卡片区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
            {/* 大庙杯比赛 */}
            <article className="group bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/50">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {!imageErrors.has("damiao") ? (
                  <img
                    src={links.damiao || "/placeholder.svg"}
                    alt="大庙杯比赛"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError("damiao")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Trophy className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">大庙杯比赛</h2>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    竞赛活动
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  2025届CS2大庙杯比赛已结赛，期待下一次的相遇~
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <Button
                    onClick={() => openLink(links.replay)}
                    className="w-full justify-between h-10 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="font-medium">赛事回放</span>
                    </div>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  </Button>
                  <Button
                    onClick={() => openLink(links.qq)}
                    variant="outline"
                    className="w-full justify-between h-10 sm:h-12 px-4 sm:px-6 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl sm:rounded-2xl text-sm sm:text-base"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="font-medium">比赛交流群</span>
                    </div>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            </article>

            {/* CS 1.6 游戏 */}
            <article className="group bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/50">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {!imageErrors.has("cs16") ? (
                  <img
                    src={gameData.image || "/placeholder.svg"}
                    alt={gameData.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError("cs16")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Download className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{gameData.title}</h2>
                  <Badge className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    经典游戏
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{gameData.description}</p>

                <div className="space-y-2 sm:space-y-3">
                  {/* 蓝奏云 - 醒目但平衡 */}
                  <Button
                    onClick={() => handleDownload("lanzou")}
                    className="w-full justify-between h-10 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base lanzou-btn"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="font-medium">正式版下载</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className="bg-white/20 text-white px-2 py-0.5 text-xs">推荐</Badge>
                      <span className="text-xs sm:text-sm bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                        {gameData.size}
                      </span>
                    </div>
                  </Button>

                  {/* 腾讯云 */}
                  <Button
                    onClick={() => handleDownload("tencent")}
                    variant="outline"
                    className="w-full justify-between h-10 sm:h-12 px-4 sm:px-6 border-2 border-gray-200 hover:bg-gray-900 hover:text-white rounded-xl sm:rounded-2xl text-sm sm:text-base"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="font-medium">测试版下载</span>
                    </div>
                    <span className="text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
                      {gameData.size}
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* 底部信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Vegcat.icu</h3>
                  <p className="text-gray-600 text-sm sm:text-base">探索关于站点和站长的信息以及接下来的更新计划。</p>
                </div>
                <Button
                  onClick={() => openLink(links.vegcat)}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-4 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-sm sm:text-base whitespace-nowrap"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  点击跳转
                  <ExternalLink className="w-3 h-3 ml-1 sm:ml-2" />
                </Button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">赞助支持</h3>
                  <p className="text-gray-600 text-sm sm:text-base">支持我们的更好的优化体验和尽量不倒闭。</p>
                </div>
                <Button
                  onClick={() => toggleDialog("sponsor", true)}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-4 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-sm sm:text-base whitespace-nowrap"
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  支持我们
                  <ExternalLink className="w-3 h-3 ml-1 sm:ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white/60 backdrop-blur-sm border-t border-white/50 py-4 sm:py-6 rounded-2xl">
            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-gray-600 text-xs sm:text-sm">© 2025 Vegcat. All rights reserved.</p>
              <p className="text-gray-500 text-xs">我们或许会倒闭，但永远不会变质。</p>
            </div>
          </footer>
        </div>
      </main>

      {/* 精简的对话框 */}
      {/* 蓝奏云对话框 */}
      <Dialog open={dialogs.lanzou} onOpenChange={(open) => toggleDialog("lanzou", open)}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[95vw] sm:max-w-lg rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-2xl mx-2 sm:mx-4">
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
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-blue-200">
            <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">稳定线路</p>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
              推荐下载
            </Badge>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={() => {
                openLink(gameData.lanzouUrl)
                toggleDialog("lanzou", false)
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-10 sm:h-12 rounded-xl font-bold text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">开始下载 (提取码: 6657)</span>
              <span className="sm:hidden">下载 (6657)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleDialog("lanzou", false)}
              className="flex-1 border-2 border-gray-300 h-10 sm:h-12 rounded-xl font-bold text-xs sm:text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 腾讯云对话框 */}
      <Dialog open={dialogs.tencent} onOpenChange={(open) => toggleDialog("tencent", open)}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[95vw] sm:max-w-lg rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-2xl mx-2 sm:mx-4">
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

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-green-200">
            <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900">Counter-Strike 1.6</h3>
            <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">武器模型测试版</p>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
              测试用
            </Badge>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={() => {
                openLink(gameData.tencentUrl)
                toggleDialog("tencent", false)
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-10 sm:h-12 rounded-xl font-bold text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              开始下载（提取码：6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleDialog("tencent", false)}
              className="flex-1 border-2 border-gray-300 h-10 sm:h-12 rounded-xl font-bold text-xs sm:text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 赞助对话框 */}
      <Dialog open={dialogs.sponsor} onOpenChange={(open) => toggleDialog("sponsor", open)}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-[95vw] sm:max-w-2xl max-h-[90vh] rounded-2xl p-0 border border-gray-200 shadow-2xl overflow-hidden mx-2 sm:mx-4">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 text-center text-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold">支持我们</h2>
          </div>

          <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-200 w-full max-w-xs">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src={links.alipay || "/placeholder.svg"}
                      alt="支付宝收款码"
                      className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 text-center">
                    支付宝支付
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center">赞助支持打造共享家园</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-200 w-full max-w-xs">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src={links.wechat || "/placeholder.svg"}
                      alt="微信收款码"
                      className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 text-center">
                    微信支付
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center">公开所有赞助收入 不可能不交。！</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-200 mb-4 mt-4 sm:mt-6">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
                感谢您的支持！每一份赞助都将用于后续优化网站加载速度和云存储服务，本公益项目的维护和优化离不开大家的支持，希望能为大家提供更好的服务。腾讯云线路的流量有限，请尽可能使用其他线路！谢谢支持。
                <br />
                <span className="text-gray-700 font-medium">我们或许会倒闭，但永远不会变质。</span>
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => toggleDialog("sponsor", false)}
                variant="outline"
                className="px-6 sm:px-8 py-2 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-2xl text-sm sm:text-base"
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
