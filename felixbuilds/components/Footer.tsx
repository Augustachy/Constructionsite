import Link from "next/link";
import Image from "next/image"
import {
 
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080c12]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
               <Image
      src="/images/Logo1.png"
      alt="My image"
      width={200}
      height={100}
    />
             
            </div>

            <p className="text-[#8b949e] text-sm leading-relaxed mb-6">
              We deliver construction services across Nigeria, covering
              residential, commercial, industrial projects while also
              specializing in high-quality property sales built for long-term
              value.
            </p>

            <div className="flex gap-3">
              {[Facebook, X, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#2a3548] rounded flex items-center justify-center text-[#8b949e] hover:border-colorbrand hover:text-colorbrand transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Projects", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-[#8b949e] text-sm hover:text-colorbrand transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Residential Construction",
                "Commercial Building Projects",
                "Property Development",
                "Renovation & Remodeling",
                "Architectural Design & Planning",
                "Project Management",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-[#8b949e] text-sm hover:text-colorbrand transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[#8b949e] text-sm">
                <MapPin className="w-4 h-4 text-colorbrand mt-0.5 shrink-0" />
                <span>Anambra State, Nigeria</span>
              </li>
              <li className="flex gap-3 text-[#8b949e] text-sm">
                <Phone className="w-4 h-4 text-colorbrand mt-0.5 shrink-0" />
                <span>+234 810 621 3278</span>
              </li>
              <li className="flex gap-3 text-[#8b949e] text-sm">
                <Mail className="w-4 h-4 text-colorbrand mt-0.5 shrink-0" />
                <span>info@ogochukwuebukaconstruction.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#2a3548] text-center space-y-2">
          <p className="text-[#8b949e] text-sm">
           Copyright © {new Date().getFullYear()} Ogochukwuebuka Construction Company & Properties Ltd. All rights
            reserved.
          </p>

          <p className="text-[#8b949e] text-xs">
            Designed by{" "}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              href="https://www.stadixhub.com"
              className="hover:text-colorbrand transition-colors"
            >
             StadixHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}