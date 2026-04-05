export interface Comment {
  id: string
  name: string
  avatar?: string
  initials: string
  text: string
  timestamp: string
  likes: number
  liked: boolean
  replies: Reply[]
  isHidden?: boolean
  editedAt?: string
}

export interface Reply {
  id: string
  name: string
  avatar?: string
  initials: string
  text: string
  timestamp: string
  likes: number
  liked: boolean
  editedAt?: string
}

import { StaticImageData } from 'next/image'
export interface Project {
  id: string
  title: string
  category: 'residential' | 'commercial' | 'industrial' | 'renovation' | 'infrastructure'
  location: string
  year: string
  description: string
  image: string | StaticImageData
  featured?: boolean
  tags: string[]
  sqft?: string
  duration?: string
}
