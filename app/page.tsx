'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Download,
  ExternalLink,
  Globe,
  AlertTriangle,
  Heart,
  Bug,
  Moon,
  Sun,
} from 'lucide-react'

// Import modular components
import ImageCarousel from '@/components/common/ImageCarousel'
import RotatingText from '@/components/common/RotatingText'
import SplashScreen from '@/components/common/SplashScreen'
import GameCard from '@/components/game/GameCard'

// SEO and structured data
const pageTitle = 'F4CS.cn'
const pageDescription = '提供 Counter-Strike 1.6 和 死神vs火影 游戏下载，包含多个版本选择和备用下载链接，游戏已汉化免注册，可直接开玩。'
const pageKeywords = '游戏下载, Counter-Strike 1.6, CS1.6, 死神vs火影, 格斗游戏, 经典游戏, 汉化游戏'

// Structured data for games
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': '游戏下载列表',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@type': 'Game',
        'name': 'Counter-Strike 1.6',
        'description': '经典第一人称射击游戏，已汉化免注册，包含十六张竞技地图和休闲地图',
        'image': 'https://www.helloimg.com/i/2025/12/06/693451359f546.jpg',
        'offers': [
          {
            '@type': 'Offer',
            'url': 'https://wwbhc.lanzouq.com/ipIXD3fp7n1a',
            'price': '0',
            'priceCurrency': 'CNY',
            'availability': 'https://schema.org/InStock'
          }
        ]
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@type': 'Game',
        'name': '死神vs火影',
        'description': '死神vs火影3.8.6.6最新版，格斗游戏',
        'image': 'https://www.helloimg.com/i/2026/02/23/699bf11fbab03.jpg',
        'offers': [
          {
            '@type': 'Offer',
            'url': 'https://www.onlinedown.net/iopdfbhjl/1091062?module=download&t=website&v=20260212175423',
            'price': '0',
            'priceCurrency': 'CNY',
            'availability': 'https://schema.org/InStock'
          }
        ]
      }
    }
  ]
}

const CONFIG = {
  splash: {
    enabled: true,
    text: 'F4CS.cn',
    duration: 3000,
  },
  betaImages: [
    'https://www.helloimg.com/i/2025/12/07/69355676d2a55.png',
    'https://www.helloimg.com/i/2025/12/07/6935568643d85.png',
    'https://www.helloimg.com/i/2025/12/07/69355671aa484.png',
    'https://www.helloimg.com/i/2025/12/07/6935567f1d400.png',
    'https://www.helloimg.com/i/2025/12/07/693556778ce92.png',
    'https://www.helloimg.com/i/2025/12/07/6935567fc5605.png',
  ],
  stableImages: [
    'https://www.helloimg.com/i/2025/12/07/6935600331d46.png',
    'https://www.helloimg.com/i/2025/12/07/69356001e31aa.png',
    'https://www.helloimg.com/i/2025/12/07/69355ff9b1be4.png',
    'https://www.helloimg.com/i/2025/12/07/693560077fa0b.png',
    'https://www.helloimg.com/i/2025/12/07/6935600165e75.png',
    'https://www.helloimg.com/i/2025/12/07/69355ffa227b9.png',
  ],
  cs16: {
    title: 'Counter-Strike 1.6',
    desc: '涵盖十六张竞技地图和休闲地图，已汉化免注册，马上开玩',
    cover: 'https://www.helloimg.com/i/2025/12/06/693451359f546.jpg',
    stableSize: '89MB',
    betaSize: '94MB',
    lanzouUrl: 'https://wwbhc.lanzouq.com/ipIXD3fp7n1a',
    tencentUrl: 'https://wwbhc.lanzouq.com/iX7lu3fp7omh',
    stableLine2Url: 'https://www.ilanzou.com/s/54zntr8U',
    betaLine2Url: 'https://www.ilanzou.com/s/6Iintrwv',
  },
  damiao: {
    title: '死神vs火影',
    desc: '死神vs火影3.8.6.6最新版已上线',
    cover: 'https://www.helloimg.com/i/2026/02/23/699bf11fbab03.jpg',
    versions: [
      {
        id: 'v3.8.6.6',
        name: '死神vs火影 3.8.6.6',
        desc: '最新版本，包含旧人物角色包',
        downloadUrl: 'https://www.onlinedown.net/iopdfbhjl/1091062?module=download&t=website&v=20260212175423',
        size: '470MB',
      },
      {
        id: 'v3.3',
        name: '死神vs火影 3.3',
        desc: '4399经典版本',
        downloadUrl: 'https://wwbhc.lanzouq.com/ii7Ho3j0vqid',
        size: '86MB',
      },
    ],
    defaultVersion: 'v3.8.6.6',
  },
  links: {
    vegcat: 'https://vegcat.cn',
    alipay: 'https://www.helloimg.com/i/2025/12/06/693451356dbd5.jpg',
    wechat: 'https://www.helloimg.com/i/2025/12/06/69345135bddd8.png',
    feedback: 'https://qm.qq.com/q/1tHqgp8OK8',
  },
  rotatingTexts: {
    vegcat: ['探索关于站点和站长的信息'],
    sponsor: ['请支持我们持续优化体验'],
  },
}

