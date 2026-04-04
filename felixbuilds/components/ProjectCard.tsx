import Image from 'next/image'
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { Project } from '@/types'

interface Props {
  project: Project
  featured?: boolean
  index?: number
}

const categoryColors: Record<string, string> = {
  residential: 'bg-colorbo/80 text-white border-blue-500/30',
  commercial: 'bg-colorbo/80 text-white border-blue-500/30',
  industrial: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  renovation: 'bg-green-500/20 text-green-300 border-green-500/30',
  infrastructure: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function ProjectCard({ project, featured, index = 0 }: Props) {
  const isReversed = index % 2 !== 0

  return (
    <div
      className={`group project-card bg-[#161b22]  shadow-md rounded-2xl overflow-hidden hover:border-[#00AEEF]/40 
      ${featured ? `lg:flex ${isReversed ? 'lg:flex-row-reverse' : ''}` : ''}`}
    >
      {/* IMAGE */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'lg:w-1/2 h-60 lg:h-[400px]' : 'h-52'
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm capitalize ${categoryColors[project.category]}`}
          >
            {project.category}
          </span>

          {project.featured && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full border bg-[#00AEEF]/50 text-white border-[#00AEEF]/30 backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* TEXT */}
      <div className={`p-5 ${featured ? 'lg:flex-1 lg:p-7 flex flex-col justify-center' : ''}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={`font-display font-bold text-white group-hover:text-[#00AEEF] transition-colors ${
              featured ? 'text-xl lg:text-2xl' : 'text-lg'
            }`}
          >
            {project.title}
          </h3>

          <ArrowUpRight className="w-4 h-4 text-[#8b949e] group-hover:text-[#00AEEF] shrink-0 transition-colors mt-1" />
        </div>

        <p
          className={`text-[#1b2d43]/2 text-sm leading-relaxed mb-4 ${
            featured ? '' : 'line-clamp-2'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-[#8b949e]/2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />
            {project.location}
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />
            {project.year}
          </span>
        </div>

        {featured && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs bg-[#1c2230] border border-[#2a3548] text-[#8b949e] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}