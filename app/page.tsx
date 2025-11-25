"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, ExternalLink, Globe, Trophy, AlertTriangle, Heart, Megaphone } from "lucide-react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// 精简的游戏数据
const gameData = {
  title: "Counter-Strike 1.6",
  description: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
  image:
    "https://p.sda1.dev/29/52ed7e91cfdc21910a6c8e0aa8e1a608/BQACAgUAAyEGAASHRsPbAAECLkhozW1WxGHQtjoDMnepyRsL1IeA4gACdxsAAhwQaVYIRxkAARbi2bg2BA.jpg",
  size: "99MB",
  lanzouUrl: "https://wwuq.lanzouq.com/iPJwq3c5582b",
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

  const contactUrl = "https://qm.qq.com/q/iEXZkvW1pK"

  return (
    <div className="min-h-screen bg-[#F5F5F7] relative overflow-hidden font-sans selection:bg-black/10">
      <style jsx>{`
        /* 移除所有复杂动画，只保留冰雪飘落效果 */
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
        
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .lanzou-btn:hover::before {
          left: 100%;
        }
        
        @media (hover: none) {
          .lanzou-btn:hover::before { left: -100%; }
        }
      `}</style>

      <main className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* 广告位 */}
          <div className="w-full mb-8 sm:mb-12">
            <div
              onClick={() => openLink(contactUrl)}
              className="cursor-pointer relative w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-black/5 hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>

              <div className="relative flex flex-col sm:flex-row items-center justify-between px-6 py-5 sm:px-8 sm:py-6 gap-4 sm:gap-0">
                <div className="flex items-center gap-5 w-full sm:w-auto justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-black/5 flex-shrink-0">
                    <Megaphone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left flex-1 sm:flex-none">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">见字如面明信片购买</h3>
                    <p className="text-gray-500 text-sm font-medium">添加QQ 1145145797 咨询</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-5 py-2.5 rounded-xl group-hover:bg-indigo-100 transition-colors w-full sm:w-auto justify-center sm:justify-start">
                  <span>联系我们</span>
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
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">大庙杯比赛</h2>
                  <Badge className="bg-black text-white hover:bg-gray-800 px-3 py-1.5 text-xs font-medium rounded-full border-0">
                    电竞赛事
                  </Badge>
                </div>

                <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 font-medium leading-relaxed">
                  2026届CS2大庙杯比赛开始报名，请加群咨询
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => openLink(links.replay)}
                    className="w-full justify-between h-12 sm:h-14 px-6 bg-gray-900 hover:bg-black text-white rounded-2xl text-sm sm:text-base font-bold shadow-lg shadow-gray-200"
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
                    className="w-full justify-between h-12 sm:h-14 px-6 border-2 border-gray-100 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-200 rounded-2xl text-sm sm:text-base font-bold"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <Globe className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="truncate">交流Q群</span>
                    </div>
                    <ExternalLink className="w-5 h-5 flex-shrink-0 text-gray-400" />
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

                  {/* 腾讯云 */}
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

      {/* 左侧广告 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:block hover:-translate-y-[calc(50%+5px)] transition-transform duration-300">
        <div
          onClick={() => openLink(contactUrl)}
          className="cursor-pointer bg-white p-2 rounded-2xl shadow-xl border border-black/5"
        >
          <img
            src="https://img.cdn1.vip/i/6922bac33b11e_1763883715.webp"
            alt="广告"
            className="w-[160px] h-auto rounded-xl"
          />
        </div>
      </div>

      {/* 右侧广告 */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:block hover:-translate-y-[calc(50%+5px)] transition-transform duration-300">
        <div
          onClick={() => openLink(contactUrl)}
          className="cursor-pointer bg-white p-2 rounded-2xl shadow-xl border border-black/5"
        >
          <img
            src="https://img.cdn1.vip/i/6922bac33b11e_1763883715.webp"
            alt="广告"
            className="w-[160px] h-auto rounded-xl"
          />
        </div>
      </div>

      {/* 精简的对话框 */}
      {/* 蓝奏云对话框 */}
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

      {/* 腾讯云对话框 */}
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

      {/* 赞助对话框 */}
      <Dialog open={dialogs.sponsor} onOpenChange={(open) => toggleDialog("sponsor", open)}>
        <DialogContent className="bg-white max-w-[95vw] sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl [&>button]:hidden mx-2">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">赞助支持</h2>
            <p className="text-pink-100 text-sm">您的支持是我们更新的动力</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="text-center w-full">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl mb-3">
                  <span className="font-bold text-xl">支付宝</span>
                </div>
                <div className="bg-white p-2 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm mx-auto w-fit">
                  {!imageErrors.has("alipay") ? (
                    <img
                      src={links.alipay || "/placeholder.svg"}
                      alt="Alipay"
                      className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-xl"
                      onError={() => handleImageError("alipay")}
                    />
                  ) : (
                    <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400">
                      二维码加载失败
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full h-px bg-gray-100"></div>

              <div className="text-center w-full">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-500 rounded-2xl mb-3">
                  <span className="font-bold text-xl">微信</span>
                </div>
                <div className="bg-white p-2 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm mx-auto w-fit">
                  {!imageErrors.has("wechat") ? (
                    <img
                      src={links.wechat || "/placeholder.svg"}
                      alt="WeChat"
                      className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-xl"
                      onError={() => handleImageError("wechat")}
                    />
                  ) : (
                    <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400">
                      二维码加载失败
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
