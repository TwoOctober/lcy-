"use client"

import { useState, useEffect, memo, useCallback } from "react"
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
  stableImages: [
    "https://www.helloimg.com/i/2025/12/07/6935600331d46.png",
    "https://www.helloimg.com/i/2025/12/07/69356001e31aa.png",
    "https://www.helloimg.com/i/2025/12/07/69355ff9b1be4.png",
    "https://www.helloimg.com/i/2025/12/07/693560077fa0b.png",
    "https://www.helloimg.com/i/2025/12/07/6935600165e75.png",
    "https://www.helloimg.com/i/2025/12/07/69355ffa227b9.png",
  ],
  cs16: {
    title: "Counter-Strike 1.6",
    desc: "涵盖十二张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    cover: "https://www.helloimg.com/i/2025/12/06/693451359f546.jpg",
    stableSize: "94MB",
    betaSize: "99MB",
    lanzouUrl: "https://wwbhc.lanzouq.com/iH3lZ3d23v2f",
    tencentUrl: "https://wwbhc.lanzouq.com/i2e3i3d23waj",
  },
  damiao: {
    title: "大庙杯比赛",
    desc: "2026届CS2大庙杯比赛开始报名，请加群770429361咨询",
    cover: "https://www.helloimg.com/i/2025/12/06/6934513ba9943.jpg",
    replayUrl: "https://b23.tv/x5nXHGj",
    qqUrl: "https://qm.qq.com/q/1NHb1tygHy",
  },
  links: {
    vegcat: "https://vegcat.cn",
    alipay: "https://www.helloimg.com/i/2025/12/06/693451356dbd5.jpg",
    wechat: "https://www.helloimg.com/i/2025/12/06/69345135bddd8.png",
    feedback: "https://qm.qq.com/q/1tHqgp8OK8",
  },
  rotatingTexts: {
    vegcat: ["探索关于站点和站长的信息"],
    sponsor: ["务必支持我们持续优化体验", "死神上线两天流量欠费10块"],
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
      <div className="space-y-3">
        <p className="text-sm text-gray-500 font-medium text-center">版本预览</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium text-base">敬请期待</p>
        </div>
      </div>
    )
  }

  const isLoaded = loaded.has(idx)

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 font-medium text-center">版本预览</p>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden">
        <div className="aspect-[16/10] relative">
          {!isLoaded && !err && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIdx(i)
                    setErr(false)
                  }}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? "bg-white w-5" : "bg-white/40 w-2.5"}`}
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

const RotatingText = memo(({ texts }: { texts: string[] }) => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (texts.length <= 1) return
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [texts.length])

  return (
    <div className="relative h-5 sm:h-6 overflow-hidden">
      {texts.map((text, i) => (
        <p
          key={i}
          className={`absolute inset-0 text-gray-500 text-sm sm:text-base transition-all duration-500 ${
            i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {text}
        </p>
      ))}
    </div>
  )
})
RotatingText.displayName = "RotatingText"