const openLink = (url: string) => {
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch {
    window.location.href = url
  }
}

export default function GameDownloadSite() {
  const [showSplash, setShowSplash] = useState(CONFIG.splash.enabled)
  const [dialogs, setDialogs] = useState({ sponsor: false, lanzou: false, tencent: false, bvnVersion: false })
  const [selectedBVNVersion, setSelectedBVNVersion] = useState(CONFIG.damiao.defaultVersion)
  const [imgErr, setImgErr] = useState<Set<string>>(new Set())
  const [contentReady, setContentReady] = useState(!CONFIG.splash.enabled)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference or saved state
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    // Default to light mode on server
    return false
  })
  const [showBubble, setShowBubble] = useState(false)

  // Set page title and meta tags
  useEffect(() => {
    document.title = pageTitle
    
    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', pageDescription)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'description'
      newMeta.content = pageDescription
      document.head.appendChild(newMeta)
    }
    
    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', pageKeywords)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'keywords'
      newMeta.content = pageKeywords
      document.head.appendChild(newMeta)
    }
  }, [])

  const toggle = useCallback((k: keyof typeof dialogs, v?: boolean) => {
    setDialogs((p) => ({ ...p, [k]: v ?? !p[k] }))
  }, [])

  const onImgErr = useCallback((id: string) => setImgErr((p) => new Set([...p, id])), [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setContentReady(true)
  }, [])

  // Theme toggle functionality
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newTheme = !prev
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newTheme)
      
      // Show bubble when switching to dark mode
      if (newTheme) {
        setShowBubble(true)
        // Hide bubble after 3 seconds with fade out
        setTimeout(() => {
          const bubble = document.querySelector('[style*="animation: popIn"]') as HTMLElement
          if (bubble) {
            bubble.style.transition = 'all 0.5s ease-out'
            bubble.style.opacity = '0'
            bubble.style.transform = 'scale(0.8)'
            setTimeout(() => setShowBubble(false), 500)
          } else {
            setShowBubble(false)
          }
        }, 3000)
      }
      
      return newTheme
    })
  }, [])

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <div className={`min-h-screen font-sans flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#f8fafc] text-gray-900'} overflow-x-hidden`}>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />
      }
      
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-2px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      <main className="flex-1 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Theme toggle button */}
          <div className="flex justify-end mb-4 relative items-center">
            {/* Bubble popup */}
            {showBubble && (
              <div className={`mr-2 text-xs px-2.5 py-1 rounded-full transition-all duration-400 transform opacity-100 scale-100 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`} style={{ animation: 'popIn 0.4s ease-out' }}>
                做着玩的
              </div>
            )}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm`}
              aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </Button>
          </div>
          
          <div className="space-y-6 sm:space-y-10">
            <div
              onClick={() => openLink(CONFIG.links.feedback)}
              className={`cursor-pointer rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-black/[0.06]'} shadow-[0_2px_8px_rgba(0,0,0,.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,.12)] ${isDarkMode ? 'hover:border-gray-600' : 'hover:border-amber-200/50'} transition-all duration-300 overflow-hidden group`}
              role="button"
              tabIndex={0}
              aria-label="报告游戏漏洞或建议"
            >
              <div className={`relative px-5 py-3.5 sm:px-6 sm:py-4 ${isDarkMode ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30' : 'bg-gradient-to-r from-amber-50 to-orange-50'}`}>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              <article
                className={`rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-black/[0.06]'}`}
              >
                <div className="aspect-[1067/600] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                  {!imgErr.has('damiao') ? (
                    <img
                      src={CONFIG.damiao.cover}
                      alt="死神vs火影"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={() => onImgErr('damiao')}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
                      <div className="bg-white rounded-full p-4 shadow-sm mb-3">
                        <Download className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">图片加载失败</p>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex justify-between items-start mb-3.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                      {CONFIG.damiao.title}
                    </h2>
                    <Badge className="bg-slate-700 text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
                      格斗游戏
                    </Badge>
                  </div>
                  <p id="bvn-desc" className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">{CONFIG.damiao.desc}</p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => toggle('bvnVersion', true)}
                      className="w-full justify-between h-12 sm:h-13 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl font-bold text-sm sm:text-base shadow-md"
                      aria-label="选择死神vs火影游戏版本"
                      aria-describedby="bvn-desc"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center">
                          <Download className="w-5 h-5 mr-2" />
                          版本选择
                        </span>
                        <ExternalLink className="w-4 h-4 opacity-60" />
                      </div>
                    </Button>
                    <Button
                      onClick={() => openLink(CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.downloadUrl || CONFIG.damiao.versions[0].downloadUrl)}
                      variant="outline"
                      className="w-full justify-between h-12 sm:h-13 border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm sm:text-base shadow-sm"
                      aria-label={`快速下载死神vs火影 ${CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.name || CONFIG.damiao.versions[0].name}`}
                      aria-describedby="bvn-desc"
                    >
                      <span className="flex items-center">
                        <Download className="w-5 h-5 mr-2" />
                        快速下载
                      </span>
                      <span className="text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full font-mono">
                        {CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.size || CONFIG.damiao.versions[0].size}
                      </span>
                    </Button>
                  </div>
                </div>
              </article>

              <article
                className={`rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-black/[0.06]'}`}
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
                  {!imgErr.has('cs16') ? (
                    <img
                      src={CONFIG.cs16.cover}
                      alt="Counter-Strike 1.6 中文版下载"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={() => onImgErr('cs16')}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
                      <div className="bg-white rounded-full p-4 shadow-sm mb-3">
                        <Download className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">图片加载失败</p>
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
                  <p id="cs16-desc" className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">{CONFIG.cs16.desc}</p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => toggle('lanzou', true)}
                      className="w-full justify-between h-12 sm:h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold text-sm sm:text-base shadow-md"
                      aria-label="下载正式版 Counter-Strike 1.6"
                      aria-describedby="cs16-desc"
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
                      onClick={() => toggle('tencent', true)}
                      variant="outline"
                      className="w-full justify-between h-12 sm:h-13 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl font-bold text-sm sm:text-base shadow-sm"
                      aria-label="下载先行版 Counter-Strike 1.6"
                      aria-describedby="cs16-desc"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div
                onClick={() => openLink(CONFIG.links.vegcat)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,.1)] ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-black/[0.06] hover:border-gray-200/80'} transition-all duration-300 group`}
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
                onClick={() => toggle('sponsor', true)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,.1)] ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-pink-900/50' : 'bg-white border-black/[0.06] hover:border-pink-200/80'} transition-all duration-300 group`}
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
        </div>
      </main>

      <footer className="mt-auto py-6 text-center">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} F4cs.cn. All rights reserved.</p>
      </footer>

      {/* Dialogs */}
      <Dialog open={dialogs.lanzou} onOpenChange={(v) => toggle('lanzou', v)}>
        <DialogContent className="z-50 grid gap-2 sm:gap-3 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-white w-[95vw] max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col">
          <DialogHeader>
            <DialogTitle className="tracking-tight text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">正式版下载</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3 sm:space-y-4 flex-1">
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-[3px] border-red-500 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm">
              <div className="flex gap-2 sm:gap-3">
                <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-red-800 mb-1 sm:mb-2">使用前必读</h4>
                  <ul className="text-red-700 text-xs sm:text-sm space-y-1 sm:space-y-1.5 font-semibold leading-relaxed">
                    <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                    <li>• 提取码：f4cs</li>
                    <li>• 进入游戏后按下H键可呼出菜单</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <ImageCarousel images={CONFIG.stableImages} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="group flex-5">
              <Button
                onClick={() => openLink(CONFIG.cs16.lanzouUrl)}
                className="w-full justify-center h-11 sm:h-12 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                aria-label="下载正式版 Counter-Strike 1.6"
              >
                <div className="relative z-10 flex items-center justify-center w-full">
                  <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  <span>前往下载（提取码:</span>
                  <span className="transition-all duration-200 group-hover:bg-white group-hover:text-indigo-600 px-1.5 rounded transform group-hover:scale-110">f4cs</span>
                  <span>）</span>
                </div>
              </Button>
            </div>
            <div className="group flex-1">
              <Button
                onClick={() => openLink(CONFIG.cs16.stableLine2Url)}
                className="w-full justify-center h-11 sm:h-12 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center w-full">
                  <Download className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" />
                  <span>备用</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.tencent} onOpenChange={(v) => toggle('tencent', v)}>
        <DialogContent className="z-50 grid gap-2 sm:gap-3 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-white w-[95vw] max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col">
          <DialogHeader>
            <DialogTitle className="tracking-tight text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">先行版下载</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3 sm:space-y-4 flex-1">
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-[3px] border-red-500 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm">
              <div className="flex gap-2 sm:gap-3">
                <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-red-800 mb-1 sm:mb-2">使用前必读</h4>
                  <ul className="text-red-700 text-xs sm:text-sm space-y-1 sm:space-y-1.5 font-semibold leading-relaxed">
                    <li>• 请先运行免CDKEY补丁后再打开游戏</li>
                    <li>• 提取码：f4cs</li>
                    <li>• 进入游戏后按下H键可呼出菜单</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <ImageCarousel images={CONFIG.betaImages} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="group flex-5">
              <Button
                onClick={() => openLink(CONFIG.cs16.tencentUrl)}
                className="w-full justify-center h-11 sm:h-12 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center w-full">
                  <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  <span>前往下载（提取码:</span>
                  <span className="transition-all duration-200 group-hover:bg-white group-hover:text-indigo-600 px-1.5 rounded transform group-hover:scale-110">f4cs</span>
                  <span>）</span>
                </div>
              </Button>
            </div>
            <div className="group flex-1">
              <Button
                onClick={() => openLink(CONFIG.cs16.betaLine2Url)}
                className="w-full justify-center h-11 sm:h-12 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center w-full">
                  <Download className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:scale-110" />
                  <span>备用</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.sponsor} onOpenChange={(v) => toggle('sponsor', v)}>
        <DialogContent className="max-w-3xl w-[90vw] p-6 sm:p-8 gap-4 rounded-3xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-xl sm:text-2xl font-bold">支持我们</DialogTitle>
            <p className="text-gray-600 text-sm sm:text-base mt-1">您的支持是我们前进的动力</p>
          </DialogHeader>
          <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6 mb-3 w-full flex items-center justify-center">
                  <img
                    src={CONFIG.links.alipay}
                    alt="支付宝"
                    className="w-32 h-32 sm:w-48 sm:h-48 object-contain rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">支付宝支付</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-50 rounded-xl p-4 sm:p-6 mb-3 w-full flex items-center justify-center">
                  <img
                    src={CONFIG.links.wechat}
                    alt="微信支付"
                    className="w-32 h-32 sm:w-48 sm:h-48 object-contain rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">微信支付</p>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100">
              <Button
                onClick={() => toggle('sponsor', false)}
                variant="outline"
                className="w-full h-12 sm:h-13 rounded-xl font-bold text-gray-600 hover:bg-gray-50 border-2 transition-all duration-300"
              >
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogs.bvnVersion} onOpenChange={(v) => toggle('bvnVersion', v)}>
        <DialogContent className="z-50 grid gap-3 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-white w-[95vw] max-w-lg rounded-3xl p-5 sm:p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] max-h-[90vh] overflow-y-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
          <DialogHeader>
            <DialogTitle className="tracking-tight text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">版本选择</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">选择版本</label>
              <select
                value={selectedBVNVersion}
                onChange={(e) => setSelectedBVNVersion(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300"
              >
                {CONFIG.damiao.versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.name}
                  </option>
                ))}
              </select>
            </div>
            
            {CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion) && (
              <div className="bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1 sm:mb-2">
                  {CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  {CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.desc}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500 font-mono">
                    文件大小: {CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion)?.size}
                  </span>
                  <Badge className="bg-slate-700 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    官方版本
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="group">
                <Button
                  onClick={() => {
                    const selectedVersion = CONFIG.damiao.versions.find(v => v.id === selectedBVNVersion);
                    if (selectedVersion) {
                      openLink(selectedVersion.downloadUrl);
                    }
                  }}
                  className="w-full justify-center h-10 sm:h-12 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center w-full">
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110" />
                    <span>下载游戏（提取码：</span>
                    <span className="transition-all duration-200 group-hover:bg-white group-hover:text-slate-700 px-1.5 rounded transform group-hover:scale-110">f4cs</span>
                    <span>）</span>
                  </div>
                </Button>
              </div>
              <Button
                onClick={() => toggle('bvnVersion', false)}
                variant="outline"
                className="w-full justify-center h-10 sm:h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base text-gray-900 transition-all duration-300"
              >
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
