import { NextRequest, NextResponse } from 'next/server'

const DJANGO = process.env.DJANGO_API_URL ?? 'http://localhost:8000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const errors: Record<string, string> = {}
    if (!body.name?.trim() || body.name.trim().length < 2) errors.name = 'Full name is required.'
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Valid email required.'
    if (!body.message?.trim() || body.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 })

    const res = await fetch(`${DJANGO}/api/contact/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name.trim(), email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null, company: body.company?.trim() || null,
        subject: body.subject?.trim() || 'General Enquiry',
        message: body.message.trim(),
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ error: 'Failed to send message.', details: err }, { status: res.status })
    }
    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
