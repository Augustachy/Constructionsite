'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, X, ChevronDown } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.ogochukwuebukaconstruction.com'

const contactInfo = [
  { icon: MapPin, title: 'Head Office', lines: ['Anambra State, Nigeria'] },
  { icon: Phone, title: 'Phone', lines: ['+234 810 621 3278'] },
  { icon: Mail, title: 'Email', lines: ['ogochukwuebukaconstruction@gmail.com', 'info@ogochukwuebukaconstruction.com'] },
  { icon: Clock, title: 'Working Hours', lines: ['Monday – Saturday', 'Sunday [optional]'] },
]
const projectTypes = [
  'Residential Home', 'Luxury Villa / Estate', 'Apartment Complex',
  'Office Building', 'Retail / Commercial', 'Industrial Facility',
  'Infrastructure / Civil Works', 'Renovation & Restoration',
  'Project Management / Consulting','sales of property', 'Other',
]

const budgets = [
  { value: 'under-5m', label: 'Under 5 Million' },
  { value: '5m-20m', label: '5M – 20 Million' },
  { value: '20m-50m', label: '20M – 50 Million' },
  { value: '50m-100m', label: '50M – 100 Million' },
  { value: '100m-500m', label: '100M – 500 Million' },
  { value: 'above-500m', label: 'Above 500 Million' },
  { value: 'custom', label: 'Enter Custom Amount' },
]

const timelines = ['ASAP', 'Within 3 months', '3–6 months', '6–12 months', '1–2 years', '2+ years', 'Flexible', 'Anytime']

type ContactForm = { name: string; email: string; phone: string; company: string; subject: string; message: string }
type QuoteForm = { name: string; email: string; phone: string; company: string; projectType: string; budget: string; customBudget: string; location: string; timeline: string; message: string }
type FieldErrors<T> = Partial<Record<keyof T, string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+\d\s\-().]{7,20}$/

