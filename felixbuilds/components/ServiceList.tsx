'use client'

import {  Paintbrush,Home,  PenTool, Handshake } from 'lucide-react'

const services = [
{ title: 'Planning & Design', desc: 'Architectural planning, structural design, and project visualization to bring ideas into reality.', icon: PenTool },
{
  title: 'Building Construction', desc: 'We deliver comprehensive construction solutions for both residential, commercial, & industrial projects, handling everything from planning and design to execution and finishing with quality, precision, and reliability.', icon: Home},
{
  title: 'Interior & Exterior Finishing',
  desc: 'We deliver high-quality interior and exterior finishing services including plastering, screeding, painting, floor tiling, marble or wood installation, ceiling design, exterior façade finishing, interlock paving, and interior furnishing to enhance durability, comfort, and the overall appearance of your building.',
  icon: Paintbrush
},
 { title: 'Sales of Properties', desc: 'We assist in buying and selling properties, providing transparent transactions, trusted guidance, and access to quality real estate opportunities.', icon: Handshake },
]

export default function ServiceList() {
  return (
    <>
      {services.map((s, index) => {
        const Icon = s.icon

        return (
          <div
            key={index}
            className="bg-[#161b22] border border-[#2a3548] rounded-2xl p-6 hover:border-[#00AEEF]/40 hover:-translate-y-1 transition-all group"
          >
            <Icon className="w-6 h-6 mb-4 text-[#00AEEF]" />
            <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#00AEEF] transition-colors">
              {s.title}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {s.desc}
            </p>
          </div>
        )
      })}
    </>
  )
}