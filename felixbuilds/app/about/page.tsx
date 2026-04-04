import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Eye,
   Hammer,
  ShieldCheck,
  UserCheck,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ogochukwuebuka Construction — 15+ years of construction excellence in Nigeria. Meet our team, discover our values, and see why clients trust us.",
  alternates: { canonical: "https://ogochukwuebukaconstruction.com/about" },
  openGraph: {
    title: "About Ogochukwuebuka Construction",
    description:
      "15+ years of construction excellence. Meet our team, values and the story behind Nigeria's trusted construction firm.",
    url: "https://felixbuilds.com/about",
  },
};


const values = [
   {
    icon: Hammer,
    title: "Professional Workmanship",
    desc: "We deliver durable, high-standard structures using premium materials and expert workmanship built to stand the test of time.",
  },
    {
    icon: ShieldCheck,
    title: "Integrity & Transparency",
    desc: "Honest communication, transparent pricing, and keeping every promise always.",
  },
  {
    icon: UserCheck,
    title: "Client-Centered Approach",
    desc: "We prioritize your vision, working closely with you to create spaces that truly reflect your needs and expectations.",
  },
  {
    icon: Clock,
    title: "Timely & Efficient Delivery",
    desc: "We complete projects on schedule without compromising quality, ensuring a smooth and reliable construction process.",
  },
];


export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-colorbo h-24"></div>

      <section className="relative pt-32 pb-20 bg-white  overflow-hidden">
        <div className="absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-colorbrand font-mono text-sm  tracking-widest mb-4">
              {" "}
              <span className=" bg-colorbrand/10 rounded-xl text-colorbrand p-2">
                Who We Are
              </span>{" "}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-colorbo mb-6 leading-tight">
              Building Construction
              <br />
              <span className="text-gradient">
                {" "}
                Solutions Tailored to Your Needs
              </span>
            </h1>
            <p className="text-colorbo text-lg leading-relaxed">
              From concept to completion, we provide tailored construction
              services for homes, businesses, and large developments.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#2a3548] aspect-[4/3]">
                <Image
                  src="/images/building_site.png"
                  alt="FelixBuilds story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#00AEEF] text-white p-4 rounded-xl shadow-xl">
                <div className="text-xs font-semibold">Est. Anambra, Nigeria</div>
              </div>
            </div>
            <div>
              <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-colorbo/90 mb-5">
                15+ Years of Building Excellence
              </h2>
              <div className="space-y-4 text-colorbo/90 text-base leading-relaxed">
                <p>
             We are a professional construction company dedicated to delivering quality building solutions. Our services include residential, commercial, and industrial construction, backed by a team of experienced professionals.
                </p>
                <p>
                 We focus on delivering durable structures, efficient project execution, and excellent client service.
                </p>
                <p>
               Our mission is to make construction simple, reliable, and high-quality for every client we serve.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { v: "50+", l: "Projects" },
                  { v: "15yr  +", l: "Experience" },
                  { v: "Anambra", l: "Headquarter" },
                ].map(({ v, l }) => (
                  <div
                    key={l}
                    className="bg-[#0d1117] border border-[#2a3548] rounded-xl p-4 text-center"
                  >
                    <div className="font-display text-2xl font-bold text-[#00AEEF]">
                      {v}
                    </div>
                    <div className="text-[#8b949e] text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#161b22] border border-[#2a3548] rounded-2xl p-8 hover:border-[#00AEEF]/30 transition-colors">
              <Target className="w-10 h-10 text-[#00AEEF] mb-5" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-[#8b949e] leading-relaxed">
                To deliver construction projects of the highest quality, on time
                and within budget, while fostering sustainable practices and
                uplifting the communities in which we build.
              </p>
            </div>
            <div className="bg-[#161b22] border border-[#2a3548] rounded-2xl p-8 hover:border-[#00AEEF]/30 transition-colors">
              <Eye className="w-10 h-10 text-[#00AEEF] mb-5" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Our Vision
              </h3>
              <p className="text-[#8b949e] leading-relaxed">
                To be Nigeria's most trusted construction company — recognized
                for innovation, integrity, and the lasting impact we have on
                built environments across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">
              Core Values
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-colorbo">
              The Principles We <span className="text-gradient">Build On</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-colorbo border  rounded-2xl p-6 hover:border-[#00AEEF]/40 hover:-translate-y-1 transition-all group text-center"
              >
                <div className="w-14 h-14 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#00AEEF]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="py-20 bg-colorbo">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Build With the Best?
          </h2>
          <p className="text-[#8b949e] mb-8 leading-relaxed">
            Let's build something extraordinary together.
          </p>
          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00AEEF] text-white font-bold rounded-xl hover:bg-[#38c6ff] transition-all group"
          >
            Get in Touch{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
