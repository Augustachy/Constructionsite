'use client'

import { useState } from 'react'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

const faqs = [
  {
    q: 'What services do building construction companies offer?',
    a: 'Building construction companies typically offer services such as architectural design, project planning, site preparation, foundation work, structural construction, renovation, interior finishing, and project management from start to finish.'
  },
  {
    q: 'How long does a construction project usually take?',
    a: 'The duration of a construction project depends on its size, complexity, design, weather conditions, and availability of materials. Small projects may take a few weeks to months, while larger residential or commercial projects can take several months to over a year.'
  },
  {
    q: 'How much does it cost to build a house or commercial property?',
    a: 'Construction costs vary based on location, materials, design specifications, labor, and project size. A construction company usually provides a detailed quotation or estimate after assessing the project requirements and site conditions.'
  },
  {
    q: 'Do I need approval or permits before starting construction?',
    a: 'Yes, most construction projects require permits and approvals from relevant local authorities before work begins. A professional construction company often assists clients in obtaining the necessary permits to ensure compliance with regulations.'
  },
  {
    q: 'Can I make changes to the project during construction?',
    a: 'Yes, changes can be made during construction, but they may affect the project timeline and budget. It is important to communicate any modifications early with the project manager to assess feasibility and cost implications.'
  }
];

  return (
 <section className="py-2 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="font-display text-4xl font-bold text-colorbo">Common <span className="text-gradient">Questions</span></h2>
          </div>
    
    <div className="space-y-4">
      {faqs.map(({ q, a }, index) => (
        <details
          key={q}
          open={openIndex === index}
          onToggle={(e: React.SyntheticEvent<HTMLDetailsElement>) => {
            const target = e.currentTarget

            if (target.open) {
              setOpenIndex(index)
            } else {
              setOpenIndex(null)
            }
          }}
          className="group bg-[#161b22] border  rounded-xl overflow-hidden"
        >
          <summary className="flex justify-between p-5 cursor-pointer text-white group-open:text-white  group-open:bg-colorbrand hover:bg-colorbrand transition-colors ">
            {q}
            <span className="group-open:rotate-45 transition-transform">+</span>
          </summary>

          <div className="px-5 pb-5 text-white/80 border-t border-[#2a3548] pt-4">
            {a}
          </div>
        </details>
      ))}
    </div>
    </div>

    </section>
  )
}