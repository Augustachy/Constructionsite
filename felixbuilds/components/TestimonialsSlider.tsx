'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'They delivered our corporate building months ahead of schedule without compromising quality. The professionalism and attention to detail were truly world-class.',
    name: 'Jude Kenechukwu', role: 'Founder', rating: 5,
  },
  {
    quote: 'The quality of craftsmanship on our  estate was extraordinary. Every home was built to the highest standard. Our buyers couldn\'t be more satisfied.',
    name: 'Olatunde Usman', role: 'Director', rating: 5,
  },
  {
    quote: 'Hiring this company for our industrial park was the best business decision we made. They handled every challenge professionally and the facility exceeds expectations.',
    name: 'Emmanuel Nwafor', role: 'MD', rating: 5,
  },
  {
    quote: 'Our family home turned out better than we ever imagined. The team was transparent throughout and the finish quality is genuinely world-class.',
    name: 'Akajiofor Osita', role: 'Private Homeowner, Anambra State', rating: 5,
  },
]

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = testimonials.length

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next, paused])

  return (
    <section className="py-24 bg-white ">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-colorbrand font-mono text-sm uppercase tracking-widest mb-2">Client Stories</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-colorbo">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-1">
                  <div className="bg-[#0d1117] border border-[#2a3548] rounded-2xl p-8 md:p-12 hover:border-[#00AEEF]/30 transition-colors">
                    <Quote className="w-8 h-8 text-[#00AEEF]/40 mb-6" />
                    <p className="text-[#c9d1d9] text-base md:text-lg leading-relaxed mb-8 italic">"{t.quote}"</p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00AEEF] to-[#0090cc] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{t.name}</div>
                          <div className="text-[#8b949e] text-sm">{t.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-[#00AEEF] text-[#00AEEF]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 8000) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2 bg-[#00AEEF]' : 'w-2 h-2 bg-[#2a3548] hover:bg-[#8b949e]'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 8000) }}
                className="w-10 h-10 rounded-full border border-[#2a3548] flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-colorbrand hover:border-[#00AEEF]/40 hover:bg-[#00AEEF]/5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 8000) }}
                className="w-10 h-10 rounded-full border border-[#2a3548] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#00AEEF]/40 hover:bg-colorbrand hover:bg-[#00AEEF]/5 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
