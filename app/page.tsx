"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Star, Users, ExternalLink, Globe, ArrowRight, Sparkles, Construction, Clock } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Counter-Strike 1.6",
    description: "一号线路为自解压程序，二号线路为免安装zip压缩包",
    image:
      "https://game.mhcdkey.com/image/ask/238818/qpvrwk1jwqb.jpg",
    rating: 1,
    downloads: "1294",
    size: "59MB",
    category: "FPS",
    downloadLinks: [
      { name: "蓝奏云1号线路", url: "https://wwuq.lanzouq.com/i0hS32z09bwf", type: "official" },
      { name: "蓝奏云2号线路（免安装）", url: "https://wwuq.lanzouq.com/iCvGf2z09elc", type: "fast" },
    ],
  },
  {
    id: 2,
    title: "死神vs火影",
    description: "开发中",
    image: "https://image.9game.cn/2020/11/9/185773507.jpg",
    rating: 1,
    downloads: "0",
    size: "0MB",
    category: "FPS",
    downloadLinks: [
      { name: "开发中", url: "#", type: "pc", isInDevelopment: true },
      { name: "开发中", url: "#", type: "mobile", isInDevelopment: true },
    ],
  },
]

const updateLogs = [
  {
    version: "2025-07-05",
    
    changes: ["删除冗余文件", "修复严重bug", "添加了新地图"],
  },
  {
    version: "2025-06-26",
    
    changes: ["优化下载弹窗体验"],
  },
  {
    version: "2025-06-22",
    
    changes: ["优化页面加载速度", "改进移动端适配"],
  },
  {
    version: "2025-06-21",
    
    changes: ["新版ui正式上线", "初步实现下载功能", "添加了跳转提示"],
  },
]

export default function GameDownloadSite() {
  // 两个独立的弹窗状态
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [isDevelopmentDialogOpen, setIsDevelopmentDialogOpen] = useState(false)

  const [selectedDownload, setSelectedDownload] = useState<{
    gameName: string
    linkName: string
    linkType: string
  } | null>(null)

  const [selectedDevelopmentGame, setSelectedDevelopmentGame] = useState<{
    gameName: string
    linkName: string
  } | null>(null)

  const handleDownloadClick = (gameName: string, linkName: string, linkType: string, isInDevelopment?: boolean) => {
    if (isInDevelopment) {
      // 开发中的游戏
      setSelectedDevelopmentGame({ gameName, linkName })
      setIsDevelopmentDialogOpen(true)
    } else {
      // 正常下载
      setSelectedDownload({ gameName, linkName, linkType })
      setIsDownloadDialogOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-6xl font-light text-gray-900 mb-6 tracking-tight">
              6657SB.icu
              <span className="block font-extralight text-gray-600">VegcatPowered</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">一键注册，一键汉化，一键下载。</p>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {games.map((game, index) => (
            <Card key={game.id} className="group border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              <CardContent className="p-0 pt-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-light text-gray-900">{game.title}</h3>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {game.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {game.downloads}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">{game.description}</p>

                <div className="space-y-3">
                  {game.downloadLinks.map((link, linkIndex) => (
                    <Button
                      key={linkIndex}
                      onClick={() => handleDownloadClick(game.title, link.name, link.type, link.isInDevelopment)}
                      variant="outline"
                      className="w-full justify-between h-14 px-6 border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-left group/btn"
                    >
                      <div className="flex items-center">
                        <Download className="w-5 h-5 mr-3" />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 group-hover/btn:text-gray-300">
                        <span className="mr-2">{game.size}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personal Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-6">关于此站点</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              本站点为公益下载站点，用爱发电，下载资源仅供学习交流，严厉禁止商用和盗版软件，该站点只提供下载链接，不参与任何盗版、抄袭或进行违法犯罪等活动。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Vegcat.icu</h3>
                <p className="text-gray-600">探索关于站点和站长的信息以及接下来的更新计划。</p>
              </div>
              <Button
                onClick={() => window.open("https://vegcat.icu", "_blank")}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 h-auto rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center group"
              >
                <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                点击跳转
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Update Log Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <h3 className="text-2xl font-medium text-gray-900">更新日志</h3>
            </div>

            <div className="space-y-6 text-left">
              {updateLogs.map((log, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-2"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-gray-900 text-white px-3 py-1 text-sm">{log.version}</Badge>
                    <span className="text-sm text-gray-500">{log.date}</span>
                  </div>
                  <ul className="space-y-1 text-gray-600">
                    {log.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CS1.6 Download Dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="bg-white border border-gray-200 max-w-md rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-gray-900 mb-2">下载注意事项</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              双击cdkey_schinese.reg以自动注册和汉化
            </DialogDescription>
            <DialogDescription className="text-gray-600 text-base">游戏内H键呼出zbot菜单</DialogDescription>
          </DialogHeader>

          {selectedDownload && (
            <div className="py-6">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-medium text-xl mb-2 text-gray-900">{selectedDownload.gameName}</h3>
                <p className="text-gray-600 mb-3">下载方式: {selectedDownload.linkName}</p>
                <Badge className="bg-gray-900 text-white px-3 py-1 text-sm">
                  {selectedDownload.linkType === "official" && "高速下载"}
                  {selectedDownload.linkType === "fast" && "免解压"}
                  {selectedDownload.linkType === "pc" && "PC版本"}
                  {selectedDownload.linkType === "mobile" && "移动版本"}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    window.open(
                      selectedDownload.linkType === "official"
                        ? "https://wwuq.lanzouq.com/i0hS32z09bwf"
                        : "https://wwuq.lanzouq.com/iCvGf2z09elc",
                      "_blank",
                    )
                    setIsDownloadDialogOpen(false)
                  }}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-full font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  开始下载 (提取码: lcynb)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDownloadDialogOpen(false)}
                  className="flex-1 border-gray-200 hover:border-gray-300 h-12 rounded-full font-medium"
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Development Dialog */}
      <Dialog open={isDevelopmentDialogOpen} onOpenChange={setIsDevelopmentDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 max-w-md rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-gray-900 mb-2 flex items-center">
              <Construction className="w-6 h-6 mr-2 text-yellow-600" />
              站点开发中
            </DialogTitle>
            <DialogDescription className="text-yellow-700 text-base">该游戏开发尚未，检查后续更新。</DialogDescription>
          </DialogHeader>

          {selectedDevelopmentGame && (
            <div className="py-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-yellow-200">
                <h3 className="font-medium text-xl mb-3 text-gray-900">{selectedDevelopmentGame.gameName}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>敬请期待</p>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-sm mt-3">
                  开发中
                </Badge>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setIsDevelopmentDialogOpen(false)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 h-auto rounded-full font-medium transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  期待一下
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">© 2025 Vegcat.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
