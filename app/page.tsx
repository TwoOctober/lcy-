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
  splash: {
    enabled: true,
    text: "F4cs.cn",
    duration: 2200,
  },
  animations: {
    enableSlideIn: true,
    staggerDelay: 200,
  },
  betaImages: [
    "https://www.helloimg.com/i/2025/12/07/69355676d2a55.png",
    "https://www.helloimg.com/i/2025/12/07/6935568643d85.png",
    "https://www.helloimg.com/i/2025/12/07/69355671aa484.png",
    "https://www.helloimg.com/i/2025/12/07/6935567f1d400.png",
    "https://www.helloimg.com/i/2025/12/07/693556778ce92.png",
    "https://www.helloimg.com/i/2025/12/07/6935567fc5605.png",
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
    desc: "涵盖十六张竞技地图和休闲对枪图，一键注册汉化，流畅游玩",
    cover: "https://www.helloimg.com/i/2025/12/06/693451359f546.jpg",
    stableSize: "89MB",
    betaSize: "94MB",
    lanzouUrl: "https://wwbhc.lanzouq.com/ipIXD3fp7n1a",
    tencentUrl: "https://wwbhc.lanzouq.com/iX7lu3fp7omh",
  },
  damiao: {
    title: "F4CS比赛",
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
    sponsor: ["请支持我们持续优化体验", "死神上线两天流量欠费10块"],
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

const DownloadButton = ({ onClick, extractionCode = "f4cs" }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Download className="w-5 h-5 mr-2" />
      <span>前往下载（提取码:</span>
      <span className={`transition-all duration-200 ${isHovered ? "bg-white text-indigo-600 px-1.5 rounded" : ""}`}>
        {extractionCode}
      </span>
      <span>）</span>
    </Button>
  )
}

