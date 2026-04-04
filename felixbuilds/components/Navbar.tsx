'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = ''
  }, [open])

  const desktopScrolled = scrollY > 40
  const mobileScrolled = scrollY > 60
  const isScrolled = scrollY > 40

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${desktopScrolled
          ? 'md:bg-colorbrand md:backdrop-blur-md '
          : 'md:bg-transparent'
        }
        ${open
          ? 'bg-[#00AEEF]'
          : mobileScrolled
          ? 'bg-colorbrand border-white/5'
          : 'bg-transparent'
        }
      `}
    >
      <div
        className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between"
        style={{ height: '4.5rem' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group shrink-0">
          <Image
            src={isScrolled ? "/images/Logo1.png" : "/images/Logo2.png"}
            alt="Ogochukwuebuka Logo"
            width={200}
            height={200}
            priority
            className="object-contain group-hover:scale-105 transition-transform w-auto heigh-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium tracking-wide transition-colors relative group ${
                pathname === link.href
                  ? desktopScrolled
                    ? 'text-white'
                    : 'text-[#00AEEF]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#00AEEF] transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}

          <Link
            href="/contact#quote"
            className={`ml-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-lg hover:scale-105 ${
              desktopScrolled
                ? 'bg-gray-100 text-colorbrand hover:bg-colorbrand hover:text-gray-100'
                : 'bg-white/10 text-white hover:bg-[#00AEEF] hover:border-[#00AEEF]'
            }`}
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden  bg-colorbrand text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-5 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-3 px-3 rounded-lg transition-colors flex items-center gap-3 ${
                pathname === link.href
                  ? 'text-[#00AEEF] bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {pathname === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] shrink-0" />
              )}
              {link.label}
            </Link>
          ))}

          <div className="mt-3 pt-3 border-t border-white/10">
            <Link
              href="/contact#quote"
              onClick={() => setOpen(false)}
              className="block w-full px-5 py-3 bg-[#00AEEF] text-white text-sm font-semibold rounded-lg text-center hover:bg-[#38c6ff] transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}