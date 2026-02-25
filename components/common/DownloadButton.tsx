import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  onClick: () => void
  extractionCode?: string
  variant?: "primary" | "secondary"
  text?: string
}

const DownloadButton = ({ 
  onClick, 
  extractionCode = "f4cs", 
  variant = "primary",
  text = "前往下载"
}: DownloadButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    onClick()
  }

  const buttonClasses = variant === "primary" 
    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
    : "bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex-1 ${buttonClasses} text-white h-13 sm:h-14 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden ${isClicked ? 'scale-98' : ''}`}
    >
      <div className="relative z-10 flex items-center justify-center w-full">
        <Download className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
        {extractionCode ? (
          <>
            <span>{text}（提取码:</span>
            <span className={`transition-all duration-200 ${isHovered ? "bg-white text-indigo-600 px-1.5 rounded transform scale-110" : ""}`}>
              {extractionCode}
            </span>
            <span>）</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full ${isHovered ? 'animate-shine' : ''}`}></div>
    </Button>
  )
}

export default DownloadButton