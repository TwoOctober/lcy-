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
  Swords,
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
  // CS1.6游戏信息
  cs16: {
    title: "Counter-Strike 1.6",
    desc: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    cover: "https://www.helloimg.com/i/2025/12/06/693451359f546.jpg",
    stableSize: "94MB",
    betaSize: "99MB",
    lanzouUrl: "https://wwbhc.lanzouq.com/iH3lZ3d23v2f",
    tencentUrl: "https://wwbhc.lanzouq.com/i2e3i3d23waj",
  },
  // 死神vs火影游戏信息
  bvn: {
    title: "死神vs火影",
    desc: "经典的动漫格斗游戏，涵盖死神和火影两大动漫角色，双人对战必玩",
    cover: "/bleach-vs-naruto-anime-fighting-game.jpg",
    size: "50MB",
    downloadUrl: "https://example.com/bvn-download", // 替换为实际下载链接
    previewImages: [], // 死神vs火影预览图片，后续可添加
  },
  // 大庙杯信息
  damiao: {
    title: "大庙杯比赛",
    desc: "2026届CS2大庙杯比赛开始报名，请加群770429361咨询",
    cover: "https://www.helloimg.com/i/2025/12/06/6934513ba9943.jpg",
    replayUrl: "https://b23.tv/x5nXHGj",
    qqUrl: "https://qm.qq.com/q/1NHb1tygHy",
  },
  // 外部链接
  links: {
    vegcat: "https://vegcat.cn",
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

  useEffect(() => {
    if (images.length === 0) return
    images.forEach((src, i) => {
      if (i === 0) return
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded((prev) => new Set([...prev, i]))
    })
  }, [images])

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
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false, bvn: false })
  const [imgErr, setImgErr] = useState<Set<string>>(new Set())
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowAds(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const toggle = useCallback((k: keyof typeof dialogs, v?: boolean) => {
    setDialogs((p) => ({ ...p, [k]: v ?? !p[k] }))
  }, [])

  const onImgErr = useCallback((id: string) => setImgErr((p) => new Set([...p, id])), [])

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-black/10 flex flex-col">
      <style jsx>{`
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:3px}
        .lanzou-btn{position:relative;overflow:hidden}
        .lanzou-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transition:left .4s}
        .lanzou-btn:hover::before{left:100%}
        @media(hover:none){.lanzou-btn:hover::before{left:-100%}}
      `}</style>

      <main className="flex-1 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* 公告栏 */}
          <div
            onClick={() => openLink(CONFIG.links.feedback)}
            className="cursor-pointer mb-8 sm:mb-12 rounded-2xl bg-white shadow-sm border border-black/5 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm">
                    <Bug className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900">报告游戏漏洞 / 期望添加功能</h3>
                    <p className="text-gray-500 text-xs hidden sm:block">点击加入QQ群反馈问题或建议</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-bold text-sm bg-amber-100/50 px-3 py-2 rounded-lg">
                  <span className="hidden sm:inline">立即反馈</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-10">
            {/* 大庙杯 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-black/5">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                {!imgErr.has("damiao") ? (
                  <img
                    src={CONFIG.damiao.cover || "/placeholder.svg"}
                    alt="大庙杯比赛"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
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
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800">{CONFIG.damiao.title}</h2>
                  <Badge className="bg-slate-700 text-white text-xs px-2.5 py-1 rounded-full">电竞赛事</Badge>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{CONFIG.damiao.desc}</p>
                <div className="space-y-2.5">
                  <Button
                    onClick={() => openLink(CONFIG.damiao.replayUrl)}
                    className="w-full justify-between h-12 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      赛事回放
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </Button>
                  <Button
                    onClick={() => openLink(CONFIG.damiao.qqUrl)}
                    variant="outline"
                    className="w-full justify-between h-12 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-sm"
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
                    src={CONFIG.cs16.cover || "/placeholder.svg"}
                    alt="Counter-Strike 1.6 中文版下载"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
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
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">{CONFIG.cs16.title}</h1>
                  <Badge className="bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full">经典游戏</Badge>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{CONFIG.cs16.desc}</p>
                <div className="space-y-2.5">
                  <Button
                    onClick={() => toggle("lanzou", true)}
                    className="w-full justify-between h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm lanzou-btn"
                  >
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      正式版下载
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 text-white text-xs px-2 py-0.5">推荐</Badge>
                      <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono">
                        {CONFIG.cs16.stableSize}
                      </span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => toggle("tencent", true)}
                    variant="outline"
                    className="w-full justify-between h-12 border-2 border-gray-100 text-gray-900 hover:bg-gray-50 rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      先行版下载
                    </span>
                    <span className="text-xs bg-gray-50 px-2 py-0.5 rounded-full text-gray-500 font-mono border">
                      {CONFIG.cs16.betaSize}
                    </span>
                  </Button>
                </div>
              </div>
            </article>

            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-black/5">
              <div className="aspect-[16/9] bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 overflow-hidden relative">
                {!imgErr.has("bvn") ? (
                  <img
                    src={CONFIG.bvn.cover || "/placeholder.svg"}
                    alt="死神vs火影下载"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={() => onImgErr("bvn")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    <Swords className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{CONFIG.bvn.title}</h2>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2.5 py-1 rounded-full">
                    格斗游戏
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{CONFIG.bvn.desc}</p>
                <div className="space-y-2.5">
                  <Button
                    onClick={() => toggle("bvn", true)}
                    className="w-full justify-between h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold text-sm"
                  >
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      立即下载
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">{CONFIG.bvn.size}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl font-bold text-sm bg-transparent"
                    onClick={() => openLink(CONFIG.damiao.qqUrl)}
                  >
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      加入社区
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* 底部 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8 sm:mb-12">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">Vegcat.cn</h3>
                  <p className="text-gray-500 text-sm">探索关于站点和站长的信息</p>
                </div>
                <Button
                  onClick={() => openLink(CONFIG.links.vegcat)}
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-5 h-11 rounded-xl"
                >
                  <Globe className="w-4 h-4 mr-1.5" />
                  跳转
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">赞助支持</h3>
                  <p className="text-gray-500 text-sm">支持我们的优化体验</p>
                </div>
                <Button
                  onClick={() => toggle("sponsor", true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 h-11 rounded-xl shadow-sm"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  支持
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center bg-[#F5F5F7]">
        <p className="text-gray-900 font-bold text-sm mb-1">© 2025 Vegcat. All rights reserved.</p>
        <p className="text-gray-400 text-xs">我们或许会倒闭，但永远不会变质。</p>
      </footer>

      {showAds && (
        <Suspense fallback={null}>
          <SideAds />
        </Suspense>
      )}

      {/* 正式版下载弹窗 */}
      <Dialog open={dialogs.lanzou} onOpenChange={(v) => toggle("lanzou", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-2xl p-4 sm:p-6 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 text-center mb-4">正式版下载</DialogTitle>
          </DialogHeader>
          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 mb-5">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="text-base font-bold text-red-800 mb-2">使用前必读</h4>
                <ul className="text-red-700 text-sm space-y-1 font-medium">
                  <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                  <li>• 无法使用请回退版本至wwuq.lanzouq.com/iHl9w3a4ub0j</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <ImageCarousel images={CONFIG.stableImages} />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(CONFIG.cs16.lanzouUrl)
                toggle("lanzou", false)
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("lanzou", false)}
              className="px-5 border-2 border-gray-100 h-12 rounded-xl font-bold text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 先行版下载弹窗 */}
      <Dialog open={dialogs.tencent} onOpenChange={(v) => toggle("tencent", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-2xl p-4 sm:p-6 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 text-center mb-4">先行版下载</DialogTitle>
          </DialogHeader>
          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 mb-5">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="text-base font-bold text-red-800 mb-2">使用前必读</h4>
                <ul className="text-red-700 text-sm space-y-1 font-medium">
                  <li>• 请先运行免CDKEY补丁后再打开cstrike.exe</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出机器人菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <ImageCarousel images={CONFIG.betaImages} />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(CONFIG.cs16.tencentUrl)
                toggle("tencent", false)
              }}
              className="flex-1 bg-gray-900 hover:bg-black text-white h-12 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("tencent", false)}
              className="px-5 border-2 border-gray-100 h-12 rounded-xl font-bold text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.bvn} onOpenChange={(v) => toggle("bvn", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-2xl p-4 sm:p-6 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 text-center mb-4">死神vs火影下载</DialogTitle>
          </DialogHeader>
          <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-4 mb-5">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-base font-bold text-orange-800 mb-2">游戏说明</h4>
                <ul className="text-orange-700 text-sm space-y-1 font-medium">
                  <li>• 解压后直接运行游戏即可开始</li>
                  <li>• 支持键盘双人对战模式</li>
                  <li>• 包含多个版本角色和技能</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <ImageCarousel images={CONFIG.bvn.previewImages} />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(CONFIG.bvn.downloadUrl)
                toggle("bvn", false)
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-xl font-bold text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              前往下载
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("bvn", false)}
              className="px-5 border-2 border-gray-100 h-12 rounded-xl font-bold text-sm"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 赞助弹窗 */}
      <Dialog open={dialogs.sponsor} onOpenChange={(v) => toggle("sponsor", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-xl rounded-2xl p-0 overflow-hidden border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-5 sm:p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">赞助支持</h2>
            <p className="text-pink-100 text-sm">您的支持是我们更新的动力</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-5 sm:gap-8 mb-5">
              <div className="flex flex-col items-center">
                <span className="bg-blue-50 text-blue-600 font-bold text-sm px-4 py-1.5 rounded-lg mb-3 whitespace-nowrap">
                  支付宝
                </span>
                <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200">
                  {!imgErr.has("alipay") ? (
                    <img
                      src={CONFIG.links.alipay || "/placeholder.svg"}
                      alt="支付宝收款码"
                      className="w-32 h-32 sm:w-44 sm:h-44 object-contain rounded-lg"
                      onError={() => onImgErr("alipay")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-xs">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-green-50 text-green-600 font-bold text-sm px-4 py-1.5 rounded-lg mb-3 whitespace-nowrap">
                  微信支付
                </span>
                <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200">
                  {!imgErr.has("wechat") ? (
                    <img
                      src={CONFIG.links.wechat || "/placeholder.svg"}
                      alt="微信收款码"
                      className="w-32 h-32 sm:w-44 sm:h-44 object-contain rounded-lg"
                      onError={() => onImgErr("wechat")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-xs">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => toggle("sponsor", false)}
              className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold text-sm"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
