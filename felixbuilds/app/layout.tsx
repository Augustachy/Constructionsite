import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PWARegister from '@/components/PWARegister'

const BASE_URL = 'https://felixbuilds.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'FelixBuilds Construction — Premium Construction Company in Nigeria',
    template: '%s | FelixBuilds Construction',
  },
  description:
    "Nigeria's most trusted construction company. 15+ years delivering world-class residential, commercial & industrial projects across Lagos and beyond. 250+ projects completed.",
  keywords: [
    'construction company Nigeria',
    'building contractor Lagos',
    'luxury homes Lagos',
    'commercial construction Nigeria',
    'FelixBuilds',
    'construction company Lagos',
    'residential construction Nigeria',
    'industrial construction Lagos',
    'real estate development Nigeria',
    'civil engineering Nigeria',
  ],
  authors: [{ name: 'FelixBuilds Construction', url: BASE_URL }],
  creator: 'FelixBuilds Construction',
  publisher: 'FelixBuilds Construction',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'FelixBuilds Construction',
    title: 'FelixBuilds Construction — Premium Construction Company in Nigeria',
    description:
      "Nigeria's most trusted construction company. 250+ completed projects. Building landmarks that define Lagos.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'FelixBuilds Construction' }],
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@felixbuilds',
    creator: '@felixbuilds',
    title: 'FelixBuilds Construction — Premium Construction Company in Nigeria',
    description: "Nigeria's premier construction firm. 250+ projects. Building landmarks.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: { google: 'REPLACE_WITH_GOOGLE_SITE_VERIFICATION_TOKEN' },
  category: 'Construction & Engineering',
}

export const viewport: Viewport = {
  themeColor: '#00AEEF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'FelixBuilds Construction',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icons/icon-512x512.png` },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-800-1234-567',
        contactType: 'Customer Service',
        areaServed: 'NG',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.facebook.com/felixbuilds',
        'https://www.instagram.com/felixbuilds',
        'https://www.linkedin.com/company/felixbuilds',
        'https://twitter.com/felixbuilds',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'FelixBuilds Construction',
      image: `${BASE_URL}/og-image.jpg`,
      url: BASE_URL,
      telephone: '+234-800-1234-567',
      email: 'hello@felixbuilds.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot 14, Admiralty Way',
        addressLocality: 'Lekki Phase 1',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
      ],
      priceRange: '₦₦₦',
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'FelixBuilds Construction',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/projects?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="noise-bg">
        <Navbar />
        <PWARegister />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
