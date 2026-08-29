import { useEffect, useRef } from 'react'

interface GoldShowerProps {
  /**
   * Interval in milliseconds between each gold shower wave. Defaults to 10000ms (10 seconds).
   */
  intervalMs?: number
  /**
   * Whether the gold shower is active. Defaults to true.
   */
  enabled?: boolean
  /**
   * Number of gold particles spawned per shower wave. Defaults to 65.
   */
  particleCount?: number
}

// Internal Particle Definition
interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  gravity: number
  size: number
  type: 'coin' | 'sparkle' | 'bar' | 'flake'
  rotation: number
  rotSpeed: number
  tilt: number
  tiltSpeed: number
  tiltAngle: number
  swayFrequency: number
  swayAmplitude: number
  swayOffset: number
  opacity: number
  fadeSpeed: number
  glintPhase: number
  glintSpeed: number
  life: number
  maxLife: number
}

export default function GoldShower({
  intervalMs = 10000,
  enabled = true,
  particleCount = 65,
}: GoldShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameIdRef = useRef<number | null>(null)
  const timerIdRef = useRef<number | null>(null)
  const isRunningRef = useRef<boolean>(false)

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Spawn a gold shower wave
    const triggerWave = () => {
      if (document.hidden) return

      const newParticles: Particle[] = []
      const types: ('coin' | 'sparkle' | 'bar' | 'flake')[] = [
        'coin',
        'coin',
        'sparkle',
        'sparkle',
        'bar',
        'flake',
        'flake'
      ]

      for (let i = 0; i < particleCount; i++) {
        const type = types[Math.floor(Math.random() * types.length)]
        const size =
          type === 'coin'
            ? 14 + Math.random() * 16
            : type === 'bar'
            ? 12 + Math.random() * 14
            : type === 'sparkle'
            ? 8 + Math.random() * 14
            : 8 + Math.random() * 12

        newParticles.push({
          id: Math.random(),
          x: Math.random() * width,
          // Staggered vertical start above viewport to create continuous cascading rain
          y: -20 - Math.random() * 180,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 2.2 + Math.random() * 3.2,
          gravity: 0.04 + Math.random() * 0.05,
          size,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          tilt: Math.random() * Math.PI,
          tiltSpeed: 0.03 + Math.random() * 0.06,
          tiltAngle: Math.random() * Math.PI * 2,
          swayFrequency: 0.02 + Math.random() * 0.03,
          swayAmplitude: 0.8 + Math.random() * 1.6,
          swayOffset: Math.random() * Math.PI * 2,
          opacity: 0.9 + Math.random() * 0.1,
          fadeSpeed: 0.002 + Math.random() * 0.004,
          glintPhase: Math.random() * Math.PI * 2,
          glintSpeed: 0.08 + Math.random() * 0.1,
          life: 0,
          maxLife: 260 + Math.random() * 120,
        })
      }

      // Keep buffer clean (max 150 particles)
      if (particlesRef.current.length > 100) {
        particlesRef.current.splice(0, particlesRef.current.length - 80)
      }
      particlesRef.current.push(...newParticles)

      // Start animation loop if not currently active
      if (!isRunningRef.current) {
        isRunningRef.current = true
        runAnimationLoop()
      }
    }

    // Draw 3D Coin with Specular Metallic Gradient & Rim
    const drawCoin = (p: Particle) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      // 3D tumble projection (wobbling scale on X axis)
      const scaleX = Math.cos(p.tiltAngle)
      ctx.scale(scaleX, 1)

      const r = p.size / 2
      const isFront = scaleX >= 0

      // Specular highlight pulse
      const glint = (Math.sin(p.glintPhase) + 1) / 2

      // 1. Outer rim shadow / depth
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fillStyle = isFront ? '#B45309' : '#92400E'
      ctx.fill()

      // 2. Main Gold Coin Face
      const grad = ctx.createLinearGradient(-r, -r, r, r)
      if (isFront) {
        grad.addColorStop(0, '#FEF08A')
        grad.addColorStop(0.25 + glint * 0.1, '#FDE047')
        grad.addColorStop(0.6, '#EAB308')
        grad.addColorStop(0.85, '#CA8A04')
        grad.addColorStop(1, '#A16207')
      } else {
        grad.addColorStop(0, '#FDE047')
        grad.addColorStop(0.4, '#EAB308')
        grad.addColorStop(1, '#854D0E')
      }

      ctx.beginPath()
      ctx.arc(0, 0, r * 0.9, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // 3. Milled Inner Ring
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.lineWidth = 1
      ctx.stroke()

      // 4. Center Gold Stamp (Rupee Symbol / Star)
      if (Math.abs(scaleX) > 0.45) {
        ctx.fillStyle = 'rgba(120, 53, 15, 0.75)'
        ctx.font = `bold ${Math.round(r * 0.75)}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('₹', 0, 1)
      }

      ctx.restore()
    }

    // Draw 4-Point Golden Sparkle / Star Diamond
    const drawSparkle = (p: Particle) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      const s = p.size * (0.7 + 0.3 * Math.sin(p.glintPhase))
      const inner = s * 0.25

      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2
        const nextA = a + Math.PI / 4
        if (i === 0) ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s)
        else ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        ctx.lineTo(Math.cos(nextA) * inner, Math.sin(nextA) * inner)
      }
      ctx.closePath()

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
      grad.addColorStop(0, '#FFFFFF')
      grad.addColorStop(0.3, '#FEF08A')
      grad.addColorStop(0.7, '#F59E0B')
      grad.addColorStop(1, 'rgba(217, 119, 6, 0)')

      ctx.fillStyle = grad
      ctx.fill()

      // Central Glint Flare
      ctx.beginPath()
      ctx.arc(0, 0, inner * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFFFF'
      ctx.fill()

      ctx.restore()
    }

    // Draw Golden Bullion / Gold Ingot Bar
    const drawBar = (p: Particle) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      const scaleX = Math.cos(p.tiltAngle)
      ctx.scale(scaleX, 1)

      const w = p.size * 1.3
      const h = p.size * 0.7

      const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2)
      grad.addColorStop(0, '#FEF9C3')
      grad.addColorStop(0.3, '#FACC15')
      grad.addColorStop(0.7, '#EAB308')
      grad.addColorStop(1, '#92400E')

      ctx.fillStyle = grad
      ctx.beginPath()
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-w / 2, -h / 2, w, h, 2)
      } else {
        ctx.rect(-w / 2, -h / 2, w, h)
      }
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      ctx.restore()
    }

    // Draw Golden Leaf / Shimmering Flake
    const drawFlake = (p: Particle) => {
      if (!ctx) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      const scaleX = Math.cos(p.tiltAngle)
      ctx.scale(scaleX, 1)

      const w = p.size * 0.9
      const h = p.size * 0.55

      const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0)
      grad.addColorStop(0, '#FDE047')
      grad.addColorStop(0.5, '#F59E0B')
      grad.addColorStop(1, '#D97706')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Main 60fps Animation Loop
    const runAnimationLoop = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Update Physics
        p.life++
        p.vy += p.gravity
        p.y += p.vy
        p.x += p.vx + Math.sin(p.life * p.swayFrequency + p.swayOffset) * p.swayAmplitude
        p.rotation += p.rotSpeed
        p.tiltAngle += p.tiltSpeed
        p.glintPhase += p.glintSpeed

        // Soft fade near the end of life or near bottom of screen
        if (p.y > height - 120) {
          p.opacity -= 0.02
        }

        // Remove dead particles
        if (p.y > height + 60 || p.opacity <= 0 || p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity))

        if (p.type === 'coin') {
          drawCoin(p)
        } else if (p.type === 'sparkle') {
          drawSparkle(p)
        } else if (p.type === 'bar') {
          drawBar(p)
        } else {
          drawFlake(p)
        }
      }

      ctx.globalAlpha = 1.0

      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(runAnimationLoop)
      } else {
        // Sleep when no particles remain to preserve 0% CPU
        isRunningRef.current = false
      }
    }

    // 1. Initial burst when home page is first opened (after brief 400ms smooth delay)
    const initialTimeout = setTimeout(() => {
      triggerWave()
    }, 400)

    // 2. Periodic gold shower every intervalMs (10,000ms = 10s)
    timerIdRef.current = window.setInterval(() => {
      triggerWave()
    }, intervalMs)

    return () => {
      clearTimeout(initialTimeout)
      if (timerIdRef.current) clearInterval(timerIdRef.current)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
      window.removeEventListener('resize', handleResize)
      particlesRef.current = []
      isRunningRef.current = false
    }
  }, [enabled, intervalMs, particleCount])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none w-full h-full"
    />
  )
}
