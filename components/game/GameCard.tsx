import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface GameVersion {
  id: string
  name: string
  desc: string
  downloadUrl: string
  size: string
}

interface GameCardProps {
  title: string
  desc: string
  cover: string
  badge: string
  badgeColor: string
  buttonText: string
  buttonVariant: "primary" | "secondary"
  buttonOnClick: () => void
  secondaryButtonText?: string
  secondaryButtonOnClick?: () => void
  size?: string
  versions?: GameVersion[]
  selectedVersion?: string
  isDarkMode?: boolean
}

const GameCard = ({
  title,
  desc,
  cover,
  badge,
  badgeColor,
  buttonText,
  buttonVariant,
  buttonOnClick,
  secondaryButtonText,
  secondaryButtonOnClick,
  size,
  versions,
  selectedVersion,
  isDarkMode = false
}: GameCardProps) => {
  const getBadgeClass = () => {
    switch (badgeColor) {
      case "indigo":
        return "bg-indigo-600 text-white"
      case "slate":
        return "bg-slate-700 text-white"
      case "amber":
        return "bg-amber-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getButtonClass = () => {
    return buttonVariant === "primary"
      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
      : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700"
  }

  const getSelectedVersionSize = () => {
    if (!versions || !selectedVersion) return size
    const version = versions.find(v => v.id === selectedVersion)
    return version?.size || size
  }

  return (
    <article
      className={`group rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,.12)] transition-all duration-500 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-black/[0.06]'} ${buttonVariant === "primary" ? (isDarkMode ? 'hover:border-indigo-900/50' : 'hover:border-indigo-200/80') : (isDarkMode ? 'hover:border-gray-600' : 'hover:border-slate-200/80')}`}
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex justify-between items-start mb-3.5">
          <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
            {title}
          </h2>
          <Badge className={`${getBadgeClass()} text-xs px-3 py-1.5 rounded-full shadow-sm`}>
            {badge}
          </Badge>
        </div>
        <p className={`mb-5 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
          {desc}
        </p>
        <div className="space-y-3">
          <Button
            onClick={buttonOnClick}
            className={`w-full justify-between h-12 sm:h-13 ${getButtonClass()} text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
          >
            <span className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              {buttonText}
            </span>
            {size && (
              <div className="flex items-center gap-2">
                <Badge className="bg-white/25 text-white text-xs px-2.5 py-0.5 shadow-sm">推荐</Badge>
                <span className="text-xs bg-black/15 px-2.5 py-1 rounded-full font-mono">
                  {size}
                </span>
              </div>
            )}
          </Button>
          {secondaryButtonText && secondaryButtonOnClick && (
            <Button
              onClick={secondaryButtonOnClick}
              variant="outline"
              className={`w-full justify-between h-12 sm:h-13 border-2 ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} rounded-xl font-bold text-sm sm:text-base transition-all duration-300`}
            >
              <span className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                {secondaryButtonText}
              </span>
              {getSelectedVersionSize() && (
                <span className={`text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'} px-2.5 py-1 rounded-full font-mono transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                  {getSelectedVersionSize()}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default GameCard