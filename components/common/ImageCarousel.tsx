import { useState, useEffect, memo, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
}

const ImageCarousel = memo(({ images }: ImageCarouselProps) => {
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
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded((prev) => new Set([...prev, idx]))}
              onError={() => setErr(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4">
              <div className="bg-white rounded-full p-4 shadow-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
              <p className="text-sm font-medium">图片加载失败</p>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="上一张"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="下一张"
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
                  aria-label={`跳转到第 ${i + 1} 张`}
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

export default ImageCarousel