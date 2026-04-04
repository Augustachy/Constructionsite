import type { Metadata } from 'next'
import ContactClient from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact FelixBuilds or request a project quote. Offices in Lagos, Abuja, Port Harcourt and Ibadan. We respond within 1 business day.',
  alternates: { canonical: 'https://felixbuilds.com/contact' },
  openGraph: {
    title: 'Contact FelixBuilds Construction',
    description: 'Get in touch or request a quote for your next construction project. Our team responds within 1 business day.',
    url: 'https://felixbuilds.com/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
