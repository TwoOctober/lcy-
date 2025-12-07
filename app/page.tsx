"use client"

import { useState, useEffect, lazy, Suspense, memo, useCallback } from "react"
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

const CONFIG = {
  // 先行版预览图片
  betaImages: [
    "https://www.helloimg.com/i/2025/12/07/69355676d2a55.png",
    "https://www.helloimg.com/i/2025/12/07/6935568643d85.png",
    "https://www.helloimg.com/i/2025/12/07/69355671aa484.png",
    "https://www.helloimg.com/i/2025/12/07/6935567f1d400.png",
    "https://www.helloimg.com/i/2025/12/07/693556778ce92.png",
    "https://www.helloimg.com/i/2025/12/07/6935567fc5605.png",
    "https://www.helloimg.com/i/2025/12/07/6935567167b08.png",
    "https://www.helloimg.com/i/2025/12/07/69355676f0020.png",
  ],
  // 正式版预览图片
  stableImages: [
    "https://www.helloimg.com/i/2025/12/07/6935600331d46.png",
    "https://www.helloimg.com/i/2025/12/07/69356001e31aa.png",
    "https://www.helloimg.com/i/2025/12/07/69355ff9b1be4.png",
    "https://www.helloimg.com/i/2025/12/07/693560077fa0b.png",
    "https://www.helloimg.com/i/2025/12/07/6935600165e75.png",
    "https://www.helloimg.com/i/2025/12/07/69355ffa227b9.png",
  ],
  // 游戏信息
  game: {
    title: "Counter-Strike 1.6",
    desc: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    cover: "https://www.helloimg.com/i/2025/12/06/693451359f546.jpg",
    size: "99MB",
    lanzouUrl: "https://wwbhc.lanzouq.com/iH3lZ3d23v2f",
    tencentUrl: "https://wwbhc.lanzouq.com/i2e3i3d23waj",
  },
  // 外部链接
  links: {
    damiaoCover: "https://www.helloimg.com/i/2025/12/06/6934513ba9943.jpg",
    replay: "https://b23.tv/x5nXHGj",
    qq: "https://qm.qq.com/q/1NHb1tygHy",
    vegcat: "https://vegcat.icu",
    alipay: "https://www.helloimg.com/i/2025/12/06/693451356dbd5.jpg",
    wechat: "https://www.helloimg.com/i/2025/12/06/69345135bddd8.png",
    feedback: "https://qm.qq.com/q/1tHqgp8OK8",
    ad: "https://img.cdn1.vip/i/6922bac33b11e_1763883715.webp",
  },
}

const openLink = (url: string) => {
  try {
    window.open(url, "_blank", "noopener,noreferrer")
  } catch {
    window.location.href = url
  }
}

