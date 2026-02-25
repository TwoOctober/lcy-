import { useState, useEffect, memo } from "react"

interface RotatingTextProps {
  texts: string[]
}

const RotatingText = memo(({ texts }: RotatingTextProps) => {
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
          className={`absolute inset-0 text-gray-500 text-sm sm:text-base transition-all duration-500 ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {text}
        </p>
      ))}
    </div>
  )
})

RotatingText.displayName = "RotatingText"

export default RotatingText