const SplashScreen = memo(({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter")

  useEffect(() => {
    // Phase 1: Enter animation (letters appear)
    const enterTimer = setTimeout(() => setPhase("show"), 800)
    // Phase 2: Show (brief pause)
    const showTimer = setTimeout(() => setPhase("exit"), 1400)
    // Phase 3: Exit and complete
    const exitTimer = setTimeout(onComplete, CONFIG.splash.duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(showTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  const letters = CONFIG.splash.text.split("")

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#FAF8F5] transition-opacity duration-500 ${phase === "exit" ? "opacity-0" : "opacity-100"}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <style>{`
        .splash-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px);
          animation: letterIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes letterIn {
          0% { 
            opacity: 0; 
            transform: translateY(40px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .splash-container {
          text-align: center;
          width: 100%;
          max-width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .splash-title {
          font-size: clamp(3rem, 12vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
        }
        .splash-subtitle {
          margin-top: 16px;
          font-size: clamp(0.875rem, 2.5vw, 1.125rem);
          color: #6B7280;
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="splash-container">
        <h1 className="splash-title">
          {letters.map((char, i) => (
            <span key={i} className="splash-letter gradient-text" style={{ animationDelay: `${i * 80}ms` }}>
              {char}
            </span>
          ))}
        </h1>
        <p className="splash-subtitle">或许会变质，永远不倒闭</p>
      </div>
    </div>
  )
})
SplashScreen.displayName = "SplashScreen"

export default function GameDownloadSite() {
  const [showSplash, setShowSplash] = useState(CONFIG.splash.enabled)
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false })
  const [imgErr, setImgErr] = useState<Set<string>>(new Set())
  const [contentReady, setContentReady] = useState(!CONFIG.splash.enabled)

  const toggle = useCallback((k: keyof typeof dialogs, v?: boolean) => {
    setDialogs((p) => ({ ...p, [k]: v ?? !p[k] }))
  }, [])

  const onImgErr = useCallback((id: string) => setImgErr((p) => new Set([...p, id])), [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setTimeout(() => setContentReady(true), 100)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        className="min-h-screen bg-[#FAF8F5] font-sans selection:bg-indigo-100/50 flex flex-col"
        style={{ visibility: showSplash ? "hidden" : "visible" }}
      >
        <style jsx>{`
          ::-webkit-scrollbar{width:8px;height:8px}
          ::-webkit-scrollbar-track{background:rgba(0,0,0,.02)}
          ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:4px}
          ::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.2)}
          .lanzou-btn{position:relative;overflow:hidden}
          .lanzou-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);transition:left .6s ease}
          .lanzou-btn:hover::before{left:100%}
          @media(hover:none){.lanzou-btn:hover::before{left:-100%}}
          
          /* Smoother, slower slide-in animations */
          @keyframes slideUp {
            0% { 
              opacity: 0; 
              transform: translateY(60px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          .slide-in {
            opacity: 0;
            animation: slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .slide-delay-1 { animation-delay: 0ms; }
          .slide-delay-2 { animation-delay: 200ms; }
          .slide-delay-3 { animation-delay: 400ms; }
          .slide-delay-4 { animation-delay: 600ms; }
        `}</style>

        <main className="flex-1 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6">
          <div className="w-full max-w-6xl mx-auto space-y-7">
            <div
              onClick={() => openLink(CONFIG.links.feedback)}
              className={`cursor-pointer rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,.08)] border border-black/[0.06] hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] hover:border-amber-200/50 transition-all duration-300 overflow-hidden group ${contentReady ? "slide-in slide-delay-1" : "opacity-0"}`}
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
              <article
                className={`group bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] transition-all duration-500 border border-black/[0.06] hover:border-slate-200/80 ${contentReady ? "slide-in slide-delay-2" : "opacity-0"}`}
              >
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
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                      {CONFIG.damiao.title}
                    </h2>
                    <Badge className="bg-slate-700 text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
                      电竞赛事
                    </Badge>
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

              <article
                className={`group bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(79,70,229,.15)] transition-all duration-500 border border-black/[0.06] hover:border-indigo-200/80 ${contentReady ? "slide-in slide-delay-2" : "opacity-0"}`}
              >
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
                      className="w-full justify-between h-12 sm:h-13 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl font-bold text-sm sm:text-base transition-all duration-300"
                    >
                      <span className="flex items-center">
                        <Download className="w-5 h-5 mr-2" />
                        先行版下载
                      </span>
                      <span className="text-xs bg-indigo-50 text-indigo-500 px-2.5 py-1 rounded-full font-mono">
                        {CONFIG.cs16.betaSize}
                      </span>
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 ${contentReady ? "slide-in slide-delay-3" : "opacity-0"}`}
            >
              <div
                onClick={() => openLink(CONFIG.links.vegcat)}
                className="cursor-pointer bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,.1)] border border-black/[0.06] hover:border-gray-200/80 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-0.5">Vegcat.cn</h3>
                    <RotatingText texts={CONFIG.rotatingTexts.vegcat} />
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </div>
              </div>

              <div
                onClick={() => toggle("sponsor", true)}
                className="cursor-pointer bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,.1)] border border-black/[0.06] hover:border-pink-200/80 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-0.5">赞助支持</h3>
                    <RotatingText texts={CONFIG.rotatingTexts.sponsor} />
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className={`mt-auto py-6 text-center ${contentReady ? "slide-in slide-delay-4" : "opacity-0"}`}>
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} F4CS.cn   由 Vegcat 强力驱动</p>
        </footer>
      </div>

      {/* Dialogs */}
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
                  <li>• 提取码变更为f4cs！！！</li>
                  <li>• 进入游戏后按下H键可呼出菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <ImageCarousel images={CONFIG.stableImages} />
          </div>
          <div className="flex gap-3">
            <DownloadButton
              onClick={() => {
                openLink(CONFIG.cs16.lanzouUrl)
                toggle("lanzou", false)
              }}
              extractionCode="f4cs"
            />
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
                  <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                  <li>• 提取码变更为f4cs！！！</li>
                  <li>• 进入游戏后按下H键可呼出菜单</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <ImageCarousel images={CONFIG.betaImages} />
          </div>
          <div className="flex gap-3">
            <DownloadButton
              onClick={() => {
                openLink(CONFIG.cs16.tencentUrl)
                toggle("tencent", false)
              }}
              extractionCode="f4cs"
            />
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
