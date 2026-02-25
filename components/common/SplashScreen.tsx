import { useState, useEffect, memo } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = memo(({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter")

  useEffect(() => {
    // Phase 1: Enter animation (letters appear)
    const enterTimer = setTimeout(() => setPhase("show"), 800)
    // Phase 2: Show (brief pause)
    const showTimer = setTimeout(() => setPhase("exit"), 1400)
    // Phase 3: Exit and complete
    const exitTimer = setTimeout(onComplete, 3000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(showTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  const letters = "F4CS.cn".split("")

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
      <style jsx>{`
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

export default SplashScreen