'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, ArrowUpRight, Search, X } from 'lucide-react'
import { projects } from '@/data/projects'
import { Project } from '@/types'

type Category = 'all' | 'residential' | 'commercial' | 'industrial' | 'renovation' | 'infrastructure'

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'infrastructure', label: 'Infrastructure' },
]

const categoryColors: Record<string, string> = {
  residential: 'bg-colorbrand/40 text-colorbo/70 ',
  commercial: 'bg-colorbrand/40 text-colorbo/70',
  industrial: 'bg-colorbrand/40 text-colorbo/70',
  renovation: 'bg-colorbrand/40 text-colorbo/70',
  infrastructure: 'bg-colorbrand/40 text-colorbo/70',
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#161b22] border border-[#2a3548] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <span className={`absolute bottom-4 left-4 px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm capitalize ${categoryColors[project.category]}`}>
            {project.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-white mb-1">{project.title}</h3>
          <div className="flex gap-4 text-sm text-[#8b949e] mb-4">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />{project.location}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />{project.year}</span>
          </div>
          <p className="text-[#8b949e] text-sm leading-relaxed mb-5">{project.description}</p>
          {project.sqft && project.sqft !== '-' && (
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-[#0d1117] border border-[#2a3548] rounded-xl p-3">
                <div className="text-[#8b949e] text-xs mb-1">Total Area</div>
                <div className="font-display text-lg font-bold text-white">{project.sqft} sqft</div>
              </div>
              <div className="bg-[#0d1117] border border-[#2a3548] rounded-xl p-3">
                <div className="text-[#8b949e] text-xs mb-1">Duration</div>
                <div className="font-display text-lg font-bold text-white">{project.duration}</div>
              </div>
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs bg-[#0d1117] border border-[#2a3548] text-[#8b949e] rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const counts: Record<string, number> = { all: projects.length }
  projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })

  return (
    <>
    
      <div className="bg-colorbo h-24"></div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[#00AEEF] font-mono text-sm tracking-widest mb-4">Our Portfolio</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-colorbo mb-6 leading-tight">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-colorbo/90 text-lg leading-relaxed">
               Take a look at the projects we’ve completed. Each one shows our focus on
  quality work, good design, and delivering results our clients can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-6 bg-white  sticky top-[72px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                    activeCategory === value
                      ? 'bg-[#00AEEF] text-white shadow-lg shadow-sky-900/30'
                      : 'bg-[#0d1117] border border-[#2a3548] text-white/70 hover:border-[#00AEEF]/40 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${activeCategory === value ? 'bg-black/20' : 'bg-[#2a3548]'}`}>
                    {counts[value] ?? 0}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="bg-[#0d1117] border border-[#2a3548] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#00AEEF] transition-colors w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-white">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <>
              <p className="text-[#8b949e] text-sm mb-8 font-mono">
                Showing <span className="text-[#00AEEF]">{filtered.length}</span> projects
                {activeCategory !== 'all' && <> in <span className="text-white capitalize">{activeCategory}</span></>}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelected(project)}
                    className="group project-card text-left bg-[#161b22] border border-[#2a3548] rounded-2xl overflow-hidden hover:border-[#00AEEF]/40 w-full"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm capitalize ${categoryColors[project.category]}`}>
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2.5 py-1 text-xs rounded-full border bg-[#00AEEF]/20 text-[#00AEEF] border-[#00AEEF]/30 backdrop-blur-sm">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00AEEF] transition-colors">{project.title}</h3>
                        <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-[#00AEEF] shrink-0 transition-colors" />
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex gap-3 text-xs text-white/80">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />{project.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />{project.year}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
