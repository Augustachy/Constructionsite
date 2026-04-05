import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] grid-pattern flex items-center justify-center relative overflow-hidden">
      <div className="tape-border absolute top-0 left-0 right-0" />
      <div className="text-center px-6 relative z-10">
        <p className="font-mono text-[#00AEEF] text-sm uppercase tracking-widest mb-4">Error 404</p>
        <h1 className="font-display text-[10rem] lg:text-[16rem] font-black text-white/[0.04] leading-none select-none -mb-16">404</h1>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 relative">
          Page Not <span className="text-gradient">Found</span>
        </h2>
        <p className="text-[#8b949e] text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on solid ground.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="group px-8 py-4 bg-[#00AEEF] text-white font-bold rounded-xl hover:bg-[#38c6ff] transition-all flex items-center gap-2 shadow-xl shadow-sky-900/30">
            Go Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/projects" className="px-8 py-4 border border-[#2a3548] text-[#8b949e] hover:text-white hover:border-[#00AEEF]/40 rounded-xl font-semibold transition-all">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