export default function GameDownloadSite() {
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false })
  const [imgErr, setImgErr] = useState<Set<string>>(new Set())

  const toggle = useCallback((k: keyof typeof dialogs, v?: boolean) => {
    setDialogs((p) => ({ ...p, [k]: v ?? !p[k] }))
  }, [])

  const onImgErr = useCallback((id: string) => setImgErr((p) => new Set([...p, id])), [])

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans selection:bg-indigo-100/50 flex flex-col">
      <style jsx>{`
        ::-webkit-scrollbar{width:8px;height:8px}
        ::-webkit-scrollbar-track{background:rgba(0,0,0,.02)}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:4px}
        ::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.2)}
        .lanzou-btn{position:relative;overflow:hidden}
        .lanzou-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);transition:left .6s ease}
        .lanzou-btn:hover::before{left:100%}
        @media(hover:none){.lanzou-btn:hover::before{left:-100%}}
      `}</style>

      <main className="flex-1 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-6xl mx-auto space-y-7">
          <div
            onClick={() => openLink(CONFIG.links.feedback)}
            className="cursor-pointer rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,.08)] border border-black/[0.06] hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] hover:border-amber-200/50 transition-all duration-300 overflow-hidden group"
          >
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3.5 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Bug className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900">报告游戏漏洞 / 期望添加功能</h3>
                    <p className="text-gray-500 text-xs hidden sm:block mt-0.5">点击加入QQ群反馈问题或建议</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs sm:text-sm bg-amber-100/60 px-3 py-1.5 rounded-xl group-hover:bg-amber-200/60 transition-colors">
                  <span className="hidden sm:inline">立即反馈</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            <article className="group bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] transition-all duration-500 border border-black/[0.06] hover:border-slate-200/80">
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                {!imgErr.has("damiao") ? (
                  <img
                    src={CONFIG.damiao.cover || "/placeholder.svg"}
                    alt="大庙杯比赛"
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    loading="eager"
                    onError={() => onImgErr("damiao")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Trophy className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex justify-between items-start mb-3.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{CONFIG.damiao.title}</h2>
                  <Badge className="bg-slate-700 text-white text-xs px-3 py-1.5 rounded-full shadow-sm">电竞赛事</Badge>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">{CONFIG.damiao.desc}</p>
                <div className="space-y-3">
                  <Button
                    onClick={() => openLink(CONFIG.damiao.replayUrl)}
                    className="w-full justify-between h-12 sm:h-13 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      赛事回放
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </Button>
                  <Button
                    onClick={() => openLink(CONFIG.damiao.qqUrl)}
                    variant="outline"
                    className="w-full justify-between h-12 sm:h-13 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl font-bold text-sm sm:text-base transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      交流Q群
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>
              </div>
            </article>

            <article className="group bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(79,70,229,.15)] transition-all duration-500 border border-black/[0.06] hover:border-indigo-200/80">
              <div className="aspect-[16/9] bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
                {!imgErr.has("cs16") ? (
                  <img
                    src={CONFIG.cs16.cover || "/placeholder.svg"}
                    alt="Counter-Strike 1.6 中文版下载"
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    loading="eager"
                    onError={() => onImgErr("cs16")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Download className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex justify-between items-start mb-3.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{CONFIG.cs16.title}</h1>
                  <Badge className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
                    经典游戏
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">{CONFIG.cs16.desc}</p>
                <div className="space-y-3">
                  <Button
                    onClick={() => toggle("lanzou", true)}
                    className="w-full justify-between h-12 sm:h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl font-bold text-sm sm:text-base lanzou-btn shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      正式版下载
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/25 text-white text-xs px-2.5 py-0.5 shadow-sm">推荐</Badge>
                      <span className="text-xs bg-black/15 px-2.5 py-1 rounded-full font-mono">
                        {CONFIG.cs16.stableSize}
                      </span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => toggle("tencent", true)}
                    variant="outline"
                    className="w-full justify-between h-12 sm:h-13 border-2 border-indigo-100 text-gray-900 hover:bg-indigo-50 hover:border-indigo-200 rounded-xl font-bold text-sm sm:text-base transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      先行版下载
                    </span>
                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-mono border border-gray-200">
                      {CONFIG.cs16.betaSize}
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] border border-black/[0.06] hover:shadow-[0_4px_12px_rgba(0,0,0,.1)] hover:border-gray-200/80 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1.5 text-base sm:text-lg">Vegcat.cn</h3>
                  <RotatingText texts={CONFIG.rotatingTexts.vegcat} />
                </div>
                <Button
                  onClick={() => openLink(CONFIG.links.vegcat)}
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-5 h-11 sm:h-12 rounded-xl text-sm sm:text-base shadow-sm transition-all duration-300 ml-4 flex-shrink-0"
                >
                  <Globe className="w-4 h-4 mr-1.5" />
                  跳转
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] border border-black/[0.06] hover:shadow-[0_4px_12px_rgba(244,63,94,.15)] hover:border-rose-200/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1.5 text-base sm:text-lg">赞助支持</h3>
                  <RotatingText texts={CONFIG.rotatingTexts.sponsor} />
                </div>
                <Button
                  onClick={() => toggle("sponsor", true)}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-5 h-11 sm:h-12 rounded-xl shadow-md hover:shadow-lg text-sm sm:text-base transition-all duration-300 ml-4 flex-shrink-0"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  支持
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-black/[0.06] py-6 px-4 text-center bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-gray-900 font-bold text-sm sm:text-base mb-1">© 2025 Vegcat. All rights reserved.</p>
              <p className="text-gray-400 text-xs sm:text-sm">我们或许会倒闭，但永远不会变质。</p>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={dialogs.lanzou} onOpenChange={(v) => toggle("lanzou", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-3xl p-6 sm:p-8 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
              正式版下载
            </DialogTitle>
          </DialogHeader>
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-[3px] border-red-500 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex gap-4">
              <AlertTriangle className="w-9 h-9 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-red-800 mb-3">使用前必读</h4>
                <ul className="text-red-700 text-base sm:text-lg space-y-2.5 font-semibold leading-relaxed">
                  <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出客户端菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <ImageCarousel images={CONFIG.stableImages} />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(CONFIG.cs16.lanzouUrl)
                toggle("lanzou", false)
              }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("lanzou", false)}
              className="px-6 border-2 border-gray-200 hover:bg-gray-50 h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.tencent} onOpenChange={(v) => toggle("tencent", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-lg rounded-3xl p-6 sm:p-8 border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
              先行版下载
            </DialogTitle>
          </DialogHeader>
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-[3px] border-red-500 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex gap-4">
              <AlertTriangle className="w-9 h-9 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-red-800 mb-3">使用前必读</h4>
                <ul className="text-red-700 text-base sm:text-lg space-y-2.5 font-semibold leading-relaxed">
                  <li>• 请先运行免CDKEY补丁后再打开cstrike.exe</li>
                  <li>• 否则将出现无汉化/序列号异常等问题</li>
                  <li>• 进入游戏后按下H键可以呼出客户端菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <ImageCarousel images={CONFIG.betaImages} />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                openLink(CONFIG.cs16.tencentUrl)
                toggle("tencent", false)
              }}
              className="flex-1 bg-gray-900 hover:bg-black text-white h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              前往下载（提取码:6657）
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle("tencent", false)}
              className="px-6 border-2 border-gray-200 hover:bg-gray-50 h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300"
            >
              取消
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.sponsor} onOpenChange={(v) => toggle("sponsor", v)}>
        <DialogContent className="bg-white w-[95vw] max-w-2xl rounded-3xl p-0 overflow-hidden border-0 shadow-2xl max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [&>button]:hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-7 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">赞助支持</h2>
            <p className="text-pink-100 text-sm sm:text-base">您的支持是我们更新的动力</p>
          </div>
          <div className="p-7 sm:p-10">
            <div className="grid grid-cols-2 gap-8 sm:gap-12 mb-8">
              <div className="flex flex-col items-center">
                <span className="bg-blue-50 text-blue-600 font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl mb-5 whitespace-nowrap shadow-sm">
                  支付宝
                </span>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm">
                  {!imgErr.has("alipay") ? (
                    <img
                      src={CONFIG.links.alipay || "/placeholder.svg"}
                      alt="支付宝收款码"
                      className="w-40 h-40 sm:w-52 sm:h-52 object-contain rounded-xl"
                      onError={() => onImgErr("alipay")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-green-50 text-green-600 font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl mb-5 whitespace-nowrap shadow-sm">
                  微信支付
                </span>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm">
                  {!imgErr.has("wechat") ? (
                    <img
                      src={CONFIG.links.wechat || "/placeholder.svg"}
                      alt="微信收款码"
                      className="w-40 h-40 sm:w-52 sm:h-52 object-contain rounded-xl"
                      onError={() => onImgErr("wechat")}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                      加载失败
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => toggle("sponsor", false)}
              className="w-full h-13 sm:h-14 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
