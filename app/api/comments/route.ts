import { NextRequest, NextResponse } from 'next/server'

const DJANGO = process.env.DJANGO_API_URL ?? 'http://localhost:8000'

export async function GET() {
  try {
    const res = await fetch(`${DJANGO}/api/comments/?is_approved=true`, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json({ results: [], count: 0 })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ results: [], count: 0 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.name?.trim() || body.name.trim().length < 2)
      return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 })
    if (!body.text?.trim() || body.text.trim().length < 5)
      return NextResponse.json({ error: 'Comment must be at least 5 characters.' }, { status: 400 })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? null
    const res = await fetch(`${DJANGO}/api/comments/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: body.name.trim(), text: body.text.trim(), avatar: body.avatar ?? null, ip_address: ip }),
    })
    if (!res.ok) return NextResponse.json({ error: 'Failed to submit.' }, { status: res.status })
    return NextResponse.json(await res.json(), { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