function validateContact(f: ContactForm): FieldErrors<ContactForm> {
  const e: FieldErrors<ContactForm> = {}
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
  if (!emailRe.test(f.email)) e.email = 'Please enter a valid email address'
  if (f.phone && !phoneRe.test(f.phone)) e.phone = 'Please enter a valid phone number'
  if (!f.subject.trim()) e.subject = 'Please enter a subject'
  if (!f.message.trim() || f.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
  return e
}

function validateQuote(f: QuoteForm): FieldErrors<QuoteForm> {
  const e: FieldErrors<QuoteForm> = {}
  if (!f.name.trim() || f.name.trim().length < 2) e.name = 'Full name is required'
  if (!emailRe.test(f.email)) e.email = 'Please enter a valid email address'
  if (!f.phone.trim() || !phoneRe.test(f.phone)) e.phone = 'A valid phone number is required'
  if (!f.projectType) e.projectType = 'Please select a project type'
  if (!f.budget) e.budget = 'Please select a budget range'
  if (f.budget === 'custom' && !f.customBudget.trim()) e.customBudget = 'Please enter your budget amount'
  if (!f.location.trim()) e.location = 'Project location is required'
  if (!f.message.trim() || f.message.trim().length < 20) e.message = 'Please describe your project (min 20 characters)'
  return e
}

function Field({ label, required, error, touched, children }: {
  label: string; required?: boolean; error?: string; touched?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
        {label} {required && <span className="text-[#00AEEF]">*</span>}
      </label>
      {children}
      {touched && error && (
        <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

const inputCls = (error?: string, touched?: boolean) =>
  `w-full bg-[#0d1117] border rounded-xl px-4 py-3 text-sm text-white placeholder-[#8b949e] focus:outline-none transition-colors ${
    touched && error ? 'border-red-500 focus:border-red-400' : 'border-[#2a3548] focus:border-[#00AEEF]'
  }`

const selCls = (error?: string, touched?: boolean) =>
  `${inputCls(error, touched)} appearance-none cursor-pointer`

/* ── Contact Form ── */
function ContactForm() {
  const empty: ContactForm = { name: '', email: '', phone: '', company: '', subject: '', message: '' }
  const [form, setForm] = useState<ContactForm>(empty)
  const [errors, setErrors] = useState<FieldErrors<ContactForm>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setForm((p) => ({ ...p, [k]: val }))
    setTouched((p) => ({ ...p, [k]: true }))
    setErrors((p) => { const next = validateContact({ ...form, [k]: val }); return { ...p, [k]: next[k] } })
  }
  const blur = (k: keyof ContactForm) => () => setTouched((p) => ({ ...p, [k]: true }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true])) as typeof touched
    setTouched(allTouched)
    const errs = validateContact(form); setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('loading'); setServerError('')
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          company: form.company.trim() || null,
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data?.detail ?? 'Server error.') }
      setStatus('success'); setForm(empty); setTouched({})
    } catch (err: unknown) {
      setStatus('error'); setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
        <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-[#8b949e] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Thank you, <span className="text-white font-medium">{form.name || 'there'}</span>. We'll get back to you as soon as possible
        </p>
        <button onClick={() => { setStatus('idle'); setForm(empty); setTouched({}); setErrors({}) }}
          className="px-6 py-2.5 border border-[#2a3548] text-[#8b949e] text-sm rounded-xl hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors">
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {serverError && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{serverError}</p>
          <button onClick={() => setServerError('')} className="ml-auto text-red-400/60 hover:text-red-400"><X className="w-4 h-4" /></button>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.name} touched={touched.name}>
          <input value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="Enter full name" className={inputCls(errors.name, touched.name)} />
        </Field>
        <Field label="Email Address" required error={errors.email} touched={touched.email}>
          <input type="email" value={form.email} onChange={set('email')} onBlur={blur('email')} placeholder="abc@gmail.com" className={inputCls(errors.email, touched.email)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone Number" error={errors.phone} touched={touched.phone}>
          <input value={form.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+234 012 3456 789" className={inputCls(errors.phone, touched.phone)} />
        </Field>
        <Field label="Company / Organisation">
          <input value={form.company} onChange={set('company')} placeholder="Enter your company name" className={inputCls()} />
        </Field>
      </div>
      <Field label="Subject" required error={errors.subject} touched={touched.subject}>
        <input value={form.subject} onChange={set('subject')} onBlur={blur('subject')} placeholder="How can we help you?" className={inputCls(errors.subject, touched.subject)} />
      </Field>
      <Field label="Message" required error={errors.message} touched={touched.message}>
        <textarea value={form.message} onChange={set('message')} onBlur={blur('message')} rows={5}
          placeholder="Provide more details about your enquiry..." className={`${inputCls(errors.message, touched.message)} resize-none`} />
      </Field>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[#8b949e] text-xs">We respond within <span className="text-white">1 business day.</span></p>
        <button type="submit" disabled={status === 'loading'}
          className="px-7 py-3.5 bg-[#00AEEF] text-white font-bold text-sm rounded-xl hover:bg-[#38c6ff] disabled:opacity-50 transition-all flex items-center gap-2 shadow-xl shadow-[#00AEEF]/20 hover:scale-105 shrink-0">
          {status === 'loading'
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
            : <><Send className="w-4 h-4" />Send Message</>}
        </button>
      </div>
    </form>
  )
}

/* ── Quote Form ── */
function QuoteForm() {
  const empty: QuoteForm = { name: '', email: '', phone: '', company: '', projectType: '', budget: '', customBudget: '', location: '', timeline: '', message: '' }
  const [form, setForm] = useState<QuoteForm>(empty)
  const [errors, setErrors] = useState<FieldErrors<QuoteForm>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteForm, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const set = (k: keyof QuoteForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.value
    setForm((p) => ({ ...p, [k]: val }))
    setTouched((p) => ({ ...p, [k]: true }))
    setErrors((p) => { const next = validateQuote({ ...form, [k]: val }); return { ...p, [k]: next[k] } })
  }
  const blur = (k: keyof QuoteForm) => () => setTouched((p) => ({ ...p, [k]: true }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true])) as typeof touched
    setTouched(allTouched)
    const errs = validateQuote(form); setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('loading'); setServerError('')
    try {
      const res = await fetch(`${API_BASE}/api/quotes/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
          company: form.company.trim() || null, project_type: form.projectType,
          budget: form.budget === 'custom' ? form.customBudget : form.budget,
          location: form.location.trim(), timeline: form.timeline || null,
          description: form.message.trim(),
        }),
      })
      if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data?.detail ?? 'Server error.') }
      setStatus('success'); setForm(empty); setTouched({})
    } catch (err: unknown) {
      setStatus('error'); setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
        <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-2">Quote Request Submitted!</h3>
        <p className="text-[#8b949e] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Thank you! Our team will review your project and reach out within 2–3 business days.
        </p>
        <button onClick={() => { setStatus('idle'); setForm(empty); setTouched({}); setErrors({}) }}
          className="px-6 py-2.5 border border-[#2a3548] text-[#8b949e] text-sm rounded-xl hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors">
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {serverError && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{serverError}</p>
          <button onClick={() => setServerError('')} className="ml-auto text-red-400/60 hover:text-red-400"><X className="w-4 h-4" /></button>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.name} touched={touched.name}>
          <input value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="Enter your full name" className={inputCls(errors.name, touched.name)} />
        </Field>
        <Field label="Email Address" required error={errors.email} touched={touched.email}>
          <input type="email" value={form.email} onChange={set('email')} onBlur={blur('email')} placeholder="abc@mail.com" className={inputCls(errors.email, touched.email)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone Number" required error={errors.phone} touched={touched.phone}>
          <input value={form.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+234 1234 567 890" className={inputCls(errors.phone, touched.phone)} />
        </Field>
        <Field label="Company / Organisation">
          <input value={form.company} onChange={set('company')} placeholder="Enter your name" className={inputCls()} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Project Type" required error={errors.projectType} touched={touched.projectType}>
          <div className="relative">
            <select value={form.projectType} onChange={set('projectType')} onBlur={blur('projectType')} className={selCls(errors.projectType, touched.projectType)}>
              <option value="">Select project type</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e] pointer-events-none" />
          </div>
          {touched.projectType && errors.projectType && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" />{errors.projectType}</p>}
        </Field>
        <Field label="Preferred Timeline">
          <div className="relative">
            <select value={form.timeline} onChange={set('timeline')} className={selCls()}>
              <option value="">Select timeline</option>
              {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e] pointer-events-none" />
          </div>
        </Field>
      </div>
      <Field label="Estimated Budget" required error={errors.budget} touched={touched.budget}>
        <div className="relative">
          <select value={form.budget} onChange={set('budget')} onBlur={blur('budget')} className={selCls(errors.budget, touched.budget)}>
            <option value="">Select budget range</option>
            {budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e] pointer-events-none" />
        </div>
        {touched.budget && errors.budget && <p className="flex items-center gap-1 text-red-400 text-xs mt-1.5"><AlertCircle className="w-3 h-3" />{errors.budget}</p>}
      </Field>
      {form.budget === 'custom' && (
        <Field label="Custom Budget Amount" required error={errors.customBudget} touched={touched.customBudget}>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b949e] text-sm font-semibold"></span>
            <input value={form.customBudget} onChange={set('customBudget')} onBlur={blur('customBudget')}
              placeholder="e.g. 35,000,000" className={`${inputCls(errors.customBudget, touched.customBudget)} pl-8`} />
          </div>
        </Field>
      )}
      <Field label="Project Location" required error={errors.location} touched={touched.location}>
        <input value={form.location} onChange={set('location')} onBlur={blur('location')}
          placeholder="e.g. Anambra" className={inputCls(errors.location, touched.location)} />
      </Field>
      <Field label="Project Description" required error={errors.message} touched={touched.message}>
        <textarea value={form.message} onChange={set('message')} onBlur={blur('message')} rows={5}
          placeholder="Describe your project e.g scope, number of floors, site conditions, special requirements, inspiration..."
          className={`${inputCls(errors.message, touched.message)} resize-none`} />
      </Field>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[#8b949e] text-xs">Quote Reply: <span className="text-colorbo"> 2-3 business days.</span></p>
        <button type="submit" disabled={status === 'loading'}
          className="px-7 py-3.5 bg-[#00AEEF] text-white font-bold text-sm rounded-xl hover:bg-[#38c6ff] disabled:opacity-50 transition-all flex items-center gap-2 shadow-xl shadow-[#00AEEF]/20 hover:scale-105 shrink-0">
          {status === 'loading'
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
            : <><Send className="w-4 h-4" />Request Quote</>}
        </button>
      </div>
      <p className="text-[#8b949e] text-xs">We'll prepare a detailed quote for your review.</p>
    </form>
  )
}

/* ── Page ── */
export default function ContactClient() {
  const [activeTab, setActiveTab] = useState<'contact' | 'quote'>('contact')

  return (
    <>
    
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className=" absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[#00AEEF] font-mono text-sm  tracking-widest mb-4">Get In Touch</p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-colorbo mb-6 leading-tight">
              Let's Build<br /><span className="text-gradient">Together</span>
            </h1>
            <p className="text-colorbo/80 text-lg leading-relaxed">
              Whether you have a fully developed brief or just a vision  our team is ready to listen, advise and deliver. Reach out and let's start the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-5 bg-white ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="bg-colorbo border  rounded-2xl p-6 hover:border-[#00AEEF]/40 transition-all group hover:-translate-y-1">
                <div className="w-11 h-11 bg-colorbrand/10 border border-[#00AEEF]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00AEEF]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#00AEEF]" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{title}</h3>
                {lines.map((l, i) => <p key={i} className="text-white/80 text-sm">{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms + Sidebar */}
      <section className="py-24 bg-white overflow-x-hidden" id="quote ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Forms */}
            <div className="lg:col-span-3">
              <div className="flex gap-2 mb-8 bg-[#161b22] border border-[#2a3548] rounded-xl p-1 w-fit">
                {(['contact', 'quote'] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                      activeTab === tab ? 'bg-[#00AEEF] text-white shadow-lg shadow-[#00AEEF]/20' : 'text-[#8b949e] hover:text-white'
                    }`}>
                    {tab === 'contact' ? 'Contact Us' : 'Get a Quote'}
                  </button>
                ))}
              </div>
              <div className="mb-8">
                <p className="text-[#00AEEF] font-mono text-sm uppercase tracking-widest mb-2">
                  {activeTab === 'contact' ? 'Send a Message' : 'Project Enquiry'}
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-colorbo">
                  {activeTab === 'contact'
                    ? <>How Can We <span className="text-gradient">Help?</span></>
                    : <>Tell Us About Your <span className="text-gradient">Project</span></>}
                </h2>
              </div>
              {activeTab === 'contact' ? <ContactForm /> : <QuoteForm />}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 min-w-0 space-y-6 ">
              <div className="bg-[#161b22] border border-[#2a3548] rounded-2xl overflow-hidden">
                <div className="h-52 relative bg-[#0d1117] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-[#00AEEF] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Anambra State, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b22] border border-[#2a3548] rounded-2xl p-5 space-y-4">
                <h4 className="font-display font-bold text-white">Prefer to call?</h4>
                <p className="text-[#8b949e] text-sm">Monday - Sunday</p>
                <a href="tel:+2348001234567" className="flex items-center gap-3 p-3 bg-[#0d1117] border border-[#2a3548] rounded-xl hover:border-[#00AEEF]/40 transition-colors group">
                  <div className="w-9 h-9 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00AEEF]/20 transition-colors">
                    <Phone className="w-4 h-4 text-[#00AEEF]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">+234 810 621 3278 </div>
                  
                  </div>
                </a>
                <a href="mailto:hello@felixbuilds.com" className="flex items-center gap-3 p-3 bg-[#0d1117] border border-[#2a3548] rounded-xl hover:border-[#00AEEF]/40 transition-colors group">
                  <div className="w-9 h-9 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00AEEF]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[#00AEEF]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">hello@ogochukwuebukaconstruction.com</div>
                    <div className="text-[#8b949e] text-xs">General enquiries</div>
                  </div>
                </a>
              </div>

              <div className="bg-[#00AEEF]/20 border border-[#00AEEF]/30 rounded-2xl p-5">
                <AlertCircle className="w-5 h-5 text-[#00AEEF] mb-3" />
                <h4 className="font-display font-bold text-colorbo mb-1 text-sm">Site Emergency?</h4>
                <p className="text-colorbo/60 text-xs leading-relaxed mb-3">For urgent site safety issues, call our 24-hour emergency line.</p>
                <a href="tel:+2348106213278" className="text-[#00AEEF] text-sm font-bold hover:underline">+234 810 621 3278 (24/7)</a>
              </div>
            </div>
          </div>
        </div>
      </section>


    
    </>
  )
}
