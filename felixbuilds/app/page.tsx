import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react'
import CommentSection from '@/components/CommentSection'
import ProjectCard from '@/components/ProjectCard'
import TestimonialsSlider from '@/components/TestimonialsSlider'
import { projects } from '@/data/projects'
import ServiceList from '@/components/ServiceList'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Ogochukwuebuka Construction Company & Properties Ltd | Premium Construction Company in Nigeria',
  description: "Nigeria's most trusted construction company. 15+ years delivering world-class residential, commercial & industrial projects. Get your free quote today.",
  alternates: { canonical: 'https://ogochukwuconstruction.com' },
}

const featuredProjects = projects.filter((p) => p.featured).slice(0, 2)


export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex items-center justify-center overflow-hidden py-20 lg:py-40">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
            alt="Ogochukwuebuka Construction Company & Properties Ltd construction site"
            fill
            sizes='100w'
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/20 via-[#0d1117]/10 to-[#0d1117]" />
        </div>
        <div className="absolute top-0 left-0 right-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 text-center">
        
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl text-white leading-[0.9] mb-8">
            We Build<br />
            <span className="text-gradient">Durable Buildings.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-100 text-lg lg:text-xl leading-relaxed mb-10">
            From residential buildings to commercial projects — we deliver professional construction services across Nigeria with quality materials, precision, and reliable project execution grounded in integrity and excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group px-7 py-4 bg-[#00AEEF] text-white font-bold rounded-xl hover:bg-[#38c6ff] transition-all flex items-center gap-2 text-base shadow-2xl shadow-sky-900/40 hover:shadow-sky-900/60 hover:scale-105"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact#quote"
              className="px-7 py-4 border border-[#2a3548] text-white font-semibold rounded-xl hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all text-base backdrop-blur-sm"
            >
              Get a Free Quote
            </Link>
          </div>
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-[#8b949e] text-xs animate-bounce">
              <span className="font-mono uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Who we are*/}
  
{/* WHO WE ARE */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div>
        <p className="text-colorbrand font-mono text-sm uppercase tracking-widest mb-4">
          Who We Are
        </p>

        <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#161b22] mb-6 leading-tight">
          A Trusted Construction Company<br />
          <span className="text-gradient">Building Across Nigeria</span>
        </h2>

        <p className="text-colorbo text-base leading-relaxed mb-6">
        We provide comprehensive building and construction services across Nigeria, covering residential, commercial, and a variety of other project types, while also specializing in the sale of high-quality properties designed for long-term value.
        </p>

        <p className="text-colorbo text-base leading-relaxed mb-8">
         With a strong foundation of experience, we maintain a commitment to transparency, excellence, and efficient project execution, delivering lasting value through integrated construction expertise and property sales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-[#161b22] border border-[#2a3548] rounded-xl p-5 flex-1">
            <h3 className="text-white font-bold text-xl mb-1">15+</h3>
            <p className="text-[#8b949e] text-sm">Years of Experience</p>
          </div>

          <div className="bg-[#161b22] border border-[#2a3548] rounded-xl p-5 flex-1">
            <h3 className="text-white font-bold text-xl mb-1">50+</h3>
            <p className="text-[#8b949e] text-sm">Projects Delivered</p>
          </div>

          <div className="bg-[#161b22] border border-[#2a3548] rounded-xl p-5 flex-1">
            <h3 className="text-white font-bold text-xl mb-1">100%</h3>
            <p className="text-[#8b949e] text-sm">Client Satisfaction</p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#2a3548]">
         
          <Image src="/images/Plan.png" alt="A man drawing building plan"  fill className="object-cover"
          />
</div>

        {/* FLOATING CARD */}
        <div className="absolute -bottom-6 -right-6 bg-colorbo text-colorbrand p-5 rounded-xl shadow-2xl">
          <p className="font-bold text-2xl">Quality</p>
          <p className="text-xs mt-1">Construction & Property Value</p>
        </div>
      </div>

    </div>
  </div>
</section>
    
      {/* SERVICES OVERVIEW */}
      <section className="py-10 bg-textbo">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">What We Do</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
      End-to-End <br /><span className="text-gradient">Construction Services</span>
              </h2>
            </div>
            <Link href="/services" className="text-[#00AEEF] flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all group">
              All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
           
          {/*ServiceList */}
          <ServiceList />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-white border-t border-[#2a3548]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-colorbrand font-mono text-sm uppercase tracking-widest mb-2 "> Featured</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-colorb"> <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 border border-[#00AEEF] text-[#00AEEF] font-semibold text-sm rounded-xl hover:bg-colorbrand hover:text-white transition-all group">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
  <ProjectCard
    key={project.id}
    project={project}
    featured
    index={index}
  />
))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/projects" className="group inline-flex items-center gap-2 px-8 py-4 bg-colorbrand text-white font-bold rounded-xl hover:bg-colorbrand transition-all text-base shadow-xl shadow-sky-900/30 hover:scale-105">
              View More Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

     {/* WHY CHOOSE US */}
<section className="py-12 pt-5 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">
    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* TEXT */}
       <div>
            <p className="text-colorbrand font-mono text-sm uppercase tracking-widest mb-2">
              Why Choose Us
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-colorbo">
              Built on Trust, Quality & Precision
            </h2>

            <p className="text-colorbo text-sm leading-relaxed mb-4">
              We deliver reliable construction solutions with high-quality materials,
              skilled craftsmanship, and timely project execution across residential
              and commercial developments.
            </p>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-colorbrand" />
                Experienced professionals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-colorbrand" />
                Quality materials
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-colorbrand" />
                On-time delivery
              </li>
            </ul>
          </div>

      {/* IMAGE */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden">
        <Image
          src="/images/plan.png"
          alt="Construction"
          fill
          className="object-cover"
        />
      </div>

    </div>
  </div>
</section>

      {/* TESTIMONIALS - auto-sliding */}
      <TestimonialsSlider />
 
  {/* TESTIMONIALS - auto-sliding */}     
<FAQ />


      {/* CTA */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-black/70 text-lg mb-8">
            Contact our team today and let's discuss how we can bring your vision to life.
          </p>
          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-colorbrand text-white font-bold rounded-xl hover:bg-hovercolor transition-all text-base group"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* COMMENTS */}
      <CommentSection />
    </>
  )
}
