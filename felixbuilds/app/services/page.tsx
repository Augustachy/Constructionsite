import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Home, Building2, Factory, Users, BadgeCheck, ClipboardList, Compass, Shield, Clock, Leaf, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-spectrum construction services: residential, commercial, industrial, infrastructure, renovation and project management across Nigeria.',
  alternates: { canonical: 'https://ogochukwuebuka.com/services' },
  openGraph: {
    title: 'FelixBuilds Services — Construction & Engineering',
    description: "From luxury residences to complex infrastructure — discover FelixBuilds' full range of construction and engineering services.",
    url: 'https://ogochukwuebukaconstruction.com/services',
  },
}

const services = [
  {
    id: 'planning-design',
    icon: Home,
    title: 'Planning & Design',
    tagline: 'Ideas shaped into reality',
    description:
      'Architectural planning, structural design, and project visualization to bring ideas into reality.',
    image: '/images/Design.jpeg',
    features: [
      'Architectural planning',
      'Structural design',
      'Project visualization',
      'Concept development',
      'Site planning',
      'Design documentation',
    ],
  },
  {
    id: 'building-construction',
    icon: Building2,
    title: 'Building Construction',
    tagline: 'Quality builds that last',
    description:
      'We deliver comprehensive construction solutions for both residential, commercial, and industrial projects, handling everything from planning and design to execution and finishing with quality, precision, and reliability.',
    image: '/images/building_construction.jpg',
    features: [
      'Residential construction',
      'Commercial construction',
      'Industrial construction',
      'End-to-end project execution',
      'Site supervision',
      'Quality assurance',
    ],
  },
  {
    id: 'finishing',
    icon: Factory,
    title: 'Interior & Exterior Finishing',
    tagline: 'Detail that defines beauty',
    description:
      'We deliver high quality interior and exterior finishing services including plastering, screeding, painting, floor tiling, marble or wood installation, ceiling design, exterior façade finishing, interlock paving, and interior furnishing to enhance durability, comfort, and the overall appearance of your building.',
     image: '/images/interior.png',
    features: [
      'Plastering and screeding',
      'Painting and surface finishing',
      'Floor tiling and marble installation',
      'Ceiling design and installation',
      'Exterior façade finishing',
      'Interior furnishing',
    ],
  },
  {
    id: 'sales of properties',
    icon: Home,
    title: 'Sales of Properties',
    tagline: 'Trusted real estate guidance',
    description:
      'We assist in buying and selling properties, providing transparent transactions, trusted guidance, and access to quality real estate opportunities.',
    image:'/images/sales.png',
    features: [
      'Property buying assistance',
      'Property selling services',
      'Verified property listings',
      'Transparent transactions',
      'Real estate advisory',
      'Market insights',
    ],
  },
  {
    id: 'consulting',
    icon: ClipboardList,
    title: 'Project Management & Consulting',
    tagline: 'Expert guidance at every stage',
    description:
      'We provide expert guidance across all stages of construction, including feasibility studies, cost estimation, project planning, contractor coordination, site supervision, and quality control to ensure successful project delivery.',
     image:'/images/project_management.jpg',
    features: [
      'Feasibility studies',
      'Cost estimation',
      'Project planning',
      'Contractor coordination',
      'Site supervision',
      'Quality control',
    ],
  },]

const differentiators = [
 { 
  icon: BadgeCheck, 
  title: 'Proven Expertise', 
  desc: 'Years of industry experience delivering residential, commercial, and industrial projects with technical precision and reliable outcomes.' 
},
{ 
  icon: Clock, 
  title: 'Timely Delivery', 
  desc: 'Efficient project planning and execution that ensures milestones are met and projects are completed on schedule without compromising quality.' 
},
{ 
  icon: Shield, 
  title: 'Trust & Transparency', 
  desc: 'Clear communication, honest pricing, and consistent updates throughout every stage of the project to build lasting client confidence.' 
},
{ 
  icon: Users, 
  title: 'Client-Centered Approach', 
  desc: 'We prioritize your vision by collaborating closely, understanding your needs, and tailoring solutions that align with your goals and expectations.' 
}
]

export default function ServicesPage() {
  return (
    <>
      
      {/* Hero */}
      <section className="relative pt-32 pb-10 bg-white overflow-hidden">
        <div className=" absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[#00AEEF] font-mono text-sm  tracking-widest mb-4">  <span className=" bg-colorbrand/10 rounded-xl text-colorbrand p-2">
               Our Capabilities
              </span>{" "}</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-colorbo mb-6 leading-tight">
              What We<br /><span className="text-gradient">Offer</span>
            </h1>
            <p className="text-colorbo text-lg leading-relaxed">
               From concept to completion, we handle a wide range of building projects,
  ensuring every stage is carried out with quality, consistency, and close
  attention to detail.
  </p>
          </div>
        </div>
      </section>

      {/* Services layout */}
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.id} className={`bg-colorbo border rounded-2xl overflow-hidden hover:border-colorbrand transition-all group ${i % 2 === 0 ? 'lg:flex' : 'lg:flex lg:flex-row-reverse'}`}>
                <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                  <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent " />
                </div>
                <div className="lg:flex-1 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00AEEF]" />
                    </div>
                    <span className="text-[#00AEEF] text-xs font-mono uppercase tracking-widest">{s.tagline}</span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[#00AEEF] transition-colors">{s.title}</h2>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">{s.description}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-colorbrand mt-0.5 shrink-0" />
                        <span className="text-white/90 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why choose us*/}
      <section className="py-20 bg-white ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="font-display text-4xl font-bold text-colorbo">
              The Company <span className="text-gradient">Advantage</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-colorbo border border-[#2a3548] rounded-2xl p-6 text-center hover:border-[#00AEEF]/30 transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-colorbrand/10 border border-colorbrand/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-white/90 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="font-display text-4xl font-bold text-colorbo">
              Our <span className="text-gradient">Process</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Consultation', desc: 'We meet to understand your vision, needs, and budget. No commitment required.' },
              { step: '02', title: 'Design & Planning', desc: 'Our architects and engineers create detailed plans and 3D visualizations.' },
              { step: '03', title: 'Proposal & Quote', desc: 'You receive a clear, itemised quote with timeline no hidden costs, ever.' },
              { step: '04', title: 'Construction', desc: 'Our expert team builds with precision, keeping you informed at every milestone.' },
              { step: '05', title: 'Quality Inspection', desc: 'Rigorous multi-stage quality checks ensure everything meets our high standards.' },
              { step: '06', title: 'Handover', desc: 'We hand over your completed project with full documentation and warranty.' },
            ].map((p) => (
              <div key={p.step} className="group bg-colorbo border  rounded-2xl p-6 transition-all">
                <div className="flex items-start gap-4">
                  <span className="font-display text-5xl font-black text-[#00AEEF]/15 group-hover:text-[#00AEEF]/25 transition-colors leading-none shrink-0">{p.step}</span>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                    <p className="text-[#8b949e] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-black mb-4">Start Your Project Today</h2>
          <p className="text-black/70 mb-8">Tell us what you need to build. We'll handle everything else.</p>
          <Link href="/contact#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-colorbrand text-white font-bold rounded-xl hover:bg-hovercolor hover:text-white transition-all group">
            Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}
