'use client'
import { useEffect, useRef, useState } from 'react'
import { Building2, Award, Star } from 'lucide-react'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed', icon: Building2 },
  { value: 15, suffix: '+', label: 'Years of Excellence', icon: Award },
  { value: 100, suffix: '%', label: 'Client Satisfaction', icon: Star },
]

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return count
}

function StatItem({ value, suffix, label, icon: Icon, started }: typeof stats[0] & { started: boolean }) {
  const count = useCountUp(value, 2200, started)
  return (
    <div className="text-center group">
      <div className="w-12 h-12 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#00AEEF]" />
      </div>
      <div className="font-display text-3xl lg:text-4xl font-bold text-white mb-1 stat-number">
        {count}{suffix}
      </div>
      <div className="text-gray-100 text-sm">{label}</div>
    </div>
  )
}

export default function StatsCounter() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 bg-[#161b22] border-y border-[#2a3548]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((s) => <StatItem key={s.label} {...s} started={started} />)}
        </div>
      </div>
    </section>
  )
}
