import type { Metadata } from 'next'
import ProjectsClient from '@/components/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Browse FelixBuilds' portfolio of 250+ completed projects — residential, commercial, industrial, infrastructure and renovation across Nigeria.",
  alternates: { canonical: 'https://felixbuilds.com/projects' },
  openGraph: {
    title: 'FelixBuilds Projects Portfolio',
    description: '250+ completed construction projects across Nigeria. Residential towers, commercial hubs, industrial facilities and more.',
    url: 'https://felixbuilds.com/projects',
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