const ImageCarousel = memo(({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]))
  const [err, setErr] = useState(false)

  // 预加载所有图片
  useEffect(() => {
    if (images.length === 0) return
    images.forEach((src, i) => {
      if (i === 0) return
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded((prev) => new Set([...prev, i]))
    })
  }, [images])

  // 自动轮播
  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % images.length)
      setErr(false)
    }, 4000)
    return () => clearInterval(t)
  }, [images.length])

  const go = useCallback(
    (dir: number) => {
      setIdx((p) => (p + dir + images.length) % images.length)
      setErr(false)
    },
    [images.length],
  )

  if (images.length === 0) {
    return (
      <div className="space-y-2">
        <p className="text-xs text-gray-500 font-medium text-center">版本预览</p>
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">敬请期待</p>
        </div>
      </div>
    )
  }

  const isLoaded = loaded.has(idx)

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 font-medium text-center">版本预览</p>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden">
        <div className="aspect-[16/10] relative">
          {!isLoaded && !err && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          {!err ? (
            <img
              src={images[idx] || "/placeholder.svg"}
              alt={`预览 ${idx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: isLoaded ? 1 : 0 }}
              onLoad={() => setLoaded((prev) => new Set([...prev, idx]))}
              onError={() => setErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">加载失败</div>
          )}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIdx(i)
                    setErr(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-white w-4" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
})
ImageCarousel.displayName = "ImageCarousel"

const SideAds = lazy(() =>
  Promise.resolve({
    default: () => (
      <>
        {[false, true].map((isRight) => (
          <div
            key={isRight ? "r" : "l"}
            className={`fixed ${isRight ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 z-40 hidden 2xl:block hover:-translate-y-[calc(50%+4px)] transition-transform`}
          >
            <div
              onClick={() => openLink(CONFIG.links.feedback)}
              className="cursor-pointer bg-white p-2 rounded-xl shadow-lg border border-black/5"
            >
              <img src={CONFIG.links.ad || "/placeholder.svg"} alt="广告" className="w-36 rounded-lg" loading="lazy" />
            </div>
          </div>
        ))}
      </>
    ),
  }),
)

export default function GameDownloadSite() {
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false })
  const [imgErr, setImgErr] = useState<Set<string>>(new Set())
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowAds(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const toggle = useCallback((k: keyof typeof dialogs, v?: boolean) => {
    setDialogs((p) => ({ ...p, [k]: v ?? !p[k] }))
  }, [])

  const onImgErr = useCallback((id: string) => setImgErr((p) => new Set([...p, id])), [])

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-black/10">
      <style jsx>{`
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:3px}
        .lanzou-btn{position:relative;overflow:hidden}
        .lanzou-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transition:left .4s}
        .lanzou-btn:hover::before{left:100%}
        @media(hover:none){.lanzou-btn:hover::before{left:-100%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .animate-spin{animation:spin .8s linear infinite}
      `}</style>

      <main className="min-h-screen flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto">
          {/* 公告栏 */}
          <div
            onClick={() => openLink(CONFIG.links.feedback)}
            className="cursor-pointer mb-6 sm:mb-10 rounded-2xl bg-white shadow-sm border border-black/5 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <Bug className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900">报告游戏漏洞 / 期望添加功能</h3>
                    <p className="text-gray-500 text-xs hidden sm:block">点击加入QQ群反馈问题或建议</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-bold text-sm bg-amber-100/50 px-3 py-1.5 rounded-lg">
                  <span className="hidden sm:inline">立即反馈</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* 主卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-8">
            {/* 大庙杯 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-black/5">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                {!imgErr.has("damiao") ? (
                  <img
                    src={CONFIG.links.damiaoCover || "/placeholder.svg"}
                    alt="大庙杯"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => onImgErr("damiao")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Trophy className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800">大庙杯比赛</h2>
                  <Badge className="bg-slate-700 text-white text-xs px-2 py-1 rounded-full">电竞赛事</Badge>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  2026届CS2大庙杯比赛开始报名，请加群770429361咨询
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => openLink(CONFIG.links.replay)}
                    className="w-full justify-between h-11 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      赛事回放
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </Button>
                  <Button
                    onClick={() => openLink(CONFIG.links.qq)}
                    variant="outline"
                    className="w-full justify-between h-11 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      交流Q群
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>
              </div>
            </article>

            {/* CS1.6 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-black/5">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                {!imgErr.has("cs16") ? (
                  <img
                    src={CONFIG.game.cover || "/placeholder.svg"}
                    alt={CONFIG.game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => onImgErr("cs16")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Download className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{CONFIG.game.title}</h2>
                  <Badge className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">经典游戏</Badge>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{CONFIG.game.desc}</p>
                <div className="space-y-2">
                  <Button
                    onClick={() => toggle("lanzou", true)}
                    className="w-full justify-between h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm lanzou-btn"
                  >
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      正式版下载
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 text-white text-xs px-2 py-0.5">推荐</Badge>
                      <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono">{CONFIG.game.size}</span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => toggle("tencent", true)}
                    variant="outline"
                    className="w-full justify-between h-11 border-2 border-gray-100 text-gray-900 hover:bg-gray-50 rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      先行版下载
                    </span>
                    <span className="text-xs bg-gray-50 px-2 py-0.5 rounded-full text-gray-500 font-mono border">
                      {CONFIG.game.size}
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* 底部 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mb-10">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Vegcat.icu</h3>
                  <p className="text-gray-500 text-sm">探索关于站点和站长的信息</p>
                </div>
                <Button
                  onClick={() => openLink(CONFIG.links.vegcat)}
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-4 rounded-lg"
                >
                  <Globe className="w-4 h-4 mr-1.5" />
                  跳转
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">赞助支持</h3>
                  <p className="text-gray-500 text-sm">支持我们的优化体验</p>
                </div>
                <Button
                  onClick={() => toggle("sponsor", true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 rounded-lg shadow-sm"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  支持
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-6 pb-4 text-center">
            <p className="text-gray-900 font-bold text-sm mb-1">© 2025 Vegcat. All rights reserved.</p>
            <p className="text-gray-400 text-xs">我们或许会倒闭，但永远不会变质。</p>
          </footer>
        </div>
      </main>

      {showAds && (
        <Suspense fallback={null}>
          <SideAds />
        </Suspense>
      )}

      {/* 正式版下载弹窗 */}
      <Dialog open={dialogs.lanzou} onOpenChange={(v) => toggle("lanzou", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-2xl p-4 sm:p-5 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900 text-center mb-3">正式版下载</DialogTitle>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-800 mb-1">使用前必读</h4>
                <ul className="text-red-700 text-xs space-y-0.5">
                  <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                  <li>• 无法使用请回退版本至wwuq.lanzouq.com/iHl9w3a4ub0j</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <ImageCarousel images={CONFIG.stableImages} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                openLink(CONFIG.game.lanzouUrl)
                toggle("lanzou", false)
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-10 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("lanzou", false)}
              className="px-4 border-2 border-gray-100 h-10 rounded-xl font-bold text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 先行版下载弹窗 */}
      <Dialog open={dialogs.tencent} onOpenChange={(v) => toggle("tencent", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-2xl p-4 sm:p-5 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900 text-center mb-3">先行版下载</DialogTitle>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-800 mb-1">使用前必读</h4>
                <ul className="text-red-700 text-xs space-y-0.5">
                  <li>• 请先运行免CDKEY补丁后再打开cstrike.exe</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <ImageCarousel images={CONFIG.betaImages} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                openLink(CONFIG.game.tencentUrl)
                toggle("tencent", false)
              }}
              className="flex-1 bg-gray-900 hover:bg-black text-white h-10 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("tencent", false)}
              className="px-4 border-2 border-gray-100 h-10 rounded-xl font-bold text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 赞助弹窗 */}
      <Dialog open={dialogs.sponsor} onOpenChange={(v) => toggle("sponsor", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-xl rounded-2xl p-0 overflow-hidden border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 sm:p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">赞助支持</h2>
            <p className="text-pink-100 text-sm">您的支持是我们更新的动力</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-6">
              <div className="flex flex-col items-center">
                <span className="bg-blue-50 text-blue-600 font-bold text-sm px-3 py-1 rounded-lg mb-3">支付宝</span>
                <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200">
                  {!imgErr.has("alipay") ? (
                    <img
                      src={CONFIG.links.alipay || "/placeholder.svg"}
                      alt="支付宝"
                      className="w-28 h-28 sm:w-40 sm:h-40 object-contain rounded-lg"
                      onError={() => onImgErr("alipay")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-xs">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-green-50 text-green-600 font-bold text-sm px-3 py-1 rounded-lg mb-3">微信支付</span>
                <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200">
                  {!imgErr.has("wechat") ? (
                    <img
                      src={CONFIG.links.wechat || "/placeholder.svg"}
                      alt="微信"
                      className="w-28 h-28 sm:w-40 sm:h-40 object-contain rounded-lg"
                      onError={() => onImgErr("wechat")}
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
              onClick={() => toggle("sponsor", false)}
              className="w-full h-10 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold text-sm"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
