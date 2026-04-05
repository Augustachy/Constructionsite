import { NextRequest, NextResponse } from 'next/server'

const DJANGO = process.env.DJANGO_API_URL ?? 'http://localhost:8000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const errors: Record<string, string> = {}
    if (!body.name?.trim() || body.name.trim().length < 2) errors.name = 'Full name is required.'
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Valid email required.'
    if (!body.phone?.trim()) errors.phone = 'Phone number is required.'
    if (!body.project_type) errors.project_type = 'Project type is required.'
    if (!body.budget) errors.budget = 'Budget range is required.'
    if (!body.location?.trim()) errors.location = 'Project location is required.'
    if (!body.description?.trim() || body.description.trim().length < 20) errors.description = 'Description must be at least 20 characters.'
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 })

    const res = await fetch(`${DJANGO}/api/quotes/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name.trim(), email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(), company: body.company?.trim() || null,
        project_type: body.project_type, budget: body.budget,
        location: body.location.trim(), timeline: body.timeline || null,
        description: body.description.trim(),
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ error: 'Failed to submit.', details: err }, { status: res.status })
    }
    return NextResponse.json({ message: 'Quote request submitted successfully.' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